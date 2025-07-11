import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="h-full p-4 space-y-4">
      <Link to="/" className="block hover:text-blue-300">🏠 Home</Link>
      <Link to="/about" className="block hover:text-blue-300">ℹ️ About</Link>
    </nav>
  );
}
