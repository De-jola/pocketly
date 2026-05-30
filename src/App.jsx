import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { BudgetProvider } from "./context/BudgetContext.jsx";
import BudgetFormPage from "./pages/BudgetForm.jsx";
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
  {
    path: "/budget-form",
    element: <BudgetFormPage />,
  },
]);

function App() {
  return (
    <BudgetProvider>
      <RouterProvider router={router} />
    </BudgetProvider>
  );
}

export default App;
