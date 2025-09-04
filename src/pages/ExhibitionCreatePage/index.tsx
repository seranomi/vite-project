// src/pages/ExhibitionCreatePage.tsx
import { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios";
import placeholder from "@/assets/placeholder.jpg";

type Artwork = {
  id: string;
  title: string;
  url: string; // ← 백엔드 필드명에 맞춰 조정하세요 (ex: imageUrl/url)
  description?: string;
};

type SelectedItem = Artwork; // 간단히 동일 타입로 사용 (정렬/삭제만 추가)

type CreateExhibitionRes = {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  user: { id: number; email: string };
};

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export default function ExhibitionCreatePage() {
  // 1) 전시 폼
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  // 2) 내 작품 라이브러리
  const [library, setLibrary] = useState<Artwork[]>([]);
  const [loadingLib, setLoadingLib] = useState(false);
  const [errorLib, setErrorLib] = useState("");

  // 3) 전시에 담긴 작품(순서가 중요)
  const [selected, setSelected] = useState<SelectedItem[]>([]);
  const selectedIds = useMemo(
    () => new Set(selected.map((a) => String(a.id))),
    [selected]
  );

  // 컴포넌트 상단에 추가
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const moveItem = (arr: any[], from: number, to: number) => {
    const next = [...arr];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    return next;
  };

  const dropzoneRef = useRef<HTMLDivElement | null>(null);

  const removeAt = (idx: number) => {
    setSelected((prev) => prev.filter((_, i) => i !== idx));
  };

  // 초기: 내 작품 불러오기
  useEffect(() => {
    const fetchMine = async () => {
      setLoadingLib(true);
      setErrorLib("");
      try {
        const token = localStorage.getItem("accessToken") ?? "";
        // 백엔드 엔드포인트에 맞게 수정: 예) /me/artworks 또는 /artworks?mine=true
        const res = await axios.get<Artwork[]>(`${API_BASE}/artworks/my`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });
        setLibrary(res.data ?? []);
      } catch (e: any) {
        setErrorLib(
          e?.response?.data?.message ||
            e?.message ||
            "작품 목록을 불러오지 못했습니다."
        );
      } finally {
        setLoadingLib(false);
      }
    };
    fetchMine();
  }, []);

  // 드래그 시작: dataTransfer에 id 저장
  const onDragStartArtwork = (e: React.DragEvent, artworkId: string) => {
    e.dataTransfer.setData("application/x-artwork-id", artworkId);
    e.dataTransfer.setData("text/plain", artworkId); // 호환용
    e.dataTransfer.effectAllowed = "copy";
  };

  // 드롭존: 드래그 오버 허용
  const onDragOverDropzone = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    setOver(true);
  };

  const [over, setOver] = useState(false);

  // 드롭 처리: id로 라이브러리에서 찾고, 중복 아니면 selected에 추가
  const onDropToExhibition = (e: React.DragEvent) => {
    e.preventDefault();
    setOver(false);
    const id =
      e.dataTransfer.getData("application/x-artwork-id") ||
      e.dataTransfer.getData("text/plain");

    if (!id) return;
    if (selectedIds.has(id)) return; // 중복 방지

    const art = library.find((a) => String(a.id) === id);
    if (!art) return;
    setSelected((prev) => [...prev, art]);
  };

  // 제거
  const removeSelected = (id: string) => {
    setSelected((prev) => prev.filter((a) => a.id !== id));
  };

  // 정렬: 위/아래
  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    setSelected((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };
  const moveDown = (idx: number) => {
    setSelected((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
      return next;
    });
  };

  // 저장(생성)
  const [saving, setSaving] = useState(false);
  const [errorSave, setErrorSave] = useState("");
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("전시 제목을 입력하세요.");
    if (selected.length === 0) return alert("전시에 포함할 작품을 추가하세요.");

    try {
      setSaving(true);
      setErrorSave("");
      const token = localStorage.getItem("accessToken") ?? "";

      // 1) 전시 생성
      const { data: created } = await axios.post<CreateExhibitionRes>(
        `${API_BASE}/exhibitions`,
        { title, description: desc },
        { headers: token ? { Authorization: `Bearer ${token}` } : undefined }
      );

      const exhibitionId = created.id;
      if (!exhibitionId) throw new Error("전시 ID를 가져오지 못했습니다.");

      // 2) 아트웍 연결 (순차적으로 — 서버가 순서를 position으로 받는다면 같이 전송)
      const fails: { artworkId: string; reason: string }[] = [];
      for (let i = 0; i < selected.length; i++) {
        const artworkId = selected[i].id;
        try {
          await axios.post(
            `${API_BASE}/exhibition-artwork`,
            {
              exhibitionId, // number
              artworkId: Number(artworkId), // 서버가 숫자면 캐스팅
              // position: i + 1,         // 서버가 순서 필드 받으면 주석 해제
            },
            {
              headers: token ? { Authorization: `Bearer ${token}` } : undefined,
            }
          );
        } catch (err: any) {
          fails.push({
            artworkId: String(artworkId),
            reason:
              err?.response?.data?.message || err?.message || "알 수 없는 오류",
          });
        }
      }

      if (fails.length > 0) {
        console.warn("일부 아트웍 연결 실패:", fails);
        alert(
          `전시가 생성되었지만, 일부 작품 연결에 실패했습니다.\n` +
            fails.map((f) => `• #${f.artworkId}: ${f.reason}`).join("\n")
        );
      } else {
        alert("전시가 생성되고 모든 작품이 연결되었습니다.");
      }

      // 이동이 필요하면 created.id로 네비게이트
      // navigate(`/exhibitions/${exhibitionId}`);
    } catch (e: any) {
      setErrorSave(
        e?.response?.data?.message || e?.message || "전시 생성에 실패했습니다."
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold">전시관 등록</h1>

      {/* 전시 기본 정보 */}
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start"
      >
        {/* 좌측: 폼 */}
        <div className="lg:col-span-1 space-y-4">
          <div>
            <label className="label">
              <span className="label-text">전시 제목</span>
            </label>
            <input
              className="input input-bordered w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예) 나의 첫 전시"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">설명</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows={4}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="전시 소개를 입력하세요."
            />
          </div>

          {errorSave && (
            <div className="alert alert-error mt-2">
              <span>{errorSave}</span>
            </div>
          )}

          <div className="flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "저장 중..." : "전시 생성"}
            </button>
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setSelected([])}
              disabled={selected.length === 0}
            >
              선택 초기화
            </button>
          </div>
        </div>

        {/* 중앙: 드롭존 + 선택 목록 */}
        <div className="lg:col-span-2 space-y-4">
          {/* 드롭존 */}
          <div
            ref={dropzoneRef}
            className={`border-2 border-dashed rounded-xl p-6 transition
              ${over ? "border-primary bg-primary/5" : "border-base-300"}
            `}
            onDragOver={onDragOverDropzone}
            onDragEnter={(e) => {
              e.preventDefault();
              setOver(true);
            }}
            onDragLeave={() => setOver(false)}
            onDrop={onDropToExhibition}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">전시 드롭존</p>
                <p className="text-sm opacity-70">
                  내 작품을 여기로 드래그해서 추가하세요.
                </p>
              </div>
              <div className="stats shadow">
                <div className="stat">
                  <div className="stat-title">선택 작품</div>
                  <div className="stat-value text-primary">
                    {selected.length}
                  </div>
                  <div className="stat-desc">드롭존에 끌어다 놓으면 추가</div>
                </div>
              </div>
            </div>

            {/* 선택 리스트 */}
            {selected.length === 0 ? (
              <div className="text-center py-10 text-base-content/60">
                아직 선택된 작품이 없습니다.
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                {selected.map((s, idx) => (
                  <div
                    key={s.id}
                    className={`card bg-base-100 shadow-sm transition ${
                      overIdx === idx ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    draggable
                    onDragStartCapture={(e) => {
                      e.dataTransfer.effectAllowed = "move";
                      e.dataTransfer.setData("text/plain", String(idx));
                      setDragIdx(idx);
                    }}
                    onDragOver={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (overIdx !== idx) setOverIdx(idx);
                      e.dataTransfer.dropEffect = "move";
                    }}
                    onDropCapture={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const from =
                        dragIdx ?? Number(e.dataTransfer.getData("text/plain"));
                      const to = idx;
                      if (
                        Number.isFinite(from) &&
                        Number.isFinite(to) &&
                        from !== to
                      ) {
                        setSelected((prev) => moveItem(prev, from!, to));
                      }
                      setDragIdx(null);
                      setOverIdx(null);
                    }}
                    onDragEnd={(e) => {
                      // ✅ 드래그가 끝난 위치가 드롭존 밖이면 제거
                      setOverIdx(null);
                      const rect = dropzoneRef.current?.getBoundingClientRect();
                      if (!rect || dragIdx === null) {
                        setDragIdx(null);
                        return;
                      }

                      const { clientX, clientY } = e; // 마우스 최종 좌표
                      const inside =
                        clientX >= rect.left &&
                        clientX <= rect.right &&
                        clientY >= rect.top &&
                        clientY <= rect.bottom;

                      if (!inside) {
                        // 바깥에 드롭 → 해당 아이템 제거
                        removeAt(dragIdx);
                      }
                      setDragIdx(null);
                    }}
                    title="드래그해서 순서를 바꾸거나, 바깥에 놓아 삭제할 수 있어요"
                  >
                    <figure className="aspect-[4/3] overflow-hidden pointer-events-none">
                      <img
                        src={s.url}
                        alt={s.title}
                        className="h-full object-cover"
                        draggable={false} // 이미지 드래그 방지
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src =
                            placeholder;
                        }}
                        loading="lazy"
                      />
                    </figure>
                    <div className="card-body p-3">
                      <div
                        className="text-sm font-medium truncate"
                        title={s.title}
                      >
                        {idx + 1}. {s.title}
                      </div>

                      <div className="card-actions justify-between mt-2">
                        <div className="join">
                          <button
                            type="button"
                            className="btn btn-xs join-item"
                            onClick={() => moveUp(idx)}
                          >
                            ↑
                          </button>
                          <button
                            type="button"
                            className="btn btn-xs join-item"
                            onClick={() => moveDown(idx)}
                          >
                            ↓
                          </button>
                        </div>
                        <button
                          type="button"
                          className="btn btn-ghost btn-xs"
                          onClick={() => removeSelected(s.id)}
                        >
                          제거
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </form>
      <div className="divider" />
      {/* 하단: 내 작품 라이브러리 */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold">내 작품 라이브러리</h2>
          <span className="text-sm opacity-70">{library.length} 개</span>
        </div>

        {loadingLib ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : errorLib ? (
          <div className="alert alert-error">
            <span>{errorLib}</span>
          </div>
        ) : library.length === 0 ? (
          <div className="text-center py-12">
            <p className="opacity-70">등록된 작품이 없습니다.</p>
            <a href="/artworks/create" className="btn btn-primary btn-sm mt-4">
              작품 올리기
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
            {library.map((a) => (
              <div
                key={a.id}
                className={`card bg-base-100 shadow-sm border
                  ${
                    selectedIds.has(String(a.id))
                      ? "border-primary"
                      : "border-transparent"
                  }
                `}
                draggable
                onDragStartCapture={(e) => onDragStartArtwork(e, a.id)}
                title="드래그해서 전시에 추가"
              >
                <figure className="aspect-[4/3] overflow-hidden">
                  <img
                    src={a.url}
                    alt={a.title}
                    className="h-full object-cover"
                    draggable={false}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = placeholder;
                    }}
                    loading="lazy"
                  />
                </figure>
                <div className="card-body p-3">
                  <div className="text-sm truncate">{a.title}</div>
                  <div className="card-actions justify-end">
                    <button
                      type="button"
                      className="btn btn-outline btn-xs"
                      disabled={selectedIds.has(a.id)}
                      onClick={() =>
                        !selectedIds.has(a.id) &&
                        setSelected((prev) => [...prev, a])
                      }
                    >
                      추가
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
