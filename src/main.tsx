import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import ReactModal from 'react-modal'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

ReactModal.setAppElement('#root')