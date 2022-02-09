import "react-responsive-modal/styles.css";
import Modal from "react-responsive-modal";
import '../../src/popup/styles.scss'
import React, { useEffect, useReducer, useState } from "react";
import { StockForm, Topic } from "../interface";
import { City, District } from "../utils/ProvinceUtil";
import { Question, Answer } from '../interface/index'
import LQPromotionModel from '../model/LQPromotionModel'
import { useParams } from "react-router-dom";


function DetailLQuizTopic({ data }: any) {
  let { id, topicId } = useParams()
  const [topic, setTopic] = useState<Topic>()
  const [question, setQuestion] = useState<Question>()
  const [isShowImgModel, setIsShowImgModel] = useState(false)

  const fetchTopic = () => {
    LQPromotionModel.getTopic(id, topicId)
      .then(resp => {
        if (resp.error == 0) {
          setTopic(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchTopic()
  }, [])

  return (
    <div className="col-12 col-xl-12">
      {isShowImgModel && <LQuizTopicModal open={isShowImgModel} data={question}
        onCloseModal={() => { 
          setIsShowImgModel(false)
          fetchTopic()
           }} />}
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Dach sách hỏi của chủ đề</h5>
          <div className="cart-btn-bar">
            <button onClick={() => { setIsShowImgModel(true); setQuestion({} as Question) }} className="btn btn-primary mr-1">Thêm câu hỏi</button>
          </div>
        </div>
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Answer</th>
              <th>Actions:</th>
            </tr>
          </thead>
          <tbody>
            {topic && topic.questions && topic.questions.map((question: Question) => {
              let rights = question.options.filter((o: Answer) => o.right);
              return (
                <tr>
                  <td>{question.content}</td>
                  <td>{question.options.map((o: Answer) => o.content).join(", ")}</td>
                  <td>{rights && rights.length > 0 && rights[0].content}</td>
                  <td className="table-action">
                    <i onClick={() => {
                      setQuestion(question)
                      setIsShowImgModel(true)
                    }} style={{ fontSize: '30px', cursor: 'pointer' }} className="align-middle ion ion-ios-play mr-2" />
                  </td>
                </tr>
              )
            })}

          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DetailLQuizTopic;

const owlClass = "popup";
export function LQuizTopicModal({ open, onCloseModal, data }: any) {
  let { id, topicId } = useParams()
  const [question, setQuestion] = useState<Question>(data)
  const [errorMsg, setErrorMsg] = useState<string>()


  const submit = () => {
    if (isValid()) {
      LQPromotionModel.createOrUpdateQuestion(question, topicId, id)
        .then(resp => {
          onCloseModal()
        })
    }
  }

  const isValid = () => {
    if (!question.content || question.content.length <= 0) {
      setErrorMsg('Vui lòng nhập nội dung câu hỏi')
      return false;
    }
    if (!question.options || question.options.length <= 0) {
      setErrorMsg('Vui lòng thêm câu trả lời')
      return false;
    }

    let wrongOptions = question.options.filter((o: Answer) => {
      if (!o.content || o.content.length <= 0) {
        return true;
      }
      return false;
    })

    if (wrongOptions.length > 0) {
      setErrorMsg('Vui lòng nhập nội dung câu trả lời')
      return false;
    }

    wrongOptions = question.options.filter((o: Answer) => {
      if (o.right) {
        return true;
      }
    })

    if (wrongOptions.length <= 0) {
      setErrorMsg('Vui lòng chọn đáp án đúng')
      return false;
    }
    return true;
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
          maxWidth: "80%"
        },
      }}
    >
      <div className={owlClass}>
        {console.log(question)}
        <div className={`${owlClass}__wrapper`}>
          <div className={`${owlClass}__wrapper__title`}>Cẩu hỏi: </div>
          <p className={`${owlClass}__wrapper__desc`}>
            <div style={{ minWidth: '700px', textAlign: 'left', marginBottom: '2px' }} className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Nội dung: </h5>
              </div>
              <div className="card-body">
                <textarea onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
                  setQuestion({ ...question, content: e.currentTarget.value })
                }} className="form-control" value={question.content} rows={2} />
              </div>
            </div>
            <div style={{ minWidth: '700px', textAlign: 'left' }} className="card">
              <div className="card-header">
                <h5 className="card-title mb-0">Đáp án</h5>
              </div>
              {question.options && question.options.map((option: Answer) => {
                return (
                  <div className="card-body" style={{ paddingBottom: '10px' }}>
                    <div style={{ marginBottom: '10px' }} className="row">
                      <div style={{ textAlign: 'right', paddingTop: '5px' }} className="col-md-1">
                        <input type="radio" checked={option.right} onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          let tmpQuestion = { ...question }
                          tmpQuestion.options.forEach((a: Answer) => {
                            if (a.id == option.id) {
                              a.right = true;
                            } else {
                              a.right = false;
                            }
                          })
                          setQuestion(tmpQuestion)
                        }} />
                      </div>
                      <div className="col-md-7">
                        <input type="text" onChange={(e: React.FormEvent<HTMLInputElement>) => {
                          let tmpQuestion = { ...question }
                          tmpQuestion.options.forEach((a: Answer) => {
                            if (a.id == option.id) {
                              a.content = e.currentTarget.value;
                            }
                          })
                          setQuestion(tmpQuestion)
                        }} value={option.content} className="form-control" />
                      </div>
                      <div style={{ paddingTop: '5px', cursor: 'pointer' }} onClick={() => {
                        let tmpQuestion = { ...question }
                        tmpQuestion.options = tmpQuestion.options.filter((e: Answer) => e.id != option.id)
                        setQuestion(tmpQuestion)
                      }}>
                        <i className="align-middle mr-2 fas fa-fw fa-window-close"></i>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div onClick={() => {
                let options = question.options;
                if (!options) {
                  options = []
                }
                if (options.length >= 4) {
                  return;
                }
                let id: string = new Date().getTime() + ''
                options.push({
                  id: id,
                  content: '',
                  right: false
                })
                setQuestion({ ...question, options: options })
              }} className="add-more-lquiz" style={{ textAlign: 'center' }}>Thêm</div>
            </div>
          </p>
        </div>
        {errorMsg && <p style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</p>}
        <div className={`${owlClass}__group-btn`}>
          <div
            className={`${owlClass}__group-btn__item right`}
            onClick={submit}
          >
            Lưu
          </div>
        </div>
      </div>
    </Modal>
  );
}


