import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import BudgetForm from "./pages/BudgetForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Reports from "./pages/Reports.jsx";
import Settings from "./pages/Settings.jsx";
import { BudgetProvider } from "./context/BudgetContext.jsx";
import "./index.css";

import App from "./App.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // This acts as your root layout wrapper
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "setup-budget",
        element: <BudgetForm />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "reports",
        element: <Reports />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BudgetProvider>
      <RouterProvider router={router} />
    </BudgetProvider>
  </StrictMode>,
);
