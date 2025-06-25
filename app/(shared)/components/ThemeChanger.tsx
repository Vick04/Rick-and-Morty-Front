"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "next-themes";

const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div data-testid="theme-changer">
      <button className="mr-2" onClick={() => setTheme("light")}>
        <SunIcon className="size-6 text-amber-200" />
      </button>
      <button onClick={() => setTheme("dark")}>
        <MoonIcon className="size-6 text-neutral-700" />
      </button>
    </div>
  );
};

export default ThemeChanger;
