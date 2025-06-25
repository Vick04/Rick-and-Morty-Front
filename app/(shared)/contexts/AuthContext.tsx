"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthState, LoginCredentials } from "../types/auth";
import {
  validateCredentials,
  createMockJWT,
  verifyMockJWT,
  getStoredToken,
  storeToken,
  removeToken,
} from "../lib/jwt-mock";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Verificar autenticación al cargar la app
  useEffect(() => {
    checkAuthOnLoad();
  }, []);

  const checkAuthOnLoad = () => {
    const token = getStoredToken();
    if (token) {
      const user = verifyMockJWT(token);
      if (user) {
        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
        return;
      } else {
        removeToken();
      }
    }

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    //Simulating delay
    await new Promise((resolve) => setTimeout(resolve, 4000));

    const user = validateCredentials(credentials.email, credentials.password);

    if (user) {
      const token = createMockJWT(user);
      storeToken(token);

      setAuthState({
        user,
        token,
        isAuthenticated: true,
        isLoading: false,
      });

      return true;
    } else {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
      }));
      return false;
    }
  };

  const logout = () => {
    removeToken();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const checkAuth = (): boolean => {
    const token = getStoredToken();
    if (token) {
      const user = verifyMockJWT(token);
      return user !== null;
    }
    return false;
  };

  const contextValue: AuthContextType = {
    ...authState,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
