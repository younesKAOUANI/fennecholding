import FeaturedProducts from "@/components/HomePage/FeaturedProducts";
import Hero from "@/components/HomePage/Hero";
import OurDna from "@/components/HomePage/OurDna";
import SolutionsSection from "@/components/HomePage/SolutionsSection";
import Stats from "@/components/HomePage/Stats";
import TheyTrustedUs from "@/components/HomePage/TheyTrustedUs";
import LeasingAndFinancement from "@/components/LeasingPage/LeasingAndFinancement";
import AfterSaleServices from "@/components/ServicePage/AfterSaleServices";
import Head from "next/head";

export default function Home() {
  return (
    <main className="pt-18 bg-gray-50">
      <Head>
        <title>Accueil - Fennec Holding</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Stats />
      <FeaturedProducts />
      <OurDna />
      <SolutionsSection />
      <AfterSaleServices button={true} />
      <LeasingAndFinancement button={true} />
      <TheyTrustedUs />
    </main>
  );
}
