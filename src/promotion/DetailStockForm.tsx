import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import '../../src/popup/styles.scss'
import { useEffect, useReducer, useState } from "react";
import { FormGift, ImgRealtimePhoto, StockForm } from "../interface";
import { City, District } from "../utils/ProvinceUtil";
import { AreYouSurePopup, AreYouSureWithNotePopup } from "../popup";
import FormModel from "../model/FormModel";
import AlertUtils from "../utils/AlertUtils";
import * as StockFormStatus from '../constant/StockFormStatus';
import { SendGiftPopup } from '../gift/popup';
import GiftModel from "../model/GiftModel";
import DateTimeUtil from "../utils/DateTimeUtil";

function DetailStockForm({ data }: any) {
  const [isShowImgModel, setIsShowImgModel] = useState(false)
  const [isShowApporvedPopup, setIsShowApporvedPopup] = useState(false)
  const [isRejectPopup, setIsRejectPopup] = useState(false)
  const [form, setForm] = useState<StockForm>();
  const [selectedJSONImg, setSelectedJSONImg] = useState<ImgRealtimePhoto>()
  const [isShowGiftPopup, setIsShowGiftPopup] = useState(false)

  const updateStatus = (id: any, status: number, note: any) => {
    FormModel.updateStatus(id, status, note)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess("Thành công!")
        } else {
          AlertUtils.showError(resp.msg)
        }
        fetchForm()
      })
  }

  const fetchForm = () => {
    FormModel.get(form?.id)
      .then(resp => {
        if (resp.error == 0) {
          setForm(resp.data)
        }
      })
  }

  const sendGift = (formGift: FormGift) => {
    GiftModel.create(form?.id, formGift)
      .then(resp => {
        if (resp.error == 0) {
          AlertUtils.showSuccess('Thành công')
          fetchForm()
        } else {
          AlertUtils.showError(resp.msg)
        }
      })
  }

  useEffect(() => {
    setForm(data as StockForm)
  }, [])

  return (
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
                    {form &&
                      <form>
                        <div className="row">
                          <div className="col-md-4">
                            <div className="form-group">
                              <label htmlFor="inputUsername">Tên</label>
                              <input type="text" className="form-control" value={form.user.name} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="inputUsername">Số điện thoại</label>
                              <input type="text" className="form-control" value={form.user.phone} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="inputUsername">Địa chỉ</label>
                              <input type="text" className="form-control" value={`${form.user.address} - ${District.getName(form.user.districtId)} - ${City.getName(form.user.cityId)} `} />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="text-center">
                              <div className="previews-img-container">
                                {form && form.jsonImgs.map((jsonImg: ImgRealtimePhoto) => {
                                  return (
                                    <div onClick={() => {
                                      setSelectedJSONImg(jsonImg)
                                      setIsShowImgModel(true)
                                    }} className="item">
                                      <img src={jsonImg.url} />
                                    </div>
                                  )
                                })}
                              </div>
                            </div>
                          </div>
                        </div>

                      </form>
                    }
                  </div>
                  <div className="card-footer">
                    {form?.status == StockFormStatus.INIT &&
                      <>
                        <button onClick={() => setIsShowApporvedPopup(true)} className="btn btn-danger m-btn-danger">Duyệt</button>
                        <AreYouSurePopup open={isShowApporvedPopup} onCloseModal={() => { setIsShowApporvedPopup(false) }}
                          onAgree={() => {
                            updateStatus(form?.id, StockFormStatus.APPROVED, null)
                            setIsShowApporvedPopup(false)
                          }} />

                        <button onClick={() => setIsRejectPopup(true)} style={{ marginLeft: '30px', padding: '5px 30px' }} className="btn btn-delete">Không duyệt</button>
                        <AreYouSureWithNotePopup open={isRejectPopup} onCloseModal={() => { setIsRejectPopup(false) }}
                          onAgree={(note) => {
                            updateStatus(form?.id, StockFormStatus.REJECTED, note)
                            setIsRejectPopup(false)
                          }} />
                      </>
                    }
                    {form?.status == StockFormStatus.APPROVED &&
                      <button onClick={() => setIsShowGiftPopup(true)} className="btn btn-danger m-btn-danger">Gửi quà</button>
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SendGiftPopup open={isShowGiftPopup} onCloseModal={() => { setIsShowGiftPopup(false) }} onAgree={(form) => {
          sendGift(form)
          setIsShowGiftPopup(false)
        }} />
        <ImagePopup open={isShowImgModel}
          onCloseModal={() => { setIsShowImgModel(false) }}
          url={selectedJSONImg?.url}
          time={selectedJSONImg?.time}
          location={selectedJSONImg?.location}
        />
      </div>
    </main>
  );
}

export default DetailStockForm;

const owlClass = "popup";
export function ImagePopup({ open, onCloseModal, url, time, location }: any) {
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
          maxWidth: "80%"
        },
      }}
    >
      <div className={owlClass}>
        <div className={`${owlClass}__wrapper`}>
          <img style={{ maxHeight: '70vh', maxWidth: '70vw' }} src={url} alt="" />
          <p style={{marginTop: '20px', lineHeight: '5px'}}>Thời gian: {DateTimeUtil.toString(time)}</p>
          {location && <p>Vị trí: {JSON.stringify(location)}</p>}
        </div>
        <div className={`${owlClass}__group-btn`}>
          <div
            className={`${owlClass}__group-btn__item right`}
            onClick={onCloseModal}
          >
            Đóng
          </div>
        </div>
      </div>
    </Modal>
  );
}
