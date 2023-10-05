import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Auth from './Auth'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <h1>todos</h1>
    <Auth />
  </React.StrictMode>
)
