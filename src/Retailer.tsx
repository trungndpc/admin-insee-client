import Layout from "./component/Layout";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useEffect, useState } from "react";
import { RegisterForm, Page, User, UserFilter } from "./interface";
import { City, District } from './utils/ProvinceUtil'
import { getListForRetailer } from "./utils/CementUtil";
import UserModel from "./model/UserModel";
import { Link } from "react-router-dom";
import * as UserStatus from './constant/UserStatus';
import AlertUtils from "./utils/AlertUtils";
import DateTimeUtil from "./utils/DateTimeUtil";
import { useSearchParams } from 'react-router-dom';

const default_avatar = 'http://cdn.onlinewebfonts.com/svg/img_264570.png'
const PAGE_SIZE = 500;
function Retailer() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(0);
  const [userPage, setUserPage] = useState<Page<User>>()
  const [isOpenImportCustomerPopup, setIsOpenImportCustomerPopup] = useState(false)
  const [filter, setFilter] = useState<UserFilter>({} as UserFilter)

  const fetchUsers = (cityId: number, status: number) => {
    UserModel.find(cityId, status, 0, PAGE_SIZE)
      .then(resp => {
        if (resp.error == 0) {
          setUserPage(resp.data)
          serialize2Url({ ...filter, cityId: cityId, status: status })
        }
      })
  }

  const exportUser = () => {
    var url = new URL(`${process.env.REACT_APP_DOMAIN}/api/user/export-excel`);
    if (filter.status && filter.status != 0) {
      url.searchParams.append('status', filter.status + '');
    }
    if (filter.cityId && filter.cityId != 0) {
      url.searchParams.append('city', filter.cityId + '');
    }
    window.open(url.toString(), '_blank')
  }

  const serialize2Url = (f: UserFilter) => {
    var str = JSON.stringify(f)
    if (str != "{}") {
      searchParams.set('filter', str)
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    var param = searchParams.get('filter') as string;
    var userFilter = { ...filter }
    if (param) {
      userFilter = JSON.parse(param)
    }
    fetchUsers(userFilter.cityId, userFilter.status)
    setFilter(userFilter)
  }, [])

  return (
    <Layout>
      {isOpenImportCustomerPopup &&
        <ImportCustomerPopup open={isOpenImportCustomerPopup} onCloseModal={() => {
          setIsOpenImportCustomerPopup(false)
          fetchUsers(filter.cityId, filter.status)
        }} />
      }
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              C???a h??ng
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-bar" style={{ padding: '10px' }}>
                  <div className="row ">
                    <div className="col-2 col-xl-2 ml-auto">
                      <select value={filter.cityId ? filter.cityId : 0} onChange={(e: React.FormEvent<HTMLSelectElement>) => {
                        fetchUsers(Number(e.currentTarget.value), filter.status)
                        setFilter({ ...filter, cityId: Number(e.currentTarget.value) })
                      }} className="form-control">
                        <option value={0}>Th??nh ph???</option>
                        {City.getList().map((value) => {
                          return (
                            <option key={value.key} value={value.key}>{value.value}</option>
                          )
                        })}
                      </select>
                    </div>

                    <div className="col-2 col-xl-2 ">
                      <select value={filter.status ? filter.status : 0} onChange={(e: React.FormEvent<HTMLSelectElement>) => {

                        fetchUsers(filter.cityId, Number(e.currentTarget.value))
                        setFilter({ ...filter, status: Number(e.currentTarget.value) })

                      }} className="form-control">
                        <option value={0}>Tr???ng th??i</option>
                        <option value={UserStatus.APPROVED}>???? duy???t</option>
                        <option value={UserStatus.WAITING_ACTIVE}>Ch??? active</option>
                        <option value={UserStatus.WAIT_APPROVAL}>Ch??? duy???t</option>
                        <option value={UserStatus.WAIT_COMPLETE_PROFILE}>Ch??? ho??n th??nh h??? s??</option>
                      </select>
                    </div>
                    <button style={{ marginRight: '10px !important' }} onClick={() => { setIsOpenImportCustomerPopup(true) }} className="btn btn-primary mr-1">Import</button>
                    <button style={{ marginRight: '20px !important', backgroundColor: '#6f42c1' }} onClick={() => { exportUser() }} className="btn btn-primary mr-1">Export</button>
                  </div>

                </div>
                <table className="table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>SDT</th>
                      <th>C???a h??ng</th>
                      <th>Th??nh ph??? / Qu???n</th>
                      <th>INSEE ID</th>
                      <th>Th???i gian</th>
                      <th>Tr???ng th??i</th>
                      <th>UTM</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPage && userPage.list && userPage.list.map((user, key) => {
                      return (
                        <tr key={key}>
                          <td><img className="m-avatar" src={user.avatar ? user.avatar : default_avatar} /></td>
                          <td>{user.phone}</td>
                          <td>{user.name}</td>
                          <td>{City.getName(user.cityId)}</td>
                          <td>{user.inseeId}</td>
                          <td>{DateTimeUtil.toString(user.createdTime * 1000)}</td>
                          <td><span style={{ backgroundColor: UserStatus.findColor(user.status) }} className="badge badge-info">{UserStatus.findName(user.status)}</span></td>
                          <td>{user.utm ? user.utm : ''}</td>
                          <td className="table-action">
                            <Link to={`/retailer/${user.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
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
  const [file, setFile] = useState(null as any);

  const submit = () => {
    if (file != null) {
      UserModel.uploadFile(file)
        .then(resp => {
          onCloseModal()
          if (resp.error == 0) {
            AlertUtils.showSuccess('Upload th??nh c??ng')
          } else {
            AlertUtils.showError(resp.msg);
          }
        })
    }
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
          width: '500px'
        },
      }}
    >
      <div className={owlClass}>
        <div style={{ margin: '0' }} className="row">
          <div style={{ padding: '0' }} className="col-12">
            <div style={{ margin: '0' }} className="card">
              <div className="card-header">
                <h5 className="card-title">Th??ng tin kh??ch h??ng</h5>
                <h6 className="card-subtitle text-muted">Vui l??ng nh???p th??ng tin kh??ch h??ng</h6>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div style={{ margin: '0' }} className="row">
                    <div className="col-12 col-lg-12">
                      <div className="form-group">
                        <label className="form-label w-100">File input</label>
                        <input onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                          setFile(event.target.files![0])
                        }} type="file" />
                        <small className="form-text text-muted">Example block-level help text here.</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingRight: '20px' }} className="cart-btn-bar">
                <button onClick={() => { onCloseModal() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1 btn-cancel">H???y</button>
                <button onClick={() => { submit() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

function ImportCustomerPopup2({ open, onCloseModal }: any) {
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
          AlertUtils.showSuccess("Import th??nh c??ng")
        } else {
          AlertUtils.showError(resp.msg)
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
                <h5 className="card-title">Th??ng tin kh??ch h??ng</h5>
                <h6 className="card-subtitle text-muted">Vui l??ng nh???p th??ng tin kh??ch h??ng</h6>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div style={{ margin: '0' }} className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label>INSEE ID</label>
                        <input value={form.inseeId} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, inseeId: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>S?? ??i???n tho???i</label>
                        <input value={form.phone} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, phone: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>T??n</label>
                        <input value={form.name} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, name: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <label>Th??nh ph???</label>
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
                        <label>Qu???n</label>
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
                        <label>?????a ch???</label>
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
                <button onClick={() => { onCloseModal() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1 btn-cancel">H???y</button>
                <button onClick={() => { submit() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}