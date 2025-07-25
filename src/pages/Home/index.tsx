import ExhibitionPreview from "@/components/ExhibitionPreview";
import HeroSection from "@/components/HeroSection";


export default function Home() {

  return (
    <div className="animate-fade-in">
      <HeroSection />
      {/* <section className="max-w-6xl mx-auto px-4 py-8"> */}
        <ExhibitionPreview />
      {/* </section> */}
    </div>
  );
}
