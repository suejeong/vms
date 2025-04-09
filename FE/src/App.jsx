import Header from "./common/Header/Header";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./common/Layout/Layout";
import { ModalProvider } from "./components/CompanyDetailPage/Modals/ModalContext/ModalContext";

const client = new QueryClient();

function App() {
  return (
    <>
      <ModalProvider>
        <Header />
        <QueryClientProvider client={client}>
          <Layout>
            <Outlet />
          </Layout>
        </QueryClientProvider>
      </ModalProvider>
    </>
  );
}

export default App;
