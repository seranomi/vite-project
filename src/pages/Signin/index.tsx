import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">로그인</h2>

          <form className="form-control space-y-4">
            <input
              type="email"
              placeholder="이메일"
              className="input input-bordered w-full"
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="input input-bordered w-full"
            />

            <button type="submit" className="btn btn-primary w-full">
              로그인
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            계정이 없으신가요?{" "}
            <Link to="/signup" className="text-primary hover:underline">
              회원가입
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
