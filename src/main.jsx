import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CountryDetails from './countryDetails'
import App from './App'

import './index.css'
import Loader from "./components/pageLoader";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    key: "home",
    loader: Loader,
  },

  {
    path: "/country/:code",
    element: <CountryDetails />,
    key: "countryDetials",
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)