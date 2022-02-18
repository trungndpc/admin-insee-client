import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import PromotionModel from "./model/PromotionModel";
import { useEffect, useState } from "react";
import { Page, Promotion } from "./interface";
import { Link } from "react-router-dom";
import { City, District } from "./utils/ProvinceUtil";
import * as CementUtil from "./utils/CementUtil";
import * as PromotionType from './constant/PromotionType'
import * as PromotionStatus from './constant/PromotionStatus'
import AlertUtils from "./utils/AlertUtils";
import { AreYouSurePopup } from "./popup";



function Egagements() {
  const [promotionPage, setPromotionPage] = useState<Page<Promotion>>()
  const [isShowApprovedPopup, setIsShowApprovedPopup] = useState(false)
  const [isShowRemovedPopup, setIsShowRemovedPopup] = useState(false)
  const [selectedId, setSelectedId] = useState<number>()

  const fetchPromotionPage = () => {
    PromotionModel.list(PromotionType.LIGHTING_QUIZ_GAME_PROMOTION_TYPE)
      .then(resp => {
        if (resp.error == 0) {
          setPromotionPage(resp.data);
        }
      })
  }

  const updateStatus = (status: number) => {
    PromotionModel.updateStatus(selectedId, status)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess('Thành công')
          fetchPromotionPage()
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  useEffect(() => {
    fetchPromotionPage()
  }, [])

  return (
    <Layout>
      {
        <>
          <AreYouSurePopup open={isShowApprovedPopup} onCloseModal={() => {
            setIsShowApprovedPopup(false)
          }}
            onAgree={() => {
              updateStatus(PromotionStatus.APPROVED)
              setIsShowApprovedPopup(false)
            }} />

          <AreYouSurePopup open={isShowRemovedPopup} onCloseModal={() => {
            setIsShowRemovedPopup(false)
          }}
            onAgree={() => {
              updateStatus(PromotionStatus.REMOVED)
              setIsShowRemovedPopup(false)
            }} />
        </>
      }
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Egagements
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <div className="cart-btn-bar">
                    <Link to={"/promotion/create-or-update"} className="btn btn-primary mr-1">Thêm chiến dịch</Link>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>City</th>
                      <th>District</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotionPage && promotionPage.list && promotionPage.list.map(promotion => {
                      return (
                        <tr>
                          <td>{promotion.id}</td>
                          <td>{promotion.title}</td>
                          <td>{PromotionType.findName(promotion.type)}</td>
                          <td>
                            {promotion.cityIds && promotion.cityIds.map((l: number) => City.getName(l)).join(", ")}
                          </td>
                          <td>
                            {promotion.districtIds && promotion.districtIds.map((l: number) => District.getName(l)).join(", ")}
                          </td>

                          <td><span style={{ backgroundColor: PromotionStatus.findColor(promotion.status) }}
                            className="badge badge-info">{PromotionStatus.findName(promotion.status)}</span></td>
                          <td className="table-action">
                            <Link to={`/promotion/detail/${promotion.id}`}><i style={{ fontSize: '15px' }}
                              className="ion ion-ios-open mr-2" /></Link>
                            {promotion.status == PromotionStatus.INIT &&
                              <>
                                <Link to={`/promotion/create-or-update/${promotion.id}`}><i style={{ fontSize: '15px' }}
                                  className="align-middle fas fa-fw fa-pen" /></Link>
                                <i onClick={() => {
                                  setSelectedId(promotion.id)
                                  setIsShowApprovedPopup(true)
                                }} style={{ cursor: 'pointer', margin: '0 10px' }} className="ion ion-ios-globe mr-2"></i>
                                <i onClick={() => {
                                  setSelectedId(promotion.id)
                                  setIsShowRemovedPopup(true)
                                }} style={{ cursor: 'pointer', margin: '0 10px' }} className="align-middle fas fa-fw fa-trash"></i>
                              </>
                            }
                          </td>
                        </tr>
                      )
                    })}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default Egagements;
