import "../popup/styles.scss"
import { Link, useParams } from "react-router-dom";
import FormModel from "../model/FormModel";
import { useEffect, useState } from "react";
import { Form, Page, StatsForm } from "../interface";
import * as StockFormStatus from '../constant/StockFormStatus';
import DateTimeUtil from "../utils/DateTimeUtil";

function DetailStockPromotion() {
    let { id } = useParams();
    const [formPage, setFormPage] = useState<Page<Form>>()

    const fetchListForm = () => {
        FormModel.findByPromotionId(id)
            .then(resp => {
                if (resp.error == 0) {
                    setFormPage(resp.data)
                }
            })
    }

    useEffect(() => {
        fetchListForm()
    }, [])

    return (
        <div className="col-12 col-xl-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Danh sách đơn</h5>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>ID INSEE</th>
                            <th>Cửa hàng</th>
                            <th>Thời gian</th>
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
                                    <td>{item.time && new Date(item.time * 1000).toLocaleString('vi')}</td>
                                    <td><span style={{ backgroundColor: StockFormStatus.findColor(item.status) }} className="badge">{StockFormStatus.findName(item.status)}</span></td>
                                    <td className="table-action">
                                        <Link to={`/form/detail/${item.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
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

export default DetailStockPromotion;
