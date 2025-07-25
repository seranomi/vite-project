import ExhibitionCard from "./ExhibitionCard";

const temp1: string =
  "https://images.metmuseum.org/CRDImages/es/original/DP158590.jpg"; //228990
const temp2: string =
  "https://images.metmuseum.org/CRDImages/ep/original/DT5155.jpg"; //437792
const temp3: string =
  "https://images.metmuseum.org/CRDImages/ep/original/DT5549.jpg"; //437261

const mockData = [
  { id: 1, title: "전시 1", image: temp1 },
  { id: 2, title: "전시 2", image: temp2 },
  { id: 3, title: "전시 3", image: temp3 },
];

export default function ExhibitionPreview() {
  return (
    <div className="px-15 bg-base-200 min-h-[40vh]">
      <div>
		
        <h2 className="text-2xl font-bold mb-4">전시 목록</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {mockData.map((item) => (
            <ExhibitionCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
