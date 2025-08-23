import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import AuthLayout from "./layouts/AuthLayout";
import ExhibitionCreatePage from "./pages/ExhibitionCreatePase.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/about" index element={<About />} />
          <Route path="/exhibitions/new" index element={<ExhibitionCreatePage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
