import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

type NavbarProps = {
  onDrawerToggle: () => void;
};

export default function Navbar({ onDrawerToggle }: NavbarProps) {
  return (
    <div className="navbar px-4">
      {/* 햄버거 버튼 - 모바일만 보임 */}
      <div className="lg:hidden">
        <button
          onClick={onDrawerToggle}
          className="btn btn-square btn-ghost"
          aria-label="Open drawer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* 로고 및 타이틀 */}
      <div className="flex-1 text-xl font-bold">
        <Link to="/">🏠 가상 전시관</Link>
      </div>

      {/* 링크 및 토글 - 데스크탑 전용 */}
      <div className="lg:flex items-center gap-2">
        <Link className="btn btn-ghost btn-sm" to="/signup">
          <p className="text-base">회원가입</p>
        </Link>
        <Link className="btn btn-ghost btn-sm" to="/signin">
          <p className="text-base">로그인</p>
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
