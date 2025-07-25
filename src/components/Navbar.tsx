import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  return (
    <div className="navbar px-4">
      {/* 🟡 햄버거 버튼 (모바일 전용) */}
      <div className="lg:hidden">
        <label htmlFor="drawer-toggle" className="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </label>
      </div>

      {/* 앱 이름 */}
      <div className="flex-1 text-xl font-bold">
        <Link to="/">🏠 MyApp</Link>
      </div>

      {/* 네비게이션 및 테마 토글 */}
      <div className="flex-none space-x-2 lg:flex items-center">
        <Link className="btn btn-ghost btn-sm" to="/signup">회원가입</Link>
        <Link className="btn btn-ghost btn-sm" to="/signin">로그인</Link>
        <ThemeToggle />
      </div>

      
    </div>
  );
}
