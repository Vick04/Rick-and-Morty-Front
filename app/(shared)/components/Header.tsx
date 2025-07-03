"use client";

import { useRouter } from "next/navigation";

import Text from "@/app/(shared)/components/Text";
import ThemeChanger from "@/app/(shared)/components/ThemeChanger";
import Button from "@/app/(shared)/components/Button";
import { useAuth } from "@/app/(shared)/hooks/useAuth";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="bg-background-light shadow-sm dark:bg-black">
      <div className="flex h-16 items-center justify-between px-6">
        <Text themeColor="limeNeutral" themeSize="large" themeWeight="bold">
          Rick y Morty Challenge
        </Text>

        <div className="flex items-center space-x-4">
          <ThemeChanger />

          {isAuthenticated && user && (
            <>
              <Text
                themeSize="small"
                className="hidden sm:block"
                themeColor={"default"}
                themeWeight={"bold"}
              >
                Hola, {user.name}
              </Text>
              <Button
                themeColor="red"
                onClick={handleLogout}
                className="px-3 py-1 text-xs"
                type="button"
              >
                Cerrar Sesión
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
