import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[16rem_1fr] grid-rows-[3.5rem_1fr] min-h-screen">
      {/* Navbar - 상단 전체 너비 */}
      <header className="col-span-2 bg-white shadow z-50 flex items-center px-6 border-b">
        <Navbar />
      </header>

      {/* Sidebar - 왼쪽 고정 */}
      <aside className="bg-gray-800 text-white">
        <Sidebar />
      </aside>

      {/* Main content */}
      <main className="bg-gray-50 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}
