// src/pages/auth/LoginPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";

export const LoginPage = () => {
  const { login, isLoading, error } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      login(data);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      throw err;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-96">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Login to BeLaundry</h2>

          {error && (
            <div className="text-red-500 text-sm text-center">{error}</div>
          )}

          <input
            type="email"
            placeholder="Email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </Card>
    </div>
  );
};
