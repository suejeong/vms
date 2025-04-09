
import React from "react";
import "./styles/global.scss";
import "./styles/index.scss";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import HomePage from "./pages/HomePage/HomePage";
import ComparePage from "./pages/ComparePage/ComparePage";
import StatusPage from "./pages/StatusPage/StatusPage";
import InvestmentPage from "./pages/InvestmentPage/InvestmentPage";
import CompanyDetailPage from "./pages/CompanyDetailPage/CompanyDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "/compare", element: <ComparePage /> },
      { path: "/status", element: <StatusPage /> },
      { path: "/investment", element: <InvestmentPage /> },
      { path: "/detail/:companyId", element: <CompanyDetailPage /> },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);