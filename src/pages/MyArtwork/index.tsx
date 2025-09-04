import Button from "@/components/Button";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Artwork = {
  id: string;
  url: string;
  title: string;
  description?: string;
};

export default function MyArtwork() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

  const fetchArtworks = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("accessToken") ?? "";
      const res = await axios.get<Artwork[]>(`${API_BASE}/artworks/my`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        signal: AbortSignal.timeout?.(10000), // 10초 타임아웃 (Node 18+/브라우저)
      });
      setArtworks(res.data ?? []);
    } catch (err: any) {
      // 간단 에러 처리
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "작품 목록을 불러오지 못했습니다.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // 최초 진입 시 자동 로딩
  useEffect(() => {
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="animate-fade-in">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">내 작품 목록</h1>
          {/* <button
            className="btn btn-outline btn-sm"
            onClick={fetchArtworks}
            disabled={loading}
          >
            {loading ? "불러오는 중..." : "새로고침"}
          </button> */}
          <Button>
            작품 등록
          </Button>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="alert alert-error mb-4">
            <span>{error}</span>
          </div>
        )}

        {/* 로딩 */}
        {loading && (
          <div className="flex justify-center py-16">
            <span className="loading loading-spinner loading-lg text-primary" aria-label="loading" />
          </div>
        )}

        {/* 콘텐츠 */}
        {!loading && !error && (
          <>
            {artworks.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-base-content/70">등록된 작품이 없습니다.</p>
                <Link to="/artworks/create" className="btn btn-primary btn-sm mt-4">
                  작품 등록하러 가기
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {artworks.map((a) => (
                  <Link
                    key={a.id}
                    to={`/artworks/${a.id}`}
                    className="card bg-base-100 shadow-md hover:shadow-lg transition"
                  >
                    <figure className="aspect-[4/3] overflow-hidden">
                      <img
                        src={a.url}
                        alt={a.title}
                        className="h-full object-cover"
                        loading="lazy"
                      />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title truncate">{a.title}</h2>
                      {a.description && (
                        <p className="text-sm text-base-content/70 line-clamp-2">
                          {a.description}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
