import HomepageHero from "@/components/homepage/hero";
import RekomendasiSeminar from "@/components/homepage/recomendSeminar";
import { db } from "@/lib/firebase";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { Acara } from "./acara/type";
import YoutubeEmbed from "@/components/youtubeEmbed";
import Testimoni from "@/components/homepage/testimoni";
import JoinUs from "@/components/homepage/joinUs";
import About from "@/components/homepage/about";

export default async function Home() {
  const q = query(collection(db, "acara"), limit(6));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    tanggal: doc.data().tanggal.toDate().toISOString(),
  }));

  return (
    <main className=" bg-slate-50">
      <HomepageHero />
      <About />
      <RekomendasiSeminar data={data as Acara[]} />
      <Testimoni />
      <div className="layout pt-10 pb-32 lg:px-20">
        <h5 className="text-center">
          Kenapa harus selalu aktif mengikuti kegiatan?
        </h5>
        <h3 className="text-lg font-bold text-center mb-10">
          Tonton Penjelasannya
        </h3>
        <div className="flex flex-col md:flex-row gap-5">
          <div className="md:w-6/12">
            <YoutubeEmbed />
          </div>
          <div className="md:w-6/12 flex items-center flex-1 leading-7">
            <p>
              Motivasi bisa naik turun, apalagi saat kita merasa lelah atau
              kehilangan arah. Video ini akan membantu kamu memahami alasan
              utama kenapa motivasi bisa hilang dan apa yang bisa kamu lakukan
              untuk mengembalikannya. Yuk, simak penjelasannya dan temukan cara
              sederhana untuk tetap semangat dan produktif setiap hari!
            </p>
          </div>
        </div>
      </div>
      <JoinUs />
    </main>
  );
}
