import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './components/Home/Home'
import ReactModal from 'react-modal'
import './index.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Collection from './components/Collection/Collection'

const AppLayout = () => (
  <>
    <Header/>
    <main>
      <Outlet />
    </main>
    <Footer/>
  </>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: (<AppLayout/>),
    children: [
      {
        index: true,
        element: (<Home/>),
      },
      {
        path: "collection",
        element: <Collection/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)

ReactModal.setAppElement('#root')