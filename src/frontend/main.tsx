import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './Todo'
import Auth from './Auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
)
