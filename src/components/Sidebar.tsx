import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <ul className="menu p-4">
      <li><Link to="/">🏠 Home</Link></li>
      <li><Link to="/about">ℹ️ About</Link></li>
    </ul>
  );
}
