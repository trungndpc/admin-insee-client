import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { CountUserDashboard } from "./interface";
import UserModel from "./model/UserModel";


function DashboardRetailer() {
  const [countUser, setCountUser] = useState<CountUserDashboard>();

  const fetchCountUser = () => {
    UserModel.count()
      .then(resp => {
        if (resp.error == 0) {
          setCountUser(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchCountUser()
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
                      <h5 className="card-title">Tổng số cửa hàng</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <i className="align-middle fas fa-fw fa-store" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numUser}</h1>
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
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numApprovedUser}</h1>
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
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numWaitingReviewUser}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Chờ kích hoạt</h5>
                    </div>
                    <div className="col-auto">
                      <div className="avatar">
                        <div className="avatar-title rounded-circle bg-primary-dark">
                          <i className="align-middle fas fa-fw fa-hourglass"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numWaitingActiveUser}</h1>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </Layout>

  );
}

export default DashboardRetailer;
