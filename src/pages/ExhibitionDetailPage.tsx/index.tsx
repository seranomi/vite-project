import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import placeholder from "@/assets/placeholder.jpg";
import { Link, useParams } from "react-router-dom";

/**
 * 환경 변수 / 공통
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const TOKEN_KEY = "accessToken"; // or "token" — 앱에서 실제 사용하는 키로 통일하세요

const authHeaders = () => {
  const token = localStorage.getItem(TOKEN_KEY) ?? "";
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

/**
 * 타입 정의 (백엔드 응답 스펙에 맞춰 조정)
 */
export type Exhibition = {
  id: number | string;
  title: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  user?: { id: number | string; email?: string; name?: string };
  artworks?: Artwork[]; // 상세 API가 포함해서 주는 경우
};

export type Artwork = {
  id: number | string;
  title: string;
  url: string; // imageUrl/url 등 백엔드 필드명에 맞춰 조정
  description?: string | null;
  position?: number; 
};

/**
 * 유틸
 */
const fmtDate = (iso?: string) => {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("ko", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(d);
  } catch {
    return iso;
  }
};

/**
 * 내 전시관 리스트 페이지
 * GET /exhibitions/my (예시)
 */
export function MyExhibitionsPage() {
  const [list, setList] = useState<Exhibition[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get<Exhibition[]>(
          `${API_BASE}/exhibitions/my`,
          {
            headers: authHeaders(),
          }
        );
        // id는 문자열로 정규화 (DnD 등 비교 안정화)
        setList((res.data ?? []).map((e) => ({ ...e, id: String(e.id) })));
      } catch (e: any) {
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "전시 목록을 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);

  return (
    <div className="max-w-7xl mx-auto  px-4 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">내 전시관</h1>
        <Link to="/exhibitions/create" className="btn btn-primary btn-sm">
          + 새 전시 만들기
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg" />
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : list.length === 0 ? (
        <div className="text-center py-20">
          <p className="opacity-70">아직 등록된 전시가 없습니다.</p>
          <Link
            to="/exhibitions/create"
            className="btn btn-primary btn-sm mt-4"
          >
            전시 만들기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((ex) => (
            <Link
              key={ex.id}
              to={`/exhibitions/${ex.id}`}
              className="card bg-base-100 shadow hover:shadow-md transition"
            >
              <div className="card-body">
                <h2 className="card-title truncate">{ex.title}</h2>
                {ex.description ? (
                  <p className="line-clamp-2 text-sm opacity-80">
                    {ex.description}
                  </p>
                ) : (
                  <p className="text-sm opacity-50">설명 없음</p>
                )}
                <div className="mt-3 text-xs opacity-60">
                  <div>생성: {fmtDate(ex.created_at)}</div>
                  <div>수정: {fmtDate(ex.updated_at)}</div>
                </div>
                <div className="card-actions justify-end mt-2">
                  <span className="btn btn-outline btn-sm">열기</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * 전시관 상세 페이지
 * 1) GET /exhibitions/:id (artworks 포함 시 그대로 사용)
 * 2) 없다면 GET /exhibition-artwork?exhibitionId=:id 로 연결된 작품 받아서 변환
 */
export function ExhibitionDetailPage(props: { id?: string | number }) {
  const params = useParams();
  const id = String(props.id ?? params.id ?? "");

  const [ex, setEx] = useState<Exhibition | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sorted = useMemo(() => {
    // position이 있으면 그 순서대로, 없으면 id/제목으로 정렬
    const arr = [...artworks];
    arr.sort((a, b) => {
      const pa = a.position ?? Number.MAX_SAFE_INTEGER;
      const pb = b.position ?? Number.MAX_SAFE_INTEGER;
      if (pa !== pb) return pa - pb;
      const ta = String(a.title ?? "");
      const tb = String(b.title ?? "");
      return ta.localeCompare(tb);
    });
    return arr;
  }, [artworks]);

  useEffect(() => {
    if (!id) return;
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        // 1) 전시 상세
        const { data } = await axios.get<Exhibition>(
          `${API_BASE}/exhibitions/${id}`,
          {
            headers: authHeaders(),
          }
        );
        const normalized = { ...data, id: String(data.id) } as Exhibition;
        setEx(normalized);

        // 2) 작품 목록 채우기 (상세에 artworks 포함된 경우 우선 사용)
        // 실제 응답: artworks가 조인 행 배열이며, 각 행에 artwork 객체가 중첩됨
        //   {
        //     id, title, ..., artworks: [
        //       { id: joinId, artwork: { id, title, url, description, ... }, created_at, ... }, ...
        //     ]
        //   }
        const rows: any[] = Array.isArray(normalized.artworks)
          ? normalized.artworks
          : [];
        let embedded: Artwork[] = [];
        if (rows.length > 0) {
          const isJoin = !!(rows[0] as any)?.artwork;
          embedded = rows.map((row: any, i: number) => {
            const src = isJoin ? row.artwork : row;
            return {
              id: String(src?.id ?? row?.artworkId ?? row?.id ?? i),
              title: String(src?.title ?? ""),
              url: String(src?.url ?? ""),
              description: src?.description ?? null,
              // position이 없다면 API 배열 순서를 보존하도록 i+1 사용
              position: row?.position ?? src?.position ?? i + 1,
            } as Artwork;
          });
        }

        if (embedded.length > 0) {
          setArtworks(embedded);
        } else {
          // 2-1) 조인 테이블에서 직접 가져오기 (예시 스펙)
          // 기대 응답 예: [{ exhibitionId, artwork: {...}, position }]
          const rel = await axios.get<any[]>(
            `${API_BASE}/exhibition-artwork?exhibitionId=${encodeURIComponent(
              id
            )}`,
            { headers: authHeaders() }
          );
          const mapped: Artwork[] = (rel.data ?? []).map(
            (row: any, i: number) => ({
              id: String(row?.artwork?.id ?? row?.artworkId ?? row?.id ?? i),
              title: row?.artwork?.title ?? row?.title ?? "",
              url: row?.artwork?.url ?? row?.url ?? "",
              description:
                row?.artwork?.description ?? row?.description ?? null,
              position: row?.position ?? i + 1,
            })
          );
          setArtworks(mapped);
        }
      } catch (e: any) {
        setError(
          e?.response?.data?.message ||
            e?.message ||
            "전시 정보를 불러오지 못했습니다."
        );
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [id]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // 토스트 대체: 간단 알림
      alert("링크가 복사되었습니다.");
    } catch {
      alert("복사에 실패했습니다. 주소창의 링크를 직접 복사해 주세요.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{ex?.title ?? "전시관"}</h1>
          <p className="opacity-80 max-w-3xl whitespace-pre-wrap">
            {ex?.description}
          </p>
          <div className="text-xs opacity-60 flex gap-4">
            {ex?.user?.email && <span>소유자: {ex.user.email}</span>}
            {ex?.created_at && <span>생성: {fmtDate(ex.created_at)}</span>}
            {ex?.updated_at && <span>수정: {fmtDate(ex.updated_at)}</span>}
          </div>
        </div>
        <div className="flex gap-2">
          <Link to="/exhibitions/my" className="btn btn-ghost btn-sm">
            목록
          </Link>
          <button onClick={copyLink} className="btn btn-outline btn-sm">
            링크 복사
          </button>
          {/* 소유자일 때만 보이도록 조건 처리 권장 */}
          <Link
            to={`/exhibitions/${id}/edit`}
            className="btn btn-primary btn-sm"
          >
            편집
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton w-full aspect-[4/3] rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-16">
          <p className="opacity-70">아직 전시에 포함된 작품이 없습니다.</p>
          <Link
            to={`/exhibitions/${id}/edit`}
            className="btn btn-primary btn-sm mt-4"
          >
            작품 추가하기
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {sorted.map((a, idx) => (
            <a
              key={`${a.id}-${idx}`}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="card bg-base-100 shadow-sm hover:shadow-md transition"
              title={`${idx + 1}. ${a.title}`}
            >
              <figure className="aspect-[4/3] overflow-hidden">
                <img
                  src={a.url}
                  alt={a.title}
                  className="h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = placeholder;
                  }}
                  loading="lazy"
                />
              </figure>
              <div className="card-body p-3">
                <div className="text-sm font-medium truncate">
                  {idx + 1}. {a.title}
                </div>
                {a.description ? (
                  <div className="text-xs opacity-70 line-clamp-2">
                    {a.description}
                  </div>
                ) : null}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Default export (미리보기 용): 내 전시관 리스트
 * 라우터에는 아래처럼 연결하세요.
 * <Route path="/exhibitions/my" element={<MyExhibitionsPage />} />
 * <Route path="/exhibitions/:id" element={<ExhibitionDetailPage />} />
 */
export default function ExhibitionsPreview() {
  return <MyExhibitionsPage />;
}
