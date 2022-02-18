import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { Broadcast, CountUserDashboard } from "./interface";
import UserModel from "./model/UserModel";
import BroadcastModel from "./model/BroadcastModel";
import { useParams } from "react-router-dom";


function DetailBroadcast() {
  let { id } = useParams();
  const [broadcast, setBroadcast] = useState<Broadcast>()
  const [countUser, setCountUser] = useState<CountUserDashboard>();

  const fetchBroadcast = () => {
    BroadcastModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          setBroadcast(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchBroadcast()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Chi tiết broadcast
            </h1>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Tổng số user</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{broadcast?.totalUids}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Tổng số user gửi thành công</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{broadcast?.totalUidsSuccessSend}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Tổng số user Click</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{broadcast?.userIds.length}</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default DetailBroadcast;
