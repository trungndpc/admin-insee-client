import "../popup/styles.scss"
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Page, MatchFootball } from "../interface";
import MatchFootballModel from "../model/MatchFootballModel";
import DateTimeUtil from "../utils/DateTimeUtil";
import moment from 'moment';


function DetailPredictFootballPromotion() {
    let { id } = useParams();
    const [matchPage, setMatchPage] = useState<Page<MatchFootball>>()

    const fetchListMatch = (promotionId) => {
        return MatchFootballModel.list(promotionId, 0, 100)
    }

    useEffect(() => {
        fetchListMatch(id)
            .then(resp => {
                if (resp.error == 0) {
                    setMatchPage(resp.data)
                }
            })
    }, [])

    return (
        <div className="col-12 col-xl-12">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">Danh sách các trận đấu</h5>
                </div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Thời gian </th>
                            <th>Đội</th>
                            <th>Kết quả</th>
                            <th>Đội</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {matchPage && matchPage.list && matchPage.list.map((match: MatchFootball, index: number) => {
                            return (
                                <tr>
                                    <td>{moment(new Date(match.timeStart * 1000)).format("hh:mm MM-DD")}</td>
                                    <td>{match.teamOne}</td>
                                    <td>Chưa bắt đầu</td>
                                    <td>{match.teamTwo}</td>
                                    <td className="table-action">
                                        <Link to={`/form/match/${match.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
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

export default DetailPredictFootballPromotion;
