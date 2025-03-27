import React from "react";
import "./styles/global.css";
import "./styles/index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage/HomePage";

import { NotFoundPage } from "./pages//NotFoundPage/NotFoundPage";
import ComparePage from "./pages/ComparePage/ComparePage";
import StatusPage from "./pages/StatusPage/StatusPage";
import InvestmentPage from "./pages/InvestmentPage/InvestmentPage";
import { ComparisonResultPage } from "./pages/ComparisonResultPage/ComparisonResultPage";
import CompanyDetail from "./pages/CompanyDetailPage/CompanyDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />, // 에러 페이지 설정
    children: [
      { index: true, element: <HomePage /> }, // 기본 페이지
      { path: "/compare", element: <ComparePage /> },
      { path: "/comparisonResult", element: <ComparisonResultPage /> },
      { path: "/status", element: <StatusPage /> },
      { path: "/investment", element: <InvestmentPage /> },
      { path: "/company", element: <CompanyDetail /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
