import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import PromotionModel from "./model/PromotionModel";
import { useEffect, useState } from "react";
import { GiftDTO, Page, Promotion } from "./interface";
import * as GiftStatus from './constant/GiftStatus'
import GiftModel from "./model/GiftModel";



function Gifts() {
  const [gifts, setGifts] = useState<Page<GiftDTO>>()

  const fetchGifts = () => {
    GiftModel.find(null, 0, 200)
      .then(resp => {
        if (resp.error == 0) {
          setGifts(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchGifts()
  }, [])


  return (
    <Layout>
      <main className="content">
        <div className="container-fluid">
          <div className="header">
            <h1 className="header-title">
              Gifts
            </h1>
          </div>
          <div className="row">
            <div className="col-12 col-xl-12">
              <div className="card">
                <div className="card-header">
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Avatar</th>
                      <th>Cửa hàng</th>
                      <th>SDT</th>
                      <th>Quà tặng</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gifts && gifts.list && gifts.list.map(gift => {
                      return (
                        <tr>
                          <td>{gift.id}</td>
                          <td><img className="avatar-gift" src={gift.user.avatar} /></td>
                          <td>{gift.user.name}</td>
                          <td>{gift.user.phone}</td>
                          <td>{gift.title}</td>
                          <td><span style={{ backgroundColor: GiftStatus.findColor(gift.status) }}
                            className="badge badge-info">{GiftStatus.findName(gift.status)}</span></td>
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

export default Gifts;
