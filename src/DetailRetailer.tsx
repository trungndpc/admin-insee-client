import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import "../src/popup/styles.scss";
import { useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import UserModel from "./model/UserModel";
import { User } from "./interface";
import { City, District } from "./utils/ProvinceUtil";
import { AreYouSurePopup } from "./popup";
import * as UserStatus from './constant/UserStatus';

const default_avatar = 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
function DetailRetailer() {
  let { id } = useParams();
  const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false)
  const [user, setUser] = useState<User>()

  const fetchUser = (id: any) => {
    UserModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          setUser(resp.data)
        }
      })
  }

  const updateStatus = (id: any, status: number) => {
    UserModel.updateStatus(id, status)
      .then(resp => {
        if (resp.error == 0) {
          fetchUser(id);
        }
      })
  }

  useEffect(() => {
    fetchUser(id)
  }, [])

  return (
    <Layout>
      {<AreYouSurePopup open={isShowConfirmPopup} onAgree={() => {
        setIsShowConfirmPopup(false)
        updateStatus(user?.id, UserStatus.APPROVED)
      }} onCloseModal={() => {
        setIsShowConfirmPopup(false)
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
                                <label htmlFor="inputUsername">Tên</label>
                                <input type="text" className="form-control" value={user.name} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Số điện thoại</label>
                                <input type="text" className="form-control" value={user.phone} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Thành phố / Tỉnh</label>
                                <input type="text" className="form-control" value={City.getName(user.cityId)} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Quận / Huyện</label>
                                <input type="text" className="form-control" value={District.getName(user.districtId)} />
                              </div>
                              <div className="form-group">
                                <label htmlFor="inputUsername">Địa chỉ</label>
                                <input type="text" className="form-control" value={user.address} />
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
                        {user.status == UserStatus.WAIT_APPROVAL &&
                          <button onClick={() => { setIsShowConfirmPopup(true) }} type="submit" className="btn btn-danger m-btn-danger">Duyệt</button>
                        }
                        <button style={{ marginLeft: '30px', padding: '5px 30px' }} type="submit" className="btn btn-delete">Xóa</button>
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
