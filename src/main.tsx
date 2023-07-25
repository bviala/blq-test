import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App'
import ReactModal from 'react-modal'
import './index.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header/>
    <App />
    <Footer/>
  </React.StrictMode>
)

ReactModal.setAppElement('#root')