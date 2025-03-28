import React from "react";
import './styles/global.css'
import './styles/index.css'
import {  NotFoundPage } from "./pages/NotFoundPage/NotFound";
import {  HomePage } from "./pages/HomePage/HomePage";
import { ComparisonResultPage } from "./pages/ComparisonResultPage/ComparisonResultPage";
import CompanyDetail from "./pages/CompanyDetailPage/CompanyDetail";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";

import Compare from "./pages/ComparePage/Compare";
import Status from "./pages/StatusPage/Status";
import Investment from "./pages/InvestmentPage/Investment";
import { HomePage } from "./pages/HomePage/HomePage";
import { ComparisonResultPage } from "./pages/ComparisonResultPage/ComparisonResultPage";
import CompanyDetail from "./pages/CompanyDetailPage/CompanyDetailPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage /> ,
    children: [
      { index: true, element: <HomePage /> }, // 기본 페이지
      { path : '/compare', element : <Compare />},
      { path : '/status', element : <Status />},
      { path : '/investment', element : <Investment />},
      { path: "/comparisonResult", element: <ComparisonResultPage /> },
      { path: "/companyDetail", element: <CompanyDetail /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
