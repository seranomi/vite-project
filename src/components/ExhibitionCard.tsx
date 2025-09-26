import { Link } from "react-router-dom";

type Props = {
  id: number | string;
  title: string;
  url: string;
};

export type Artwork = {
  id: number | string;
  title: string;
  url: string;
  description?: string | null;
};


export default function ExhibitionCard({ id, title, url }: Props) {
  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition">
      <figure>
        <img src={url} alt={title} className="h-40 w-full object-cover" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{title}</h2>
        <div className="card-actions">
          <Link to={`/exhibitions/${id}`} className="btn btn-outline btn-sm">
            입장하기
          </Link>
        </div>
      </div>
    </div>
  );
}
