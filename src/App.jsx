import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import { BudgetProvider, useBudget } from "./context/BudgetContext.jsx";
import BudgetFormPage from "./pages/BudgetForm.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const DashboardProtectedRoute = ({ children }) => {
  const { user, hasCompletedOnboarding } = useBudget();

  if (!user) return <Navigate to="/login" replace />;
  if (!hasCompletedOnboarding) return <Navigate to="/onboarding" replace />;
  return children;
};

const OnboardingProtectedRoute = ({ children }) => {
  const { user, hasCompletedOnboarding } = useBudget();

  if (!user) return <Navigate to="/login" replace />;
  if (hasCompletedOnboarding) return <Navigate to="/dashboard" replace />;
  return children;
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/onboarding",
    element: (
      <OnboardingProtectedRoute>
        <BudgetFormPage />
      </OnboardingProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <DashboardProtectedRoute>
        <Dashboard />
      </DashboardProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
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
