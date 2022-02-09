import Layout from "./component/Layout";
import "react-responsive-modal/styles.css";
import "../src/popup/styles.scss";
import { useParams } from "react-router-dom";
import FormModel from "./model/FormModel";
import { useEffect, useState } from "react";
import { Form, StockForm } from "./interface";
import DetailStockForm from "./promotion/DetailStockForm";


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
      {form && form.type == 20 &&
        <DetailStockForm data={form} />
      }
    </Layout>

  );
}

export default DetailForm;
