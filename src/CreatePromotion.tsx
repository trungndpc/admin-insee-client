import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import Select from 'react-select'
import * as CementEnum from '../src/component/enum/CementEnum'
import { City } from '../src/utils/ProvinceUtil'
import { useState } from "react";
import { Promotion } from "./interface";
import PromotionModel from "./model/PromotionModel";

const cementOptions = CementEnum.getOption()
const locationOptions = City.getOptions()
function CreatePromotion() {

  const [form, setForm] = useState<Promotion>({} as Promotion)
  const [errorMsg, setErrorMsg] = useState<string>()

  const submit = () => {
    if (!form.title || !form.type
      || !form.locations || form.locations.length <= 0
      || !form.cements || form.cements.length <= 0
      || !form.timeStart || !form.timeEnd) {
      setErrorMsg('Vui lòng điền đủ thông tin')
      return;
    }
    PromotionModel.create(form)
    .then(resp => {
      console.log(resp)
      if (resp.error == 0) {
        // window.location.href = "/promotion"
      }
    })
  }


  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Promotion Form
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
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, title: e.currentTarget.value }) }} className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Type</label>
                        <select onChange={(e: React.FormEvent<HTMLSelectElement>) => { setForm({ ...form, type: Number(e.currentTarget.value) }) }} id="inputState" className="form-control">
                          <option selected>Choose...</option>
                          <option value={20}>Stock Promotion</option>
                          <option value={21}>Lighting Quiz Promotion</option>
                        </select>
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Time Start</label>
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setForm({ ...form, timeStart: Number(e.currentTarget.valueAsDate?.getTime()) })
                        }} type="date" className="form-control" />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Time End</label>
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setForm({ ...form, timeEnd: Number(e.currentTarget.valueAsDate?.getTime()) })
                        }} type="date" className="form-control" />
                      </div>
                    </div>
                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Cement</label>
                        <Select
                          isClearable={true}
                          isMulti={true}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setForm({ ...form, cements: list })
                          }}
                          options={cementOptions}
                        />
                      </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="inputState">Location</label>
                        <Select
                          isClearable={true}
                          isMulti={true}
                          onChange={(e) => {
                            let list = e.map((x: any) => Number(x.value));
                            setForm({ ...form, locations: list })
                          }}
                          options={locationOptions}
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

export default CreatePromotion;
