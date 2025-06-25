"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/app/(shared)/hooks/useAuth";

const RootPage = () => {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/home");
      } else {
        router.push("/login");
      }
    }
  }, [isAuthenticated, isLoading]);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          data-testid="auth-loading-spin"
          className="h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500"
        ></div>
      </div>
    );
  }

  return null;
};

export default RootPage;
