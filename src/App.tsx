import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { LoginPage } from "./pages/auth/LoginPage";
import { NotFoundPage } from "./pages/NotFoundPage";

// Admin Pages
import DashboardPage from "./pages/dashboard";
import { ProductListPage } from "./pages/product/ProductListPage";

// Public Pages
import HomePage from "./pages/home";
import DetailProduct from "./pages/home/DetailProduct";
import OrderSummary from "./pages/home/OrderSummary";

const privateRoutes = [
  { path: "/order", element: <OrderSummary /> },
  { path: "/detail/:id", element: <DetailProduct /> },
  { path: "/", element: <HomePage /> },
  { path: "/admin/", element: <DashboardPage /> },
  { path: "/admin/products", element: <ProductListPage /> },
];

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected Routes */}
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<PrivateRoute>{element}</PrivateRoute>}
            />
          ))}

          {/* Not Found Route */}
          <Route path="404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};
