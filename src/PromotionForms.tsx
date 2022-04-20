import Layout from "./component/Layout";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { Page, Form, FormFilter, Promotion } from "./interface";
import { City, District } from './utils/ProvinceUtil'
import { getListForRetailer } from "./utils/CementUtil";
import UserModel from "./model/UserModel";
import { Link } from "react-router-dom";
import * as StockFormStatus from './constant/StockFormStatus';
import AlertUtils from "./utils/AlertUtils";
import FormModel from "./model/FormModel";
import PromotionModel from "./model/PromotionModel";
import { STOCK_PROMOTION_TYPE } from "./constant/PromotionType";
import DateTimeUtil from "./utils/DateTimeUtil";

const default_avatar = 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
const PAGE_SIZE = 10;
function PromotionForms() {
  const [formPage, setFormPage] = useState<Page<Form>>()
  const [filter, setFilter] = useState<FormFilter>({} as FormFilter)
  const [listPromotion, setListPromotion] = useState<Array<Promotion>>()


  const fetchListStockPromotion = () => {
    PromotionModel.list(STOCK_PROMOTION_TYPE)
      .then(resp => {
        if (resp.error == 0) {
          let lst: Array<Promotion> = resp.data.list;
          setListPromotion(lst);
          let ids = lst.map(e => e.id);
          setFilter({ ...filter, promotionIds: ids })
          fetchFormPromotions(ids, filter.cityId, filter.status)
        }
      })
  }

  const fetchFormPromotions = (ids, cityId, status) => {
    FormModel.findStockForm(ids, cityId, status, 0, PAGE_SIZE)
      .then(resp => {
        if (resp.error == 0) {
          setFormPage(resp.data)
        }
      })
  }


  useEffect(() => {
    fetchListStockPromotion()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Đơn tham gia
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-bar" style={{ padding: '10px' }}>
                  <div className="row ">
                    <div className="col-2 col-xl-2 ml-auto">
                      {listPromotion &&
                        <select value={(filter.promotionIds && filter.promotionIds.length == 1) ? filter.promotionIds[0] : 0} onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                          let promotionIds: Array<number> = [];
                          let promotionId = Number(e.currentTarget.value);
                          promotionIds.push(promotionId)
                          if (promotionId == 0) {
                            fetchFormPromotions(listPromotion.map(e => e.id), filter.cityId, filter.status)
                          } else {
                            fetchFormPromotions(promotionId, filter.cityId, filter.status)
                          }
                          setFilter({ ...filter, promotionIds: promotionIds })
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
                    <div className="col-2 col-xl-2">
                      <select value={filter.cityId ? filter.cityId : 0} onChange={(e: React.FormEvent<HTMLSelectElement>) => {

                        fetchFormPromotions(filter.promotionIds, Number(e.currentTarget.value), filter.status)
                        setFilter({ ...filter, cityId: Number(e.currentTarget.value) })

                      }} className="form-control">
                        <option value={0}>Thành phố</option>
                        {City.getList().map((value) => {
                          return (
                            <option key={value.key} value={value.key}>{value.value}</option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="col-2 col-xl-2 ">
                      <select value={filter.status ? filter.status : 0} onChange={(e: React.FormEvent<HTMLSelectElement>) => {

                        fetchFormPromotions(filter.promotionIds, filter.cityId, Number(e.currentTarget.value))
                        setFilter({ ...filter, status: Number(e.currentTarget.value) })

                      }} className="form-control">
                        <option value={0}>Trạng thái</option>
                        <option value={StockFormStatus.APPROVED}>Đã duyệt</option>
                        <option value={StockFormStatus.INIT}>Chờ duyệt</option>
                        <option value={StockFormStatus.SEND_GIFT}>Đã gửi quà</option>
                        <option value={StockFormStatus.REJECTED}>Đã từ chối</option>
                      </select>
                    </div>
                  </div>

                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Chiến dịch</th>
                      <th>Cửa hàng</th>
                      <th>Thành phố / Quận</th>
                      <th>INSEE ID</th>
                      <th>Thời gian</th>
                      <th>Trạng thái</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formPage && formPage.list && formPage.list.map((form, key) => {
                      return (
                        <tr>
                          <td><img className="m-avatar" src={form.user.avatar ? form.user.avatar : default_avatar} /></td>
                          <td>{form.promotion.title}</td>
                          <td>{form.user.name}</td>
                          <td>{City.getName(form.user.cityId)}</td>
                          <td>{form.user.inseeId}</td>
                          <td>{DateTimeUtil.toString(form.time * 1000)}</td>
                          <td><span style={{ backgroundColor: StockFormStatus.findColor(form.status) }} className="badge badge-info">{StockFormStatus.findName(form.status)}</span></td>
                          <td className="table-action">
                            <Link to={`/form/detail/${form.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
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

export default PromotionForms;
