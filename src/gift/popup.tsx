import * as React from "react";
import { render } from "react-dom";
import { useState } from "react";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { CardPhoneGift, FormGift } from "../interface";
import "../popup/styles.scss";
const owlClass = "popup";


export function SendGiftPopup({ open, onCloseModal, onAgree, userId }) {
    const [form, setForm] = useState<FormGift>({ type: 1 } as FormGift)
    const phoneCardRef = React.createRef<CardPhoneComponent>()

    const countValue = (cardPhones: Array<CardPhoneGift>) => {
        let c = 0;
        cardPhones.forEach(cardPhone => {
            c = c + cardPhone.value;
        });
        return c;
    }

    return (
        <Modal
            open={open}
            onClose={onCloseModal}
            center
            showCloseIcon={false}
            styles={{
                modal: {
                    background: "rgba(242, 242, 242, 0.94)",
                    backdropFilter: "blur(54.3656px)",
                    borderRadius: "14px",
                    padding: "0",
                    maxWidth: "80%"
                },
            }}
        >
            <div className={owlClass} style={{ minWidth: '600px' }}>
                <div className={`${owlClass}__wrapper`}>
                    <div className={`${owlClass}__wrapper__title`}>Quà tặng</div>
                </div>
                <div style={{ padding: '0px 0px 30px 0' }} className="card-body">
                    <div className="container-fluid">
                        <div className="card">
                            <div className="card-header">
                                <h5 className="card-title mb-0">Loại quà tặng</h5>
                            </div>
                            <div className="card-body">
                                <select onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, type: Number(e.currentTarget.value) }) }} className="form-control mb-3">
                                    <option value={1}>Thẻ cào</option>
                                    <option value={2}>Voucher Offline</option>
                                    <option value={3}>Điểm thưởng</option>
                                </select>
                                {form && form.type == 1 &&
                                    <CardPhoneComponent ref={phoneCardRef} />
                                }
                                {form && form.type != 1 &&
                                    <div style={{ textAlign: 'center' }}>Chưa hỗ trợ</div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`${owlClass}__group-btn`}>
                    <div
                        className={`${owlClass}__group-btn__item left`}
                        onClick={onCloseModal}
                    >
                        Không
                    </div>
                    <div
                        className={`${owlClass}__group-btn__item right`}
                        onClick={() => {
                            if (form.type == 1) {
                                let data = phoneCardRef.current?.getValue() as Array<CardPhoneGift>;
                                let count = countValue(data);
                                let title = 'Thẻ điện thoại ' + count + '.000 đ'
                                onAgree({ ...form, cardPhones: phoneCardRef.current?.getValue(), title: title, userId: userId })
                            }
                        }}
                    >
                        Có
                    </div>
                </div>
            </div>
        </Modal>
    );
}


interface StateCardPhoneComponent {
    cards: Array<number>,
    refs: Map<number, React.RefObject<CardPhoneItemComponent>>
}

class CardPhoneComponent extends React.Component<{}, StateCardPhoneComponent> {
    state: StateCardPhoneComponent = { cards: [] as Array<number>, refs: new Map() } as StateCardPhoneComponent

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.add()
    }

    add = () => {
        let id = new Date().getTime()
        let lst = [...this.state.cards]
        lst.push(id)
        const childRef = React.createRef<CardPhoneItemComponent>();
        this.state.refs.set(id, childRef)
        this.setState({
            refs: this.state.refs,
            cards: lst
        })
    }

    remove = (id: number) => {
        let lst = [...this.state.cards]
        lst = lst.filter(e => e != id)
        this.state.refs.delete(id)
        this.setState({
            refs: this.state.refs,
            cards: lst
        })
    }

    getValue = (): Array<CardPhoneGift> => {
        let rs: Array<CardPhoneGift> = []
        this.state.refs.forEach((value: React.RefObject<CardPhoneItemComponent>, key: number) => {
            value.current &&
                rs.push(value.current?.getValue())
        });
        return rs;
    }

    render() {
        const cards = this.state.cards;
        return (
            <div>
                {cards && cards.map((card: number) => {
                    return (
                        <div style={{ position: 'relative' }}>
                            <span onClick={() => { this.remove(card) }} className="btn-x-card">X</span>
                            <CardPhoneItemComponent ref={this.state.refs.get(card)} />
                        </div>
                    )
                })}
                {
                    cards.length < 4 &&
                    <div onClick={this.add} style={{ textAlign: 'center', padding: '10px', cursor: 'pointer' }}>Thêm</div>
                }
            </div >
        )
    }

}

interface StateCardPhoneItemComponent {
    cardPhone: CardPhoneGift
}
class CardPhoneItemComponent extends React.Component<{}, StateCardPhoneItemComponent> {
    state: StateCardPhoneItemComponent = { cardPhone: { network: 1, value: 50 } as CardPhoneGift }

    constructor(props) {
        super(props)
    }

    getValue = (): CardPhoneGift => {
        return this.state.cardPhone;
    };

    render() {
        const cardPhone = { ...this.state.cardPhone }
        return (
            <div style={{ padding: '20px', border: '1px #ccc solid' }}>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Nhà mạng</span>
                    </div>
                    <select onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                        this.setState({ cardPhone: { ...cardPhone, network: Number(e.currentTarget.value) } })
                    }} className="form-control">
                        <option value={1}>Vietel</option>
                        <option value={2}>Mobile</option>
                        <option value={3}>Vina</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Mệnh giá</span>
                    </div>
                    <select onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                        this.setState({ cardPhone: { ...cardPhone, value: Number(e.currentTarget.value) } })
                    }} className="form-control">
                        <option value={50}>50.000 đ</option>
                        <option value={100}>100.000 đ</option>
                        <option value={200}>200.000 đ</option>
                    </select>
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Seri</span>
                    </div>
                    <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        this.setState({ cardPhone: { ...cardPhone, seri: e.currentTarget.value } })
                    }} type="text" className="form-control" />
                </div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Code</span>
                    </div>
                    <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                        this.setState({ cardPhone: { ...cardPhone, code: e.currentTarget.value } })
                    }} type="text" className="form-control" />
                </div>
            </div >
        )
    }


}

