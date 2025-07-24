import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"cupcake" | "dark">("cupcake");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "cupcake" ? "dark" : "cupcake"));
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === "cupcake" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
}
