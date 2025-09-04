import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

export default function MainLayout() {
  const [isVisible, setIsVisible] = useState(false);  // drawer가 mount됨
  const [animateIn, setAnimateIn] = useState(false);  // translate-x-0 활성화

  const openDrawer = () => {
    setIsVisible(true);
    // DOM mount 후 애니메이션 적용
    setTimeout(() => setAnimateIn(true), 10);
  };

  const closeDrawer = () => {
    setAnimateIn(false);
    setTimeout(() => setIsVisible(false), 300); // 애니메이션 끝나고 DOM 제거
  };

  return (
    <div className="grid lg:grid-cols-[16rem_1fr] grid-rows-[4rem_1fr] min-h-screen max-h-screen overflow-hidden">
      {/* 헤더 */}
      <header className="lg:col-span-2 bg-base-100 flex items-center">
        <Navbar onDrawerToggle={openDrawer} />
      </header>

      {/* 데스크탑 사이드바 */}
      <aside className="hidden lg:block bg-base-200 h-full overflow-y-auto">
        <Sidebar />
      </aside>

      {/* 메인 영역 */}
      <main className="bg-base-300 p-6 overflow-y-auto h-full">
        <div className="min-h-[calc(100vh-10.5rem)]">
          <Outlet />
        </div>
        <Footer />
      </main>

      {/* 모바일 Drawer */}
      {isVisible && (
        <div className="lg:hidden fixed inset-0 z-40">
          {/* 배경 */}
          <div className="absolute inset-0 bg-black/40" onClick={closeDrawer} />

          {/* 슬라이드 사이드바 */}
          <div
            className={`absolute top-0 left-0 h-full w-64 bg-base-200 shadow-lg transform transition-transform duration-300 ${
              animateIn ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <Sidebar />
          </div>
        </div>
      )}
    </div>
  );
}
