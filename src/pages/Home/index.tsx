import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import Button from "../../components/button.tsx";
export { Button };

export default function Home() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  return (
    <>
      <div>
        <div className="bg-green-400 w-48 h48"></div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div><div className="card">
        <button onClick={() => setCount1((count) => count + 1)}>
          count is {count1}
        </button>
        <Button onClick={() => setCount2((count) => count + 1)}>
          count is {count2}
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}
