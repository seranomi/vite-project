import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import "./app.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" index element={<About />} />
          <Route path="/signup" index element={<Signup />} />
          <Route path="/signin" index element={<Signin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
