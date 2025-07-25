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
      <div className="flex items-center gap-2">
        <Link className="btn btn-ghost btn-sm" to="/signup">
          회원가입
        </Link>
        <Link className="btn btn-ghost btn-sm" to="/signin">
          로그인
        </Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
