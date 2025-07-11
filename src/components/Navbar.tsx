import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="h-full flex items-center justify-between w-full">
      <h1 className="text-lg font-bold">MyApp</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:underline">홈</Link>
        <Link to="/about" className="hover:underline">소개</Link>
        <Link to="/" className="hover:underline">대시보드</Link>
      </nav>
    </div>
  );
}

