import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

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
import CreatePromotion from './CreatePromotion';
import Promotions from './Promotions';
import DetailPromotion from './DetailPromotion';
import DetailForm from '../src/DetailForm';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/retailer" element={<Retailer />} />
        <Route path="/stock-form" element={<StockForm />} />
        <Route path="/retailer/:id" element={<DetailRetailer />} />
        <Route path="/post/create" element={<CreatePost />} />
        <Route path="/post/detail/:id" element={<UpdatePost />} />
        <Route path="/post" element={<Posts />} />
        <Route path="/promotion/create" element={<CreatePromotion />}/>
        <Route path="/promotion" element={<Promotions />} />
        <Route path="/promotion/detail/:id" element={<DetailPromotion />} />
        <Route path="/promotion/detail/:id/:topicId" element={<DetailPromotion />} />
        <Route path="/form/detail/:id" element={<DetailForm />} />
        <Route path="/form/detail/:id/*" element={<DetailForm />} />

      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
