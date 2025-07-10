export default function About() {
  return (
    <>
      <h1>소개 페이지</h1>
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">
          TailwindCSS 작동 테스트!
        </h1>
        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          버튼 눌러보기
        </button>
      </div>
    </>
  );
}
