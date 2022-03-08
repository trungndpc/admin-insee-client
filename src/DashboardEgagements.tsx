import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { CountFormDTO, CountUserDashboard } from "./interface";
import UserModel from "./model/UserModel";
import FormModel from "./model/FormModel";
import * as TypePromotion from './constant/PromotionType'


function DashboardEgagements() {
  const [countUser, setCountUser] = useState<CountUserDashboard>();
  const [countFormByPromotion, setCountFormByPromotion] = useState<CountFormDTO>()

  const fetchCountUser = () => {
    UserModel.count()
      .then(resp => {
        if (resp.error == 0) {
          setCountUser(resp.data)
        }
      })
  }
  const fetchCountForm = () => {
    FormModel.countFormByTypePromotion(TypePromotion.LIGHTING_QUIZ_GAME_PROMOTION_TYPE)
      .then(resp => {
        if (resp.error == 0) {
          setCountFormByPromotion(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchCountUser()
    fetchCountForm()
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
                          <i className="align-middle fas fa-fw fa-file"></i>
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
                          <i className="align-middle fas fa-fw fa-check-circle"></i>
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
                          <i className="align-middle fas fa-fw fa-hourglass"></i>
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
                          <i className="align-middle fas fa-fw fa-gift"></i>
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
                          <i className="align-middle fas fa-fw fa-gift"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countFormByPromotion?.receivedGift}</h1>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>

  );
}

export default DashboardEgagements;
