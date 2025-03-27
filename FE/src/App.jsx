import Header from "./common/Header";
import { Outlet } from "react-router-dom";
import CompanyDetailPage from "./pages/CompanyDetailPage/CompanyDetailPage";
function App() {
  return (
    <>
      <Header />
      <CompanyDetailPage />
    </>
  );
}

export default App;
