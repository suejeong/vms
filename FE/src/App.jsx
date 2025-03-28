import Header from "./common/Header/Header";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./common/Layout/Layout";

const client = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <QueryClientProvider client={client}>
        <Layout>
          <Outlet />
        </Layout>
      </QueryClientProvider>
    </>
  );
}

export default App;
