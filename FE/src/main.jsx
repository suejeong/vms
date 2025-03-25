import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage"

import App from "./App.jsx";
import { HomePage } from "./pages/HomePage/index.jsx";
import { NotFoundPage } from "./pages/NotFoundPage/index.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <App />
    </StrictMode>
  </BrowserRouter>
);
