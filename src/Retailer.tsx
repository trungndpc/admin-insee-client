import Layout from "./component/Layout";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { RegisterForm, Page, User } from "./interface";
import { City, District } from './utils/ProvinceUtil'
import { getListForRetailer } from "./utils/CementUtil";
import UserModel from "./model/UserModel";
import { Link } from "react-router-dom";
import * as UserStatus from './constant/UserStatus';

const  default_avatar = 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
const PAGE_SIZE = 10;
function Retailer() {
  const [page, setPage] = useState(0);
  const [userPage, setUserPage] = useState<Page<User>>()
  const [isOpenImportCustomerPopup, setIsOpenImportCustomerPopup] = useState(false)

  const fetchUsers = () => {
    UserModel.find(0, PAGE_SIZE)
      .then(resp => {
        if (resp.error == 0) {
          setUserPage(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <Layout>
      {isOpenImportCustomerPopup &&
        <ImportCustomerPopup open={isOpenImportCustomerPopup} onCloseModal={() => { setIsOpenImportCustomerPopup(false) }} />
      }
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Cửa hàng
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-card-title">Danh sách cửa hàng</h5>
                  <div className="cart-btn-bar">
                    <button onClick={() => { setIsOpenImportCustomerPopup(true) }} className="btn btn-primary mr-1">Import Khách hàng</button>
                  </div>
                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th></th>
                      <th>SDT</th>
                      <th>Cửa hàng</th>
                      <th>Thành phố / Quận</th>
                      <th>Trạng thái</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPage && userPage.list && userPage.list.map((user, key) => {
                      return (
                        <tr>
                          <td>{user.id}</td>
                          <td><img className="m-avatar" src={user.avatar ? user.avatar : default_avatar} /></td>
                          <td>{user.phone}</td>
                          <td>{user.phone}</td>
                          <td>{City.getName(user.cityId)}</td>
                          <td><span style={{backgroundColor: UserStatus.findColor(user.status)}} className="badge badge-info">{UserStatus.findName(user.status)}</span></td>
                          <td className="table-action">
                            <Link  to={`/retailer/${user.id}`}><i style={{fontSize: '30px'}} className="align-middle ion ion-ios-play mr-2" /></Link>
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

export default Retailer;

const owlClass = "popup";
function ImportCustomerPopup({ open, onCloseModal }: any) {
  const [form, setForm] = useState<RegisterForm>({} as RegisterForm)

  const onSelectCement = (cementId: number) => {
    let cements = form.cements ? form.cements : [];
    if (cements.includes(cementId)) {
      cements = cements.filter((e) => e != cementId);
    } else {
      cements.push(cementId)
    }
    setForm({ ...form, cements: cements })
  }

  const submit = () => {
    UserModel.create(form)
      .then(resp => {
        if (resp.error == 0) {
          onCloseModal()
          alert("OK")
        } else {
          alert(resp.error)
        }
      })
  }

  return (
    <Modal
      open={open}
      onClose={onCloseModal}
      center
      showCloseIcon={false}
      styles={{
        modal: {
          background: "rgba(242, 242, 242, 0.94)",
          backdropFilter: "blur(54.3656px)",
          borderRadius: "14px",
          padding: "0",
          width: '800px'
        },
      }}
    >
      <div className={owlClass}>
        <div style={{ margin: '0' }} className="row">
          <div style={{ padding: '0' }} className="col-12">
            <div style={{ margin: '0' }} className="card">
              <div className="card-header">
                <h5 className="card-title">Thông tin khách hàng</h5>
                <h6 className="card-subtitle text-muted">Vui lòng nhập thông tin khách hàng</h6>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div style={{ margin: '0' }} className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label>Sô điện thoại</label>
                        <input value={form.phone} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, phone: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Tên</label>
                        <input value={form.name} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, name: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label>Thành phố</label>
                        <select className="form-control" value={form.cityId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, cityId: Number(e.currentTarget.value) }) }}>
                          {(!form.cityId || form.cityId == 0) &&
                            <option value={0}></option>
                          }
                          {City.getList().map((value) => {
                            return (
                              <option key={value.key} value={value.key}>{value.value}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Quận</label>
                        <select className="form-control" value={form.districtId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, districtId: Number(e.currentTarget.value) }) }}>
                          {(!form.districtId || form.districtId == 0) &&
                            <option value={0}></option>
                          }
                          {(form.cityId && form.cityId != 0) && District.getList(form.cityId).map((value) => {
                            return (
                              <option key={value.key} value={value.key}>{value.value}</option>
                            )
                          })}
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Địa chỉ</label>
                        <input value={form.address} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, address: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-lg-12">
                      {getListForRetailer().map(value => {
                        return (
                          <label onClick={() => { onSelectCement(Number(value.id)) }} className="form-check">
                            <input className="form-check-input" checked={form.cements ? form.cements.includes(Number(value.id)) : false} type="checkbox" />
                            <span className="form-check-label">
                              {value.name}
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingRight: '20px' }} className="cart-btn-bar">
                <button onClick={() => { onCloseModal() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1 btn-cancel">Hủy</button>
                <button onClick={() => { submit() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}