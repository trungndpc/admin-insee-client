import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { CountGiftDTO, CountPromotionDTO, CountUserDashboard, FormPromotionMetric, UserCityMetric, UserDateMetric } from "./interface";
import UserModel from "./model/UserModel";
import { UserCityMetricChart, UserDateMetricChart } from "./component/chart";
import FormModel from "./model/FormModel";
import * as FormStatus from './constant/StockFormStatus'
import GiftModel from "./model/GiftModel";


function Dashboard() {
  const [countUser, setCountUser] = useState<CountUserDashboard>();
  const [lstUserCity, setLstUserCity] = useState<Array<UserCityMetric>>();
  const [lstUserDate, setLstUserDate] = useState<Array<UserDateMetric>>();
  const [listFormPromotion, setlistFormPromotion] = useState<Array<FormPromotionMetric>>();
  const [countFormPromotion, setCountFormPromotion] = useState<CountPromotionDTO>();
  const [countgift, setCountGift] = useState<CountGiftDTO>()


  const fetchCountUser = () => {
    UserModel.count()
      .then(resp => {
        if (resp.error == 0) {
          setCountUser(resp.data)
        }
      })
  }

  const fetchUserCityMetric = () => {
    UserModel.statsUserCity()
      .then(resp => {
        if (resp.error == 0) {
          setLstUserCity(resp.data)
        }
      })
  }

  const fetchUserDateMetric = () => {
    UserModel.statsUserDate()
      .then(resp => {
        if (resp.error == 0) {
          setLstUserDate(resp.data)
        }
      })
  }

  const fetchStatsFormPromotion = () => {
    FormModel.statsFormBypromotion()
      .then(resp => {
        if (resp.error == 0) {
          setlistFormPromotion(resp.data)
        }
      })
  }

  const fetchCountFormPromotion = () => {
    FormModel.countByTypePromotion(null)
      .then(resp => {
        if (resp.error == 0) {
          setCountFormPromotion(resp.data)
        }
      })
  }

  const fetchCountGift = () => {
    GiftModel.count()
      .then(resp => {
        if (resp.error == 0) {
          setCountGift(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchCountUser()
    fetchUserCityMetric()
    fetchUserDateMetric()
    fetchStatsFormPromotion()
    fetchCountFormPromotion()
    fetchCountGift()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Overview
            </h1>
          </div>
          <div className="row">
            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Retailer</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numUser}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Promotion</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countFormPromotion?.promotion}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Engagement</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countFormPromotion?.engagement}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Gift</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countgift?.total}</h1>
                </div>
              </div>
            </div>

          </div>
          <div className="row">
            <div className="col-12 col-md-6 col-xxl-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Số cửa hàng phân bố theo vùng</h5>
                </div>
                <div className="card-body px-4">
                  {lstUserCity && <UserCityMetricChart data={lstUserCity} />}
                </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-xxl-8 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Số cửa hàng đăng ký theo ngày</h5>
                </div>
                <div className="card-body py-3">
                  {lstUserDate && <UserDateMetricChart data={lstUserDate} />}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-lg-8 d-flex">
              <div className="card flex-fill">
                <div className="card-header">
                  <h5 className="card-title mb-0">Top các chiến dịch</h5>
                </div>
                <div id="datatables-dashboard-products_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6" /><div className="col-sm-12 col-md-6" /></div><div className="row"><div className="col-sm-12"><table id="datatables-dashboard-products" className="table table-striped my-0 dataTable no-footer" role="grid" aria-describedby="datatables-dashboard-products_info">
                  <thead>
                    <tr role="row">
                      <th className="d-none d-xl-table-cell sorting" tabIndex={0}>Chiến dịch</th>
                      <th className="d-none d-xl-table-cell sorting" tabIndex={0}>Thời gian bắt đầu</th>
                      <th className="d-none d-xl-table-cell sorting" tabIndex={0}>Số lượng tham gia</th>

                    </tr>
                  </thead>
                  <tbody>
                    {
                      listFormPromotion && listFormPromotion.map(stat => {
                        return (
                          <tr role="row" className="odd">
                            <td className="d-none d-xl-table-cell">{stat.promotion.title}</td>
                            <td className="d-none d-xl-table-cell">{new Date(stat.promotion.timeStart).toLocaleDateString('vi')}</td>
                            <td><span className="badge badge-danger">{stat.total}</span></td>
                          </tr>
                        )
                      })
                    }

                  </tbody>
                </table>
                </div>
                </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-4 d-flex">
              <div className="card flex-fill w-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Tỉnh thành tích cực</h5>
                </div>
                <div className="card-body d-flex w-100">
                  <div className="align-self-center chart chart-lg"><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div /></div><div className="chartjs-size-monitor-shrink"><div /></div></div>
                    <canvas id="chartjs-dashboard-bar-alt" width={422} height={350} style={{ display: 'block', width: '422px', height: '350px' }} className="chartjs-render-monitor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default Dashboard;
