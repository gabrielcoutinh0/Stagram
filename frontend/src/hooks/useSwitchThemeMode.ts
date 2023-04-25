import { useEffect, useState } from "react";

export function switchThemeMode() {
  const storageValue = localStorage.getItem("theme");

  const [theme, setTheme] = useState(
    storageValue ? JSON.parse(storageValue) : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", theme);
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return [theme, setTheme];
}
