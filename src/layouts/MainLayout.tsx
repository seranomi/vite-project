import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function MainLayout() {
  return (
    <div className="grid grid-cols-[16rem_1fr] grid-rows-[3.5rem_1fr] min-h-screen max-h-screen overflow-hidden">
      {/* 상단바 */}
      <header className="col-span-2 bg-base-100  flex items-center">
        <Navbar />
      </header>

      {/* 사이드바 */}
      <aside className="row-span-1 bg-base-200 h-full overflow-y-auto">
        <Sidebar />
      </aside>

      {/* 메인 영역 */}
      <main className="bg-base-300 p-6 overflow-y-auto h-full">
        <div className="min-h-[calc(100vh-10rem)]">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
}
