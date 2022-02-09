import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import '../../src/popup/styles.scss'
import { useEffect, useReducer, useState } from "react";
import { StockForm } from "../interface";
import { City, District } from "../utils/ProvinceUtil";


function DetailStockForm({ data }: any) {
  const [isShowImgModel, setIsShowImgModel] = useState(false)
  const [form, setForm] = useState<StockForm>();


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
                            <div className="form-group">
                              <label htmlFor="inputUsername">Thời gian</label>
                              <input type="text" className="form-control" value={new Date(form.jsonImg.time).toLocaleString('vi')} />
                            </div>
                            <div className="form-group">
                              <label htmlFor="inputUsername">Vị trí</label>
                              <input type="text" className="form-control" value={JSON.stringify(form.jsonImg.location)} />
                            </div>
                          </div>
                          <div className="col-md-8">
                            <div className="text-center">
                              <img  onClick={() => {setIsShowImgModel(true)}} src={form.jsonImg.url} className="img-responsive mt-2" style={{maxHeight: '500px', maxWidth: '500px', cursor: 'pointer'}}/>
                            </div>
                          </div>
                        </div>

                      </form>
                    }
                  </div>
                  <div className="card-footer">
                    <button type="submit" className="btn btn-danger m-btn-danger">Duyệt</button>
                    <button style={{ marginLeft: '30px', padding: '5px 30px' }} type="submit" className="btn btn-delete">Không duyệt</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isShowImgModel &&
          <ImagePopup open={isShowImgModel} onCloseModal={() => { setIsShowImgModel(false) }} url={form?.jsonImg.url}/>
        }
      </div>
    </main>

  );
}

export default DetailStockForm;

const owlClass = "popup";
export function ImagePopup({ open, onCloseModal, url }: any) {
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
          <img src={url} alt="" />
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
