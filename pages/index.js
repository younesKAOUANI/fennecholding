import FeaturedProducts from "@/components/HomePage/FeaturedProducts";
import Hero from "@/components/HomePage/Hero";
import SolutionsSection from "@/components/HomePage/SolutionsSection";
import Stats from "@/components/HomePage/Stats";
import TheyTrustedUs from "@/components/HomePage/TheyTrustedUs";
import Footer from "@/components/main/Footer";
import Header from "@/components/main/Header";
import InfoSection from "@/components/main/InfoSection";

export default function Home() {
  return (
    <main className="pt-18">
      <Hero />
      <Stats />
      <FeaturedProducts />
      <InfoSection title={'Notre ADN'}
        description={'Nous nous concentrons sur la R&D, la fabrication et le service après-vente localement, afin de fournir des équipements de construction de haute qualité conformes aux normes européennes, avec des solutions techniques complètes et un support permanent en un seul endroit'}
        description2={'Nos principaux produits, incluant les équipements de béton, les équipements de construction, les équipements miniers, les équipements pour tunnels et les véhicules spéciaux, soutiennent nos clients VIP à travers le monde pour des projets clés de grande envergure.'}
        img={'/adn-img.jpg'}
        alt={'DNA'}
        imgOrder={'order-2'}
        bg={true}
        href={'/about'}
      />
      <SolutionsSection />
      <TheyTrustedUs />
    </main>
  );
}
