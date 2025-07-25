import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <div className="px-15 hero bg-base-200 min-h-[40vh]">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img
          src="https://images.metmuseum.org/CRDImages/ep/original/DP229743.jpg" //436524
          className="max-w-sm rounded-lg shadow-2xl"
          alt="전시관 대표 이미지"
        />
        <div>
          <h1 className="text-4xl font-bold">몰입형 전시관에 오신 걸 환영합니다</h1>
          <p className="py-6">가상 공간에서 나만의 전시회를 만나보세요.</p>
          <Link to="/unreal" className="btn btn-primary">전시관 입장하기</Link>
        </div>
      </div>
    </div>
  );
}
