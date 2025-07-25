import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div>
    <ul className="menu p-5 w-full">
      <li className="text-2xl font-bold justify-center"><p>메뉴</p></li>
      <li></li>
      <li><Link to="/"><p className="text-lg font-bold">🏠 Home</p></Link></li>
      <li><Link to="/about"><p className="text-lg font-bold">ℹ️ 언리얼 엔진</p></Link></li>
      <li><Link to="/exhibitions"><p className="text-lg font-bold">전시관</p></Link></li>
    </ul>
    </div>
  );
}
