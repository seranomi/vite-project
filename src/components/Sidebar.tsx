import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div>
    <ul className="menu p-5 w-full">
      <li className="text-2xl font-bold justify-center"><p>메뉴</p></li>
      <li></li>
      <li><Link to="/"><p className="text-lg font-bold">Home</p></Link></li>
      <li><Link to="/exhibitions"><p className="text-lg font-bold">언리얼 엔진</p></Link></li>
      <li><Link to="/my-artworks"><p className="text-lg font-bold">내 작품</p></Link></li>
      <li><Link to="/artworks/new"><p className="text-lg font-bold">작품 등록</p></Link></li>
      <li><Link to="/exhibitions/new"><p className="text-lg font-bold">전시관 등록</p></Link></li>
    </ul>
    </div>
  );
}
