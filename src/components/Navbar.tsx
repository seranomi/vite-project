import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
    <nav className="flex gap-4 p-4 bg-gray-100">
      <Link to="/">홈</Link>
      <Link to="/about">소개</Link>
      <Link to="/dashboard">대시보드</Link>
    </nav>
    </>
  );
}