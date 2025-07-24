import { useState } from "react";
import Button from "@/components/Button.tsx";
export { Button };

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </Button>
      <div className="bg-base-100 text-base-content p-6 space-y-4">
        <h2 className="text-2xl font-bold">🧪 테마 테스트</h2>
        <button className="btn btn-primary">Primary</button>
        <button className="btn btn-secondary">Secondary</button>
        <div className="bg-base-200 p-4 rounded-sm">Background box</div>
      </div>
    </>
  );
}
