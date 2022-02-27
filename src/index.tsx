import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Alert from 'react-s-alert';

import '../src/resource/css/modern.css';
import '../src/resource/css/index.css'
import Retailer from './Retailer';
import Dashboard from './Dashboard';
import StockForm from './StockForm';
import DetailRetailer from './DetailRetailer';
import CreatePost from './CreatePost';


import reportWebVitals from './reportWebVitals';
import Posts from './Posts';
import UpdatePost from './UpdatePost';
import CreateOrUpdatePromotion from './CreateOrUpdatePromotion';
import Promotions from './Promotions';
import DetailPromotion from './DetailPromotion';
import DetailForm from '../src/DetailForm';
import ListLightingQuizForm from './ListLightingQuizForm';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import Egagements from './Egagements';
import CreateOrUpdateBroadcast from './CreateOrUpdateBroadcast';
import BroadcastPage from './BroadcastPage';
import DetailBroadcast from './DetailBroadcast';
import PromotionForms from './PromotionForms';
import DashboardRetailer from './DashboardRetailer';
import DashboardEgagements from './DashboardEgagements';
import DashboardPromotion from './DashboardPromotion';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/retailer" element={<DashboardRetailer />} />
        <Route path="/retailer/list" element={<Retailer />} />
        <Route path="/stock-form" element={<StockForm />} />
        <Route path="/retailer/:id" element={<DetailRetailer />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/detail/:id" element={<UpdatePost />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/promotion/create-or-update" element={<CreateOrUpdatePromotion />} />
        <Route path="/promotion/create-or-update/:id" element={<CreateOrUpdatePromotion />} />
        <Route path="/promotion" element={<DashboardPromotion />} />
        <Route path="/promotion/list" element={<Promotions />} />
        <Route path="/promotion/forms" element={<PromotionForms />} />
        <Route path="/egagement" element={<DashboardEgagements />} />
        <Route path="/egagement/list" element={<Egagements />} />
        <Route path="/broadcast" element={<BroadcastPage />} />
        <Route path="/broadcast/create-or-update" element={<CreateOrUpdateBroadcast />} />
        <Route path="/broadcast/create-or-update/:id" element={<CreateOrUpdateBroadcast />} />
        <Route path="/broadcast/detail/:id" element={<DetailBroadcast />} />
        <Route path="/form/list/:id/:topicId" element={<ListLightingQuizForm />} />
        <Route path="/promotion/detail/:id" element={<DetailPromotion />} />
        <Route path="/promotion/detail/:id/:topicId" element={<DetailPromotion />} />
        <Route path="/form/detail/:id" element={<DetailForm />} />
        <Route path="/form/detail/:id/*" element={<DetailForm />} />

      </Routes>
    </BrowserRouter>
    <Alert stack={{ limit: 3 }} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
