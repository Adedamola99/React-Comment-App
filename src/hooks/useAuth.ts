import { useState } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; email: string; role: string } | null;
}

export function useAuth() {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
  });

  const login = (email: string, _password: string) => {
    setAuth({
      isAuthenticated: true,
      user: { name: "Fleet Admin", email, role: "Owner" },
    });
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, user: null });
  };

  return { ...auth, login, logout };
}
