import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ArtworkCreatePage() {
  const navigate = useNavigate();
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const [form, setForm] = useState({
    title: "",
    description: "",
    file: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev,file: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    if (form.file) {
      formData.append("file", form.file);
    }
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.post(`${API_BASE}/artworks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("📤 전송 데이터:", form);
      console.log("✅ 서버 응답:", res.data);
      navigate("/my-artworks"); // 전시관 목록으로 이동
    } catch (error) {
      console.error("Error creating artwork:", error);
    }

    
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6 animate-fade-in">
      <h1 className="text-2xl font-bold">작품 등록</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="label">
            <span className="label-text">작품 제목</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">설명</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="textarea textarea-bordered w-full"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">작품 파일</span>
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="file-input file-input-bordered w-full"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">등록하기</button>
      </form>
    </div>
  );
}
