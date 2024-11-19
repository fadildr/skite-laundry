import { createContext, useContext, useState, useEffect } from "react";
import { User, LoginCredentials } from "../types/auth";
import { authApi } from "../lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    // Ambil data user dari localStorage saat pertama kali
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUserInfo = async (authToken: string) => {
    try {
      const userInfo = await authApi.getUserInfo(authToken);
      setUser(userInfo);
      localStorage.setItem("user", JSON.stringify(userInfo));
    } catch (err) {
      console.error("Failed to fetch user info:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch user info"
      );
      logout();
    }
  };

  const login = async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);

      const response: any = await authApi.login(credentials);

      if (!response.status) {
        throw new Error(response.message || "Login failed");
      }

      const authToken = response.response;
      if (!authToken) {
        throw new Error("No token received");
      }

      setToken(authToken);
      localStorage.setItem("token", authToken);
      await fetchUserInfo(authToken);
    } catch (err) {
      console.error("Login failed:", err);
      setError(err instanceof Error ? err.message : "Login failed");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    if (token && !user) {
      fetchUserInfo(token);
    }
  }, [token, user]);

  const value = {
    user,
    token,
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
