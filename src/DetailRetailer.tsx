import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import UserModel from "./model/UserModel";
import { User } from "./interface";
import { City, District } from "./utils/ProvinceUtil";
import { AreYouSurePopup, AreYouSureWithNotePopup } from "./popup";
import * as UserStatus from './constant/UserStatus';
import { getListForRetailer } from "./utils/CementUtil";
import AlertUtils from "./utils/AlertUtils";

const default_avatar = 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
function DetailRetailer() {
  const navigate = useNavigate()
  let { id } = useParams();
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false)
  const [isShowConfirmUpdatePopup, setIsShowConfirmUpdatePopup] = useState(false)
  const [isShowConfirmDeletePopup, setIsShowConfirmDeletePopup] = useState(false)
  const [isShowConfirmWithNotePopup, setIsShowConfirmWithNotePopup] = useState(false)
  const [user, setUser] = useState<User>()


  const fetchUser = (id: any) => {
    UserModel.get(id)
      .then(resp => {
        if (resp.error === 0) {
          setUser(resp.data)
        }
      })
  }

  const updateStatus = (id: any, status: number, note: any) => {
    UserModel.updateStatus(id, status, note)
      .then(resp => {
        if (resp.error === 0) {
          fetchUser(id);
        }
      })
  }

  const update = () => {
    UserModel.update(user?.id, user)
      .then(resp => {
        if (resp.error === 0) {
          fetchUser(user?.id)
          AlertUtils.showSuccess("Thành công")
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  const onSelectCement = (cementId: number) => {
    let products = user?.products ? user?.products : [];
    if (products.includes(cementId)) {
      products = products.filter((e) => e !== cementId);
    } else {
      products.push(cementId)
    }
    user && setUser({ ...user, products: products })
  }

  useEffect(() => {
    fetchUser(id)
  }, [])

  return (
    <Layout>
      {<AreYouSurePopup open={isShowConfirmPopup} onAgree={() => {
        setIsShowConfirmPopup(false)
        updateStatus(user?.id, UserStatus.APPROVED, null)
      }} onCloseModal={() => {
        setIsShowConfirmPopup(false)
      }} />}

      {<AreYouSurePopup open={isShowConfirmDeletePopup} onAgree={() => {
        setIsShowConfirmDeletePopup(false)
        updateStatus(user?.id, UserStatus.DISABLED, null)
        navigate("/retailer/list")
      }} onCloseModal={() => {
        setIsShowConfirmDeletePopup(false)
      }} />}

      {<AreYouSurePopup open={isShowConfirmUpdatePopup} onAgree={() => {
        setIsShowConfirmUpdatePopup(false)
        update()
      }} onCloseModal={() => {
        setIsShowConfirmUpdatePopup(false)
      }} />}

      {<AreYouSureWithNotePopup open={isShowConfirmWithNotePopup} onAgree={(note) => {
        setIsShowConfirmWithNotePopup(false)
        updateStatus(user?.id, UserStatus.REJECTED, note)
      }} onCloseModal={() => {
        setIsShowConfirmWithNotePopup(false)
      }} />}

      <main className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 col-xl-12">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="account" role="tabpanel">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Thông tin cửa hàng</h5>
                    </div>
                    <div className="card-body">
                      {user &&
                        <form>
                          <div className="row">
                            <div className="col-md-8">
                              <div className="form-group">
                                <label htmlFor="inputUsername">INSEE ID</label>
                                <input type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => { setUser({ ...user, inseeId: e.currentTarget.value }) }} className="form-control" value={user.inseeId} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Tên</label>
                                <input type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => { setUser({ ...user, name: e.currentTarget.value }) }} className="form-control" value={user.name} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Số điện thoại</label>
                                <input type="text" className="form-control" value={user.phone} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Thành phố / Tỉnh</label>
                                <select className="form-control" value={user.cityId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setUser({ ...user, cityId: Number(e.currentTarget.value) }) }}>
                                  {(!user.cityId || user.cityId == 0) &&
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
                                <label htmlFor="inputUsername">Quận / Huyện</label>
                                <select className="form-control" value={user.districtId} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setUser({ ...user, districtId: Number(e.currentTarget.value) }) }}>
                                  {(!user.districtId || user.districtId === 0) &&
                                    <option value={0}></option>
                                  }
                                  {(user.cityId && user.cityId !== 0) && District.getList(user.cityId).map((value) => {
                                    return (
                                      <option key={value.key} value={value.key}>{value.value}</option>
                                    )
                                  })}
                                </select>
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Địa chỉ</label>
                                <input type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => { setUser({ ...user, address: e.currentTarget.value }) }} className="form-control" value={user.address} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Sản phẩm</label>
                                <br />
                                {getListForRetailer().map(value => {
                                  return (
                                    <label onClick={() => { onSelectCement(Number(value.id)) }} style={{ display: 'inline-block', paddingRight: '20px' }} className="form-check">
                                      <input className="form-check-input" checked={user.products ? user.products.includes(Number(value.id)) : false} type="checkbox" />
                                      <span className="form-check-label">
                                        {value.name}
                                      </span>
                                    </label>
                                  )
                                })}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="text-center">
                                <img alt="Chris Wood" src={user.avatar ? user.avatar : default_avatar} className="rounded-circle img-responsive mt-2" width={128} height={128} />
                              </div>

                            </div>
                          </div>
                        </form>
                      }
                    </div>
                    {user &&
                      <div className="card-footer">
                        {/* {(user.status != UserStatus.APPROVED && user.status != UserStatus.REJECTED) && */}
                        <button style={{ marginRight: '40px' }} onClick={() => { setIsShowConfirmUpdatePopup(true) }} type="submit" className="btn btn-danger m-btn-danger">Save</button>
                        {/* } */}
                        {user.status === UserStatus.WAIT_APPROVAL &&
                          <>
                            <button onClick={() => { setIsShowConfirmPopup(true) }} type="submit" className="btn btn-danger m-btn-danger">Duyệt</button>
                            <button onClick={() => { setIsShowConfirmWithNotePopup(true) }} style={{ marginLeft: '30px', backgroundColor: '#3e4676' }} type="submit" className="btn btn-danger m-btn-danger">Từ chối</button>
                          </>
                        }
                        <button onClick={() => { setIsShowConfirmDeletePopup(true) }} style={{ marginLeft: '30px', padding: '5px 30px' }} type="submit" className="btn btn-delete">Xóa</button>
                      </div>
                    }
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

export default DetailRetailer;
