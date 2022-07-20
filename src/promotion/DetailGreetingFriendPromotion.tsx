import "../popup/styles.scss"
import { Link, useParams } from "react-router-dom";
import GreetingFormModel from "../model/GreetingFormModel";
import { useEffect, useState } from "react";
import { Form, Page, GreetingFriendForm } from "../interface";
import * as GreetingFrientFormStatus from '../constant/GreetingFrientFormStatus';

function DetailGreetingFriendPromotion() {
    let { id } = useParams();
    const [formPage, setFormPage] = useState<Page<GreetingFriendForm>>()

    const fetchListForm = () => {
        GreetingFormModel.findByPromotionId(id)
            .then(resp => {
                if (resp.error == 0) {
                    setFormPage(resp.data)
                }
            })
    }


    const exportUser = () => {
        var url = new URL(`${process.env.REACT_APP_DOMAIN}/api/form/greeting-friend/export-excel?promotionId=` + id);
        window.open(url.toString(), '_blank')
    }


    useEffect(() => {
        fetchListForm()
    }, [])
    return (
        <div className="col-12 col-xl-12">
            <div className="card greeting-friend-page">
                <div className="card-bar" style={{ padding: '10px' }}>
                    <div className="ml-auto">
                        <h5 className="card-title">Danh sách đơn</h5>
                        <button style={{ marginRight: '20px !important', backgroundColor: '#6f42c1', float: 'right' }}
                            onClick={() => { exportUser() }} className="btn btn-primary mr-1">Export</button>
                    </div>
                </div>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID INSEE</th>
                            <th>Cửa hàng</th>
                            <th>Thời gian đăng ký</th>
                            <th>Thời gian tham gia</th>
                            <th>Trạng thái</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formPage && formPage.list && formPage.list.map((item: Form) => {
                            return (
                                <tr>
                                    <td>{item.user.inseeId}</td>
                                    <td>
                                        <img src={item.user.avatar} width={48} height={48} className="rounded-circle mr-2" alt="Avatar" />
                                        {item.user.name}
                                    </td>
                                    <td>{item.createdTime && new Date(item.createdTime).toLocaleString('vi')}</td>
                                    <td>{item.time ? new Date(item.time).toLocaleString('vi') : ''}</td>
                                    <td><span style={{ backgroundColor: GreetingFrientFormStatus.findColor(item.status) }} className="badge">{GreetingFrientFormStatus.findName(item.status)}</span></td>
                                    <td className="table-action">
                                        {item.status != GreetingFrientFormStatus.WAITING_SUBMIT &&
                                            <Link to={`/form/detail/${item.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
                                        }
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default DetailGreetingFriendPromotion;
