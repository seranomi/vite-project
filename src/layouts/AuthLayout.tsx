import { Outlet } from "react-router-dom";
import AuthNavbar from "@/components/AuthNavbar";

export default function AuthLayout() {
  return (
    <div className="grid grid-rows-[4rem_1fr] min-h-screen  bg-base-100">
      {/* 상단바 */}
      <header className="row-span-1 bg-base-100  flex items-center">
        <AuthNavbar />
      </header>

      {/* 메인 컨텐츠: 가운데 정렬 */}
      <main className="bg-base-300">
        <Outlet />
      </main>
    </div>
  );
}
