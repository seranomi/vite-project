import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      alert("로그인 성공!");
      if (res.status === 201) {
        navigate("/");
      }
    } catch (err: any) {
      console.error("Error signing in:", err);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center animate-fade-in">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">로그인</h2>

          <form className="form-control space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="이메일"
              className="input input-bordered w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="input input-bordered w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
