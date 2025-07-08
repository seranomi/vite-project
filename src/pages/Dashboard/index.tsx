import { Outlet, Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div>
      <h1>대시보드</h1>
      <nav>
        <Link to="profile">프로필</Link>
        <Link to="settings">설정</Link>
      </nav>
      <Outlet />  {/* 여기에 자식 라우트가 렌더링됨 */}
    </div>
  );
}