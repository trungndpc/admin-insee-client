import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import '../../src/popup/styles.scss'
import { useEffect, useReducer, useState } from "react";
import { LQPromotion, StockForm, Topic } from "../interface";
import {
  useParams,
  Link
} from "react-router-dom";
import DetailLQuizTopic, { LQuizTopicModal } from "./DetailLQuizTopic";
import LQPromotionModel from '../../src/model/LQPromotionModel';
import * as TopicStatus from '../constant/TopicStatus';

function DetailLQuizPromotion() {
  let { id, topicId } = useParams()
  if (topicId) {
    return <DetailLQuizTopic />
  }
  return <ListTopicLQuiz />
}

export default DetailLQuizPromotion;


function ListTopicLQuiz() {
  let { id } = useParams()
  const [isShowTopicModal, setIsShowTopicModal] = useState(false)
  const [promtoion, setPromotion] = useState<LQPromotion>()

  const fetchLQPromotion = () => {
    LQPromotionModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          setPromotion(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchLQPromotion()
  }, [])

  return (
    <div className="col-12 col-xl-12">
      <TopicPopup open={isShowTopicModal} onCloseModal={() => {
        fetchLQPromotion()
        setIsShowTopicModal(false)
      }} />
      <div className="card">
        <div className="card-header">
          <h5 className="card-title m-card-title">Dach sách chủ đề</h5>
          <div className="cart-btn-bar">
            <button onClick={() => { setIsShowTopicModal(true) }} className="btn btn-primary mr-1">Thêm chủ đề mới</button>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Time Start</th>
              <th>Time End</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promtoion && promtoion.topics && promtoion.topics.map((topic: Topic) => {
              console.log(topic)
              return (
                <tr>
                  <td>{topic.title}</td>
                  <td>{new Date(topic.timeStart).toLocaleString('vi')}</td>
                  <td>{new Date(topic.timeEnd).toLocaleString('vi')}</td>
                  <td><span style={{backgroundColor: TopicStatus.findColor(topic.status)}} className="badge">{TopicStatus.findName(topic.status)}</span></td>
                  <td className="table-action">
                    <Link to={`/promotion/detail/${id}/${topic.id}`}><i style={{ fontSize: '30px' }} className="align-middle ion ion-ios-play mr-2" /></Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const owlClass = "popup";
function TopicPopup({ open, onCloseModal }: any) {
  let { id } = useParams()
  const [form, setForm] = useState<Topic>({} as Topic)

  const submit = () => {
    LQPromotionModel.create(form, id)
      .then(resp => {
        if (resp.error == 0) {
          onCloseModal()
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
                <h5 className="card-title">Chủ đề</h5>
              </div>
              <div className="card-body">
                <div className="container-fluid">
                  <div style={{ margin: '0' }} className="row">
                    <div className="col-12 col-lg-12">
                      <div className="form-group">
                        <label>Chủ đề: </label>
                        <input value={form.title} onChange={(e: React.FormEvent<HTMLInputElement>) => { setForm({ ...form, title: e.currentTarget.value }) }} type="text" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Thời gian bắt đầu: </label>
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setForm({ ...form, timeStart: e.currentTarget.valueAsNumber})
                        }} type="datetime-local" className="form-control" />
                      </div>
                      <div className="form-group">
                        <label>Thời gian kết thúc: </label>
                        <input onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          setForm({ ...form, timeEnd: e.currentTarget.valueAsNumber })
                        }} type="datetime-local" className="form-control" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingRight: '20px' }} className="cart-btn-bar">
                <button onClick={() => { onCloseModal() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1 btn-cancel">Hủy</button>
                <button onClick={() => { submit() }} style={{ float: 'right', margin: '20px' }} className="btn btn-primary mr-1">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}