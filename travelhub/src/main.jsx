import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from './App'
import Layout from './routes/Layout';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/web102-travelhub/' element={<Layout />} >
        <Route index={true} path='' element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
