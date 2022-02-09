import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import PromotionModel from "./model/PromotionModel";
import { useEffect, useState } from "react";
import { Page, Promotion } from "./interface";
import { Link } from "react-router-dom";
import { City } from "./utils/ProvinceUtil";
import * as CementUtil from "./utils/CementUtil";


function Promotions() {
  const [promotionPage, setPromotionPage] = useState<Page<Promotion>>()

  const fetchPromotionPage = () => {
    PromotionModel.list()
      .then(resp => {
        if (resp.error == 0) {
          setPromotionPage(resp.data);
        }
      })
  }

  useEffect(() => {
    fetchPromotionPage()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Promotions
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Danh sách các chiến dịch khuyến mãi</h5>
                  <div className="cart-btn-bar">
                    <Link to={"/promotion/create"} className="btn btn-primary mr-1">Thêm chiến dịch mới</Link>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Title</th>
                      <th>Type</th>
                      <th>Locations</th>
                      <th>Cements</th>
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
                          <td>{promotion.type == 20 ? 'Stock Promotion' : 'Lighting Quiz Game Promotion'}</td>
                          <td>
                            {promotion.locations.map((l: number) => City.getName(l)).join(", ")}
                          </td>
                          <td>
                            {promotion.cements.map((l : number) => CementUtil.findById(l)?.name).join(", ")}
                          </td>
                          <td><span className="badge badge-info">Khởi tạo</span></td>
                          <td className="table-action">
                            <Link to={`/promotion/detail/${promotion.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
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

export default Promotions;
