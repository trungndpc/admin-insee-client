import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import Select from 'react-select'
import { City, District } from './utils/ProvinceUtil'
import { useEffect, useState } from "react";
import { Promotion } from "./interface";
import PromotionModel from "./model/PromotionModel";
import { useParams } from "react-router-dom";
import AlertUtils from "./utils/AlertUtils";
import { useNavigate } from 'react-router-dom';

const locationOptions = City.getOptions()
function CreateOrUpdateEngagement() {
  let { id } = useParams();
  const [form, setForm] = useState<Promotion>({} as Promotion)
  const [errorMsg, setErrorMsg] = useState<string>()
  const navigate = useNavigate()


  const fetchPromotion = () => {
    PromotionModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          setForm(resp.data)
        }
      })
  }

  const submit = () => {
    if (!form.title || !form.type
      || !form.timeStart || !form.timeEnd) {
      setErrorMsg('Vui lòng điền đủ thông tin')
      return;
    }

    if (id) {
      PromotionModel.update(form)
        .then(resp => {
          if (resp.error == 0) {
            AlertUtils.showSuccess('Thành công')
          } else {
            AlertUtils.showError(resp.msg)
          }
        })
    } else {
      PromotionModel.create(form)
        .then(resp => {
          if (resp.error == 0) {
            if (form.type == 21) {
              navigate('/egagement')
            } else {
              navigate('/promotion')
            }
            AlertUtils.showSuccess('Thành công')
          } else {
            AlertUtils.showError(resp.msg)
          }
        })
    }

  }

  useEffect(() => {
    if (id) {
      fetchPromotion()
    }
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Promotion
            </h1>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Thông tin chương trình khuyến mãi</h5>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-8">
                        <label htmlFor="inputEmail4">Title</label>
                        <input value={form.title} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, title: e.currentTarget.value }) }} className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Type</label>
                        <select value={form.type} disabled={id != null} onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, type: Number(e.currentTarget.value) }) }} id="inputState" className="form-control">
                          <option selected>Choose...</option>
                          {/* <option value={20}>Stock Promotion</option> */}
                          <option value={21}>Lighting Quiz Promotion</option>
                          <option value={0}>Dự đoán kết quả bóng đá</option>
                          {/* <option value={0}>Loyalty</option> */}
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Time Start</label>
                        <input value={form.timeStart ? new Date(form.timeStart).toISOString().slice(0, 10) : ''}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setForm({ ...form, timeStart: Number(e.currentTarget.valueAsDate?.getTime()) })
                          }} type="date" className="form-control" />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Time End</label>
                        <input value={form.timeEnd ? new Date(form.timeEnd).toISOString().slice(0, 10) : ''}
                          onChange={(e: React.FormEvent<HTMLInputElement>) => {
                            setForm({ ...form, timeEnd: Number(e.currentTarget.valueAsDate?.getTime()) })
                          }} type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">City</label>
                        <Select
                          isClearable={true}
                          isMulti={true}
                          value={form.cityIds && form.cityIds.map((id: number) => {
                            return {
                              value: id,
                              label: City.getName(id)
                            }
                          })}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setForm({ ...form, cityIds: list })
                          }}
                          options={locationOptions}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">District</label>
                        <Select
                          isClearable={true}
                          isMulti={true}
                          value={form.districtIds && form.districtIds.map((id: number) => {
                            return {
                              value: id,
                              label: District.getName(id)
                            }
                          })}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setForm({ ...form, districtIds: list })
                          }}
                          options={form.cityIds ? District.getOption(form.cityIds) : []}
                        />
                      </div>
                    </div>
                    {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
                    <div onClick={submit} className="btn btn-primary">Submit</div>
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

export default CreateOrUpdateEngagement;
