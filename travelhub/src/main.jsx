import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from './routes/Layout';
import CreateForm from './routes/CreateForm';
import Feed from './routes/Feed';
import Post from './routes/Post';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout />} >
        <Route index={true} path='' element={<Feed />} />
        <Route index={false} path="/:post_id" element={<Post />} />
        <Route index={true} path='/create' element={<CreateForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
