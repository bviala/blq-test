import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home/Home'
import ReactModal from 'react-modal'
import './index.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: (<Home/>),
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Header/>
    <main>
      <RouterProvider router={router} />
    </main>
    <Footer/>
  </React.StrictMode>
)

ReactModal.setAppElement('#root')