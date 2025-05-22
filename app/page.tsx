import HomepageGaleri from "@/components/homepage/galeri";
import HomepageHero from "@/components/homepage/hero";
import RekomendasiSeminar from "@/components/homepage/recomendSeminar";
import HomepageSeminarHistory from "@/components/homepage/seminarHistory";

export default function Home() {
  return (
    <main className=" pb-52 bg-slate-50">
      <HomepageHero />
      <HomepageSeminarHistory />
      <RekomendasiSeminar />
      {/* <HomepageGaleri /> */}
    </main>
  );
}
