import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function AuthNavbar() {
  return (
    <div className="navbar px-4">
      {/* 로고 및 타이틀 */}
      <div className="flex-1 text-xl font-bold">
        <Link to="/">🏠 MyApp</Link>
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
