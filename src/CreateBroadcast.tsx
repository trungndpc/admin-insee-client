import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import Select from 'react-select'
import { City, District } from './utils/ProvinceUtil'
import { useEffect, useState } from "react";
import { Broadcast, Post } from "./interface";
import * as BroadcastType from './constant/BroadcastType'
import PostModel from "./model/PostModel";
import BroadcastModel from "./model/BroadcastModel";
import AlertUtils from "./utils/AlertUtils";
import { AreYouSurePopup } from "./popup";
import { useNavigate } from 'react-router-dom';


const cityOptions = City.getOptions()
function CreateBroadcast() {

  const [form, setForm] = useState<Broadcast>({} as Broadcast)
  const [errorMsg, setErrorMsg] = useState<string>()
  const [lstPost, setLstPost] = useState<Array<Post>>()
  const [isShowPopup, setIsShowPopup] = useState(false)
  const navigate = useNavigate()

  const fetchGetListPost = () => {
    PostModel.getList()
      .then(resp => {
        if (resp.error == 0) {
          setLstPost(resp.data)
        }
      })
  }

  const isValidForm = (): boolean => {
    if (!form.name) {
      setErrorMsg('Vui lòng nhập title')
      return false;
    }

    if (!form.type) {
      setErrorMsg('Vui lòng chọn loại broadcast')
      return false;
    }

    if (form.type == BroadcastType.REQUEST_REGISTER_ZNS) {
      setErrorMsg('Chưa hỗ trợ type này')
      return false;
    }

    if (!form.cityIds) {
      setErrorMsg('Vui lòng chọn ít nhất một thành phố')
      return false;
    }
    return true;

  }

  const createBroadcast = () => {
    BroadcastModel.create(form)
      .then(resp => {
        if (resp.error == 0) {
          navigate('/broadcast')
          AlertUtils.showSuccess('Thành công')
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }


  useEffect(() => {
    fetchGetListPost()
  }, [])

  return (
    <Layout>
      <AreYouSurePopup open={isShowPopup} onCloseModal={() => {
        setIsShowPopup(false)
      }} onAgree={() => {
        createBroadcast()
        setIsShowPopup(false)
      }} />
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Broadcast
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  {/* <h5 className="card-title">Thông tin chương trình khuyến mãi</h5> */}
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-8">
                        <label htmlFor="inputEmail4">Title</label>
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, name: e.currentTarget.value }) }} className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Type</label>
                        <select onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, type: Number(e.currentTarget.value) }) }} id="inputState" className="form-control">
                          <option selected>Choose...</option>
                          <option value={BroadcastType.REQUEST_REGISTER_ZNS}>{BroadcastType.findName(BroadcastType.REQUEST_REGISTER_ZNS)}</option>
                          <option value={BroadcastType.BROADCAST_NORMAL_POST}>{BroadcastType.findName(BroadcastType.BROADCAST_NORMAL_POST)}</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Time Start</label>
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          let time = new Date(e.currentTarget.value).getTime();
                          setForm({ ...form, timeStart: time })
                        }} type="datetime-local" className="form-control" />
                      </div>
                      {form.type == BroadcastType.BROADCAST_NORMAL_POST &&
                        <div className="form-group col-md-4">
                          <label htmlFor="inputState">Bài viết</label>
                          <select onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, postId: Number(e.currentTarget.value) }) }} id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            {lstPost && lstPost.map((post) => {
                              return (
                                <option value={post.id}>{post.title}</option>
                              )
                            })}
                          </select>
                        </div>
                      }
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">City</label>
                        <Select
                          isClearable={true}
                          isMulti={true}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setForm({ ...form, cityIds: list })
                          }}
                          options={cityOptions}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Location</label>
                        <Select
                          isClearable={true}
                          isMulti={true}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setForm({ ...form, districtIds: list })
                          }}
                          options={(form.cityIds && District.getOption(form.cityIds)) ? District.getOption(form.cityIds) : []}
                        />
                      </div>
                    </div>
                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                    <div onClick={() => {
                      if (isValidForm()) {
                        setIsShowPopup(true)
                      }
                    }} className="btn btn-primary">Submit</div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default CreateBroadcast;
