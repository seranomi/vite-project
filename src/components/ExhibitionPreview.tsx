import { useEffect, useState } from "react";
import ExhibitionCard from "./ExhibitionCard";
import axios from "axios";

// const temp1: string =
//   "https://images.metmuseum.org/CRDImages/es/original/DP158590.jpg"; //228990
// const temp2: string =
//   "https://images.metmuseum.org/CRDImages/ep/original/DT5155.jpg"; //437792
// const temp3: string =
//   "https://images.metmuseum.org/CRDImages/ep/original/DT5549.jpg"; //437261

// const mockData = [
//   { id: 1, title: "전시 1", image: temp1 },
//   { id: 2, title: "전시 2", image: temp2 },
//   { id: 3, title: "전시 3", image: temp3 },
// ];

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export type Exhibition = {
  id: number | string;
  title: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
  user?: { id: number | string; email?: string; name?: string };
  artworks: ExhibitionToArtwork[];
};

type ExhibitionToArtwork = {
  id: number | string;
  artwork: Artwork;
};

export type Artwork = {
  id: number | string;
  title: string;
  url: string;
  description?: string | null;
};

export default function ExhibitionPreview() {
  const [list, setList] = useState<Exhibition[]>([]);
  const [, setLoading] = useState(false);
  const [, setError] = useState("");

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get<Exhibition[]>(`${API_BASE}/exhibitions`);
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
    <div className="pb-14 px-15 bg-base-200 min-h-[40vh]">
      <div>
        <h2 className="text-2xl font-bold mb-4">전시 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {list.map((item) => (
            <ExhibitionCard
              key={item.id}
              id={item.id}
              title={item.title}
              url={item.artworks[0]?.artwork.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
