import React from "react";
import './styles/global.css'
import './styles/index.css'
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import Compare from "./pages/ComparePage";
import Status from "./pages/StatusPage";
import Investment from "./pages/InvestmentPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />, // 에러 페이지 설정
    children: [
      { index: true, element: <HomePage /> }, // 기본 페이지
      { path : '/compare', element : <Compare />},
      { path : '/status', element : <Status />},
      { path : '/investment', element : <Investment />},
    ],
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
