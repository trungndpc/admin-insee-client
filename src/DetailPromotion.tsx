import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { Link, useParams } from "react-router-dom";
import PromotionModel from "./model/PromotionModel";
import FormModel from "./model/FormModel";
import { useEffect, useState } from "react";
import { Form, Page, Promotion, StatsForm } from "./interface";
import DetailStockPromotion from "./promotion/DetailStockPromotion";
import DetailLQuizPromotion from "./promotion/DetailLQuizPromotion";
import DetailPredictFootballPromotion from "./promotion/DetailPredictFootballPromotion";

function DetailPromotion() {
  let { id } = useParams();
  const [promotion, setPromotion] = useState<Promotion>()
  const [statsForm, setStatsForm] = useState<StatsForm>()

  const fetchPromotionById = () => {
    PromotionModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          setPromotion(resp.data)
        }
      })
  }

  const fetchStatsPromotion = () => {
    FormModel.statsByPromotion(id)
      .then(resp => {
        if (resp.error == 0) {
          setStatsForm(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchPromotionById()
    fetchStatsPromotion()
  }, [])

  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="row">
            {statsForm &&
              <div className="col-md-12 col-xl-12">
                <div className="w-100">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <h5 className="card-title">Số đơn tham gia</h5>
                            </div>
                            <div className="col-auto">
                              <div className="avatar">
                                <div className="avatar-title rounded-circle bg-primary-dark">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-truck align-middle"><rect x={1} y={3} width={15} height={13} /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h1 className="display-5 mt-1 mb-3">{statsForm.total}</h1>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="card">
                        <div className="card-body">
                          <div className="row">
                            <div className="col mt-0">
                              <h5 className="card-title">Số đơn được duyệt</h5>
                            </div>
                            <div className="col-auto">
                              <div className="avatar">
                                <div className="avatar-title rounded-circle bg-primary-dark">
                                  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle"><line x1={12} y1={1} x2={12} y2={23} /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
                                </div>
                              </div>
                            </div>
                          </div>
                          <h1 className="display-5 mt-1 mb-3">{statsForm.approved}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
          <div className="row">
            {promotion?.type == 20 && <DetailStockPromotion />}
            {promotion?.type == 21 && <DetailLQuizPromotion />}
            {promotion?.type == 4 && <DetailPredictFootballPromotion/>}
          </div>
        </div>
      </main>
    </Layout>

  );
}

export default DetailPromotion;
