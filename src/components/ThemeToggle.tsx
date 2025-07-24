import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm btn-outline">
      {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
}
