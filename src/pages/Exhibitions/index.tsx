import { useState } from "react";

export default function Exhibitions() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">가상 전시관</h1>

      {/* 로딩 메시지 */}
      {isLoading && (
        <div className="flex justify-center items-center h-[800px]">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <span className="ml-4 text-lg">로딩 중입니다...</span>
        </div>
      )}

      {/* iframe */}
      <iframe
        src="http://localhost:80/"
        width="100%"
        height="800px"
        frameBorder="0"
        allow="autoplay; fullscreen"
        title="Unreal Pixel Streaming"
        onLoad={handleLoad}
        className={`${isLoading ? "hidden" : ""}`}
      ></iframe>
    </div>
  );
}
