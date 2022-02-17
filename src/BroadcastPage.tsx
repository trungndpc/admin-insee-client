import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { Broadcast, Page, Promotion } from "./interface";
import { Link, useLocation } from "react-router-dom";
import { City, District } from "./utils/ProvinceUtil";
import AlertUtils from "./utils/AlertUtils";
import { AreYouSurePopup } from "./popup";
import * as BroadcastType from './constant/BroadcastType'
import * as BroadcastStatus from './constant/BroadcastStatus'
import BroadcastModel from "./model/BroadcastModel";



function BroadcastPage() {
  const [broadcastPage, setBroadcastPage] = useState<Page<Broadcast>>()
  const [isShowApprovedPopup, setIsShowApprovedPopup] = useState(false)
  const [isShowRemovedPopup, setIsShowRemovedPopup] = useState(false)
  const [selectedId, setSelectedId] = useState<number>()

  const fetchBroadcastPage = () => {
    BroadcastModel.list()
      .then(resp => {
        if (resp.error == 0) {
          setBroadcastPage(resp.data);
        }
      })
  }

  const updateStatus = (status: number) => {
    BroadcastModel.updateStatus(selectedId, status)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess('Thành công')
          fetchBroadcastPage()
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  useEffect(() => {
    fetchBroadcastPage()
  }, [])

  return (
    <Layout>
      {
        <>
          <AreYouSurePopup open={isShowApprovedPopup} onCloseModal={() => {
            setIsShowApprovedPopup(false)
          }}
            onAgree={() => {
              updateStatus(BroadcastStatus.APPROVED)
              setIsShowApprovedPopup(false)
            }} />

          <AreYouSurePopup open={isShowRemovedPopup} onCloseModal={() => {
            setIsShowRemovedPopup(false)
          }}
            onAgree={() => {
              updateStatus(BroadcastStatus.CANCELED)
              setIsShowRemovedPopup(false)
            }} />
        </>

      }
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Broadcast
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <div className="cart-btn-bar">
                    <Link to={"/broadcast/create"} className="btn btn-primary mr-1">Tạo broadcast</Link>
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
                    {broadcastPage && broadcastPage.list && broadcastPage.list.map(broadcast => {
                      return (
                        <tr>
                          <td>{broadcast.id}</td>
                          <td>{broadcast.name}</td>
                          <td>{BroadcastType.findName(broadcast.type)}</td>
                          <td>
                            {broadcast.cityIds && broadcast.cityIds.map((l: number) => City.getName(l)).join(", ")}
                          </td>
                          <td>
                            {broadcast.districtIds && broadcast.districtIds.map((l: number) => District.getName(l)).join(", ")}
                          </td>
                          <td><span style={{ backgroundColor: BroadcastStatus.findColor(broadcast.status) }}
                            className="badge badge-info">{BroadcastStatus.findName(broadcast.status)}</span>
                          </td>
                          <td className="table-action">
                            <Link to={`/broadcast/${broadcast.id}`}><i style={{ fontSize: '15px', margin: '0 10px' }} className="align-middle fas fa-fw fa-pen" /></Link>
                            {broadcast.status == BroadcastStatus.INIT &&
                              <>
                                <i onClick={() => {
                                  setSelectedId(broadcast.id)
                                  setIsShowApprovedPopup(true)
                                }} style={{ cursor: 'pointer', margin: '0 10px' }} className="ion ion-ios-globe mr-2"></i>
                                <i onClick={() => {
                                  setSelectedId(broadcast.id)
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

export default BroadcastPage;
