import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { CountUserDashboard, UserCityMetric, UserDateMetric } from "./interface";
import UserModel from "./model/UserModel";
import { UserCityMetricChart, UserDateMetricChart } from "./component/chart";


function Dashboard() {
  const [countUser, setCountUser] = useState<CountUserDashboard>();
  const [lstUserCity, setLstUserCity] = useState<Array<UserCityMetric>>();
  const [lstUserDate, setLstUserDate] = useState<Array<UserDateMetric>>();


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

  useEffect(() => {
    fetchCountUser()
    fetchUserCityMetric()
    fetchUserDateMetric()
  }, [])

  return (
    <Layout>
      <main className="content">
        {console.log(lstUserCity)}
        {console.log(lstUserDate)}
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
                      <h5 className="card-title">Tổng số cửa hàng</h5>
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
                      <h5 className="card-title">Số cửa hàng đã duyệt</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numApprovedUser}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Số cửa hàng chờ duyệt</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numWaitingReviewUser}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-6 col-lg-3 col-xl">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col mt-0">
                      <h5 className="card-title">Số cửa hàng chờ active</h5>
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
                  <h1 className="display-5 mt-1 mb-3">{countUser?.numWaitingActiveUser}</h1>
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
                  <h5 className="card-title mb-0">Top nhà thầu tích cực</h5>
                </div>
                <div id="datatables-dashboard-products_wrapper" className="dataTables_wrapper dt-bootstrap4 no-footer"><div className="row"><div className="col-sm-12 col-md-6" /><div className="col-sm-12 col-md-6" /></div><div className="row"><div className="col-sm-12"><table id="datatables-dashboard-products" className="table table-striped my-0 dataTable no-footer" role="grid" aria-describedby="datatables-dashboard-products_info">
                  <thead>
                    <tr role="row"><th className="sorting_asc" tabIndex={0} aria-controls="datatables-dashboard-products" rowSpan={1} colSpan={1} aria-sort="ascending" aria-label="Name: activate to sort column descending">Name</th><th className="d-none d-xl-table-cell sorting" tabIndex={0} aria-controls="datatables-dashboard-products" rowSpan={1} colSpan={1} aria-label="License: activate to sort column ascending">License</th><th className="d-none d-xl-table-cell sorting" tabIndex={0} aria-controls="datatables-dashboard-products" rowSpan={1} colSpan={1} aria-label="Technology: activate to sort column ascending">Technology</th><th className="d-none d-xl-table-cell sorting" tabIndex={0} aria-controls="datatables-dashboard-products" rowSpan={1} colSpan={1} aria-label="Tickets: activate to sort column ascending">Tickets</th><th className="sorting" tabIndex={0} aria-controls="datatables-dashboard-products" rowSpan={1} colSpan={1} aria-label="Sales: activate to sort column ascending">Sales</th></tr>
                  </thead>
                  <tbody>
                    <tr role="row" className="odd">
                      <td className="sorting_1">Abel</td>
                      <td className="d-none d-xl-table-cell">Single license</td>
                      <td><span className="badge badge-danger">Angular</span></td>
                      <td className="d-none d-xl-table-cell">80</td>
                      <td className="d-none d-xl-table-cell">150</td>
                    </tr><tr role="row" className="even">
                      <td className="sorting_1">Ada</td>
                      <td className="d-none d-xl-table-cell">Single license</td>
                      <td><span className="badge badge-info">Vue</span></td>
                      <td className="d-none d-xl-table-cell">60</td>
                      <td className="d-none d-xl-table-cell">610</td>
                    </tr><tr role="row" className="odd">
                      <td className="sorting_1">AppStack</td>
                      <td className="d-none d-xl-table-cell">Single license</td>
                      <td><span className="badge badge-success">HTML</span></td>
                      <td className="d-none d-xl-table-cell">50</td>
                      <td className="d-none d-xl-table-cell">720</td>
                    </tr><tr role="row" className="even">
                      <td className="sorting_1">Libre</td>
                      <td className="d-none d-xl-table-cell">Single license</td>
                      <td><span className="badge badge-warning">React</span></td>
                      <td className="d-none d-xl-table-cell">30</td>
                      <td className="d-none d-xl-table-cell">280</td>
                    </tr><tr role="row" className="odd">
                      <td className="sorting_1">Material Blog</td>
                      <td className="d-none d-xl-table-cell">Single license</td>
                      <td><span className="badge badge-info">Vue</span></td>
                      <td className="d-none d-xl-table-cell">10</td>
                      <td className="d-none d-xl-table-cell">480</td>
                    </tr><tr role="row" className="even">
                      <td className="sorting_1">Milo</td>
                      <td className="d-none d-xl-table-cell">Single license</td>
                      <td><span className="badge badge-warning">React</span></td>
                      <td className="d-none d-xl-table-cell">40</td>
                      <td className="d-none d-xl-table-cell">280</td>
                    </tr></tbody>
                </table></div></div><div className="row"><div className="col-sm-12 col-md-5"><div className="dataTables_info" id="datatables-dashboard-products_info" role="status" aria-live="polite">Showing 1 to 6 of 9 entries</div></div><div className="col-sm-12 col-md-7"><div className="dataTables_paginate paging_simple_numbers" id="datatables-dashboard-products_paginate"><ul className="pagination"><li className="paginate_button page-item previous disabled" id="datatables-dashboard-products_previous"><a href="#" aria-controls="datatables-dashboard-products" data-dt-idx={0} tabIndex={0} className="page-link">Previous</a></li><li className="paginate_button page-item active"><a href="#" aria-controls="datatables-dashboard-products" data-dt-idx={1} tabIndex={0} className="page-link">1</a></li><li className="paginate_button page-item "><a href="#" aria-controls="datatables-dashboard-products" data-dt-idx={2} tabIndex={0} className="page-link">2</a></li><li className="paginate_button page-item next" id="datatables-dashboard-products_next"><a href="#" aria-controls="datatables-dashboard-products" data-dt-idx={3} tabIndex={0} className="page-link">Next</a></li></ul></div></div></div></div>
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
