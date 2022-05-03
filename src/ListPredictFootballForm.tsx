import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PredictMatchFootballFormModel from "./model/PredictMatchFootballFormModel";
import { Page, PredictMatchForm } from "./interface";

function ListPredictFootballForm() {
  let { id } = useParams();
  const [pageForm, setPageForm] = useState<Page<PredictMatchForm>>()

  const fetchPredictForm = (matchId) => {
    PredictMatchFootballFormModel.list(matchId, 0, 200)
      .then(resp => {
        if (resp.error == 0) {
          setPageForm(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchPredictForm(id)
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-card-title">Dach sách dự đoán</h5>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Dự đoán</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageForm && pageForm.list && pageForm.list.map((form: PredictMatchForm, index: number) => {
                      return (
                        <tr>
                          <td>{<img className="avatar" src={form.user.avatar} />}</td>
                          <td>{form.user.name}</td>
                          <td>{form.teamWin == 0 ? 'Hòa' : (form.teamWin == 1 ? `${form.match.teamOne} thắng` : `${form.match.teamTwo} thắng`)}</td>
                          <td>{form.status}</td>
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

export default ListPredictFootballForm;
