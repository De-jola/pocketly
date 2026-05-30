import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

function App() {
  
    return <RouterProvider router={router} />;

}

export default App;
