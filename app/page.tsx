import Hero from "@/components/Hero";
import NextEvent from "@/components/NextEvent";
import LatestDrop from "@/components/LatestDrop";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <NextEvent />
      <LatestDrop />
      <About />
      <Newsletter />
      <Footer />
    </main>
  );
}


