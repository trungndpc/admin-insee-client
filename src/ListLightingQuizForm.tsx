import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FormModel from "./model/FormModel";
import { LightingQuizForm, Page, Topic } from "./interface";
import { AreYouSurePopup } from "./popup";
import LQPromotionModel from "./model/LQPromotionModel";
import * as TopicStatus from './constant/TopicStatus';

function ListLightingQuizForm() {
  let { id, topicId } = useParams();
  const [page, setPage] = useState<Page<LightingQuizForm>>()
  const [isShowPopup, setIsShowPopup] = useState(false)
  const [topic, setTopic] = useState<Topic>()

  const fetchTopic = () => {
    LQPromotionModel.getTopic(id, topicId)
      .then(resp => {
        if (resp.error == 0) {
          setTopic(resp.data)
        }
      })
  }

  const fetchLQForm = (promotionId: any, topicId: any) => {
    FormModel.findLQForm(promotionId, topicId, 0, 100)
      .then(resp => {
        setPage(resp.data)
      })
  }

  const endTopic = (promotionId: any, topicId: any) => {
    FormModel.updateStatusTopic(promotionId, topicId, TopicStatus.DONE)
      .then(resp => {
        if (resp.error == 0) {
          fetchLQForm(promotionId, topicId)
        }
      });
  }

  useEffect(() => {
    fetchTopic()
    fetchLQForm(id, topicId)
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <AreYouSurePopup open={isShowPopup} onAgree={() => {
            setIsShowPopup(false)
            endTopic(id, topicId)
          }} onCloseModal={() => {
            setIsShowPopup(false)
          }} />
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title m-card-title">Dach sách tham gia</h5>
                  {topic && topic.status == TopicStatus.APPROVED &&
                    <div className="cart-btn-bar">
                      <button onClick={() => { setIsShowPopup(true) }} className="btn btn-primary mr-1">Kết thúc</button>
                    </div>
                  }
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Avatar</th>
                      <th>Name</th>
                      <th>Point</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {page && page.list && page.list.map((form, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{<img className="avatar" src={form.user.avatar} />}</td>
                          <td>{form.user.name}</td>
                          <td>{form.point}</td>
                          <td>{(form.jsonDetail.timeEnd - form.jsonDetail.timeStart) / 1000} seconds</td>
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

export default ListLightingQuizForm;
