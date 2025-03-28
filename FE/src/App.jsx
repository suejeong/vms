import Header from "./common/Header/Header";
import { Outlet } from "react-router-dom";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const client = new QueryClient();

function App() {
  return (
    <>
      <Header />
      <QueryClientProvider client={client}>
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
