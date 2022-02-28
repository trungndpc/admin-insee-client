import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { CountFormDTO, CountUserDashboard, Promotion } from "./interface";
import UserModel from "./model/UserModel";
import FormModel from "./model/FormModel";
import * as TypePromotion from './constant/PromotionType'
import PromotionModel from "./model/PromotionModel";


function DashboardPromotion() {
  const [countUser, setCountUser] = useState<CountUserDashboard>();
  const [countFormByPromotion, setCountFormByPromotion] = useState<CountFormDTO>()
  const [listPromotion, setListPromotion] = useState<Array<Promotion>>()
  const [selectedPromotion, setSelectedPromotion] = useState<number>(0)


  const fetchListStockPromotion = () => {
    PromotionModel.list(TypePromotion.STOCK_PROMOTION_TYPE)
      .then(resp => {
        if (resp.error == 0) {
          let lst: Array<Promotion> = resp.data.list;
          setListPromotion(lst);
        }
      })
  }

  const fetchCountUser = () => {
    UserModel.count()
      .then(resp => {
        if (resp.error == 0) {
          setCountUser(resp.data)
        }
      })
  }

  const fetchCountForm = () => {
    FormModel.countFormByTypePromotion(TypePromotion.STOCK_PROMOTION_TYPE)
      .then(resp => {
        if (resp.error == 0) {
          setCountFormByPromotion(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchCountUser()
    fetchCountForm()
    fetchListStockPromotion()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Thống kê
            </h1>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Tổng</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle">
                            <line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countFormByPromotion?.total}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Đã duyệt</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle">
                            <line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countFormByPromotion?.approved}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Chờ duyệt</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle">
                            <line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countFormByPromotion?.init}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Đã gửi quà</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle">
                            <line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countFormByPromotion?.sendGift}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Đã nhận quà</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24}
                            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                            strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle">
                            <line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countFormByPromotion?.receivedGift}</h1>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-2 col-xl-2 ml-auto">
              {listPromotion &&
                <select value={selectedPromotion} onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                  setSelectedPromotion(Number(e.currentTarget.value))
                }} className="form-control">
                  <option value={0}>Chiến dịch</option>
                  {listPromotion && listPromotion.map((value) => {
                    return (
                      <option key={value.id} value={value.id}>{value.title}</option>
                    )
                  })}
                </select>
              }
            </div>
            <div style={{ textAlign: 'right' }} className="col-1 col-xl-1">
              <button style={{ backgroundColor: '#6f42c1' }} onClick={() => {
                if (selectedPromotion == 0) {
                  alert("Vui lòng chọn một chiến dịch")
                  return;
                }
                window.open(`${process.env.REACT_APP_DOMAIN}/api/stock-form/export-excel?promotionId=${selectedPromotion}`, '_blank')
              }} className="btn btn-primary mr-1">Export</button>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default DashboardPromotion;
