import "../popup/styles.scss"
import "react-responsive-modal/styles.css";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Page, MatchFootball, Accumulation } from "../interface";
import MatchFootballModel from "../model/MatchFootballModel";
import moment from 'moment';
import Modal from "react-responsive-modal";
import AlertUtils from "../utils/AlertUtils";
import AccumulationModel from "../model/AccumulationModel";

const owlClass = "popup";
const LIST_MATCH_PAGE = 1;
const LIST_TOP_PREDICT_PAGE = 2;
function DetailPredictFootballPromotion() {
    let { id } = useParams();
    const [matchPage, setMatchPage] = useState<Page<MatchFootball>>()
    const [topPage, setTopPage] = useState<Page<Accumulation>>()
    const [isShowUpdateResultPopop, setIsShowUpdateResultPopop] = useState(false)
    const [selectMatch, setSelectMatch] = useState<MatchFootball>()
    const [showPage, setShowPage] = useState(LIST_MATCH_PAGE)

    const fetchListMatch = (promotionId) => {
        MatchFootballModel.list(promotionId, 0, 100)
            .then(resp => {
                if (resp.error == 0) {
                    setMatchPage(resp.data)
                }
            })
    }

    const fetchBXH = (promotionId) => {
        AccumulationModel.list(promotionId, 1, 0, 100)
            .then(resp => {
                if (resp.error == 0) {
                    setTopPage(resp.data)
                }
            })
    }

    const updateResult = (promotionId, matchId, scoreTeamOne, scoreTeamTwo) => {
        MatchFootballModel.updateResult(promotionId, matchId, scoreTeamOne, scoreTeamTwo)
            .then(resp => {
                if (resp.error == 0) {
                    fetchListMatch(promotionId)
                    AlertUtils.showSuccess('Update thành công')
                    setIsShowUpdateResultPopop(false)
                    setSelectMatch(undefined)
                } else {
                    AlertUtils.showError(resp.msg)
                    setIsShowUpdateResultPopop(false)
                    setSelectMatch(undefined)
                }
            })
    }

    useEffect(() => {
        fetchListMatch(id)
        fetchBXH(id)
    }, [])

    return (
        <div className="col-12 col-xl-12">
            {selectMatch &&
                <UpdateResultMatchPopup open={isShowUpdateResultPopop}
                    onCloseModal={() => { setIsShowUpdateResultPopop(false) }}
                    onAgree={(scoreTeamOne: any, scoreTeamTwo: any) => {
                        updateResult(id, selectMatch.id, scoreTeamOne, scoreTeamTwo)
                    }}
                    teamOne={selectMatch.teamOne}
                    teamTwo={selectMatch.teamTwo} />
            }
            <div className="card">
                <div className="card-header">
                    <h5 style={{ display: 'inline-block' }} className="card-title">Danh sách các trận đấu</h5>
                    {showPage == LIST_MATCH_PAGE &&
                        <button style={{ marginRight: '20px !important', float: 'right', backgroundColor: '#6f42c1' }}
                            onClick={() => { setShowPage(LIST_TOP_PREDICT_PAGE) }}
                            className="btn btn-primary mr-1">Bảng xếp hạng</button>
                    }
                    {showPage == LIST_TOP_PREDICT_PAGE &&
                        <button style={{ marginRight: '20px !important', float: 'right', backgroundColor: '#6f42c1' }}
                            onClick={() => { setShowPage(LIST_MATCH_PAGE) }}
                            className="btn btn-primary mr-1">Danh sách trận đấu</button>
                    }
                </div>
                {showPage == LIST_MATCH_PAGE &&
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Thời gian </th>
                                <th>Đội</th>
                                <th>Kết quả</th>
                                <th>Đội</th>
                                <th>Dự đoán</th>
                                <th>Chính xác</th>
                                <th>Sai</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {matchPage && matchPage.list && matchPage.list.map((match: MatchFootball, index: number) => {
                                return (
                                    <tr>
                                        <td>{moment(new Date(match.timeStart * 1000)).format("HH:mm MM-DD")}</td>
                                        <td>{match.teamOne}</td>
                                        <td>
                                            {match.status == 1 &&
                                                <p >Chưa bắt đầu</p>
                                            }
                                            {match.status == 2 && <p style={{ cursor: 'pointer' }} onClick={() => {
                                                setSelectMatch(match)
                                                setIsShowUpdateResultPopop(true)
                                            }
                                            }>Cập nhật kết quả</p>}
                                            {match.status == 3 && `${match.teamOneScore} - ${match.teamTwoScore}`}
                                        </td>
                                        <td>{match.teamTwo}</td>
                                        <td>{match.totalPredict}</td>
                                        <td>{match.totalWin}</td>
                                        <td>{match.totalFailed}</td>
                                        <td className="table-action">
                                            <Link to={`/form/match/${match.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion  mr-2" />CHI TIẾT</Link>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                }

                {showPage == LIST_TOP_PREDICT_PAGE &&
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Tên</th>
                                <th>SDT</th>
                                <th>Điểm</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topPage && topPage.list && topPage.list.map((accumulation: Accumulation, index: number) => {
                                return (
                                    <tr>
                                        <td>{<img className="avatar" src={accumulation.user.avatar} />}</td>
                                        <td>{accumulation.user.name}</td>
                                        <td>{accumulation.user.phone}</td>
                                        <td>{accumulation.point}</td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                }


            </div>
        </div>
    );
}

export default DetailPredictFootballPromotion;



function UpdateResultMatchPopup({ open, onCloseModal, onAgree, teamOne, teamTwo }) {
    const [scoreTeamOne, setScoreTeamOne] = useState<number>()
    const [scoreTeamTwo, setScoreTeamTwo] = useState<number>()

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
            <div className={owlClass} style={{ minWidth: '300px' }}>
                <div className={`${owlClass}__wrapper`}>

                    <div className={`${owlClass}__wrapper__title`}>
                        <div className="form-group row">
                            <label className="col-form-label offset-sm-1 col-sm-5 text-sm-right">{teamOne}</label>
                            <div className="col-sm-4">
                                <input value={scoreTeamOne} onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setScoreTeamOne(Number(e.currentTarget.value))
                                }} type="number" className="form-control" />
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="col-form-label offset-sm-1 col-sm-5 text-sm-right">{teamTwo}</label>
                            <div className="col-sm-4">
                                <input value={scoreTeamTwo} onChange={(e: React.FormEvent<HTMLInputElement>) => {
                                    setScoreTeamTwo(Number(e.currentTarget.value))
                                }} type="number" className="form-control" />
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
                            if (scoreTeamOne != null && scoreTeamTwo != null && scoreTeamOne >= 0 && scoreTeamTwo >= 0) {
                                onAgree(scoreTeamOne, scoreTeamTwo)
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
