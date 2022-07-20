import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useParams } from "react-router-dom";
import FormModel from "./model/FormModel";
import { useEffect, useState } from "react";
import { Form, StockForm } from "./interface";
import DetailStockForm from "./promotion/DetailStockForm";
import DetailGreetingFriendForm from "./promotion/DetailGreetingFriendForm";
import { GREETING_NEW_FRIEND_PROMOTION_TYPE, STOCK_PROMOTION_TYPE } from "./constant/PromotionType";


function DetailForm() {
  let { id } = useParams();
  const [form, setForm] = useState<Form>()

  const fetchForm = () => {
    FormModel.get(id)
      .then(resp => {
        if (resp.error == 0) {
          setForm(resp.data)
        }
      })
  }

  useEffect(() => {
    fetchForm()
  }, [])

  return (
    <Layout>
      {form && form.type == STOCK_PROMOTION_TYPE &&
        <DetailStockForm data={form} />
      }
      {form && form.type == GREETING_NEW_FRIEND_PROMOTION_TYPE &&
        <DetailGreetingFriendForm data={form} />
      }
    </Layout>

  );
}

export default DetailForm;
