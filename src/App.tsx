import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import About from "@/pages/Exhibitions/index.tsx";
import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import AuthLayout from "./layouts/AuthLayout";
import ArtworkCreatePage from "./pages/ArtworkCreatePage.tsx/index.tsx";
import MyArtwork from "./pages/MyArtwork/index.tsx";
import ExhibitionCreatePage from "./pages/ExhibitionCreatePage/index.tsx";
import { ExhibitionDetailPage, MyExhibitionsPage } from "./pages/ExhibitionDetailPage.tsx/index.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/exhibitions" index element={<About />} />
          <Route path="/my-artworks" index element={<MyArtwork />} />
          <Route path="/artworks/new" index element={<ArtworkCreatePage />} />
          <Route
            path="/exhibitions/new"
            index
            element={<ExhibitionCreatePage />}
          />
          <Route path="/exhibitions/my" element={<MyExhibitionsPage />} />
          <Route path="/exhibitions/:id" element={<ExhibitionDetailPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
