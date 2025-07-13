export default function About() {
  return (
    <>
      <div>
        <h1>가상 전시관</h1>
        <iframe
          src="http://localhost:80/"
          // 연결이 성공했을 경우 src의 로컬 호스트 주소는 80인데 이건 수정될 수 있음
          width="100%"
          height="800px"
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="Unreal Pixel Streaming"
        ></iframe>
      </div>
    </>
  );
}
