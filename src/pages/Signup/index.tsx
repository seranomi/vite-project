import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    try {
      const res = await axios.post(`${API_BASE}/users`, {
        email,
        name,
        password
      });
      alert("회원가입 성공!");
      if (res.status === 201) {
        navigate("/signin");
      }
    } catch (error: any) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center animate-fade-in">
      <div className="card w-full max-w-sm bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">회원가입</h2>

          <form className="form-control space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="이름"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
            <input
              type="password"
              placeholder="비밀번호 확인"
              className="input input-bordered w-full"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button type="submit" className="btn btn-secondary w-full">
              가입하기
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            이미 계정이 있으신가요?{" "}
            <Link to="/signin" className="text-primary hover:underline">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
