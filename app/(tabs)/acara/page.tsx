import { db } from "@/lib/firebase";
import View from "./view";
import shuffle from "@/lib/shuffle";
import { collection, getDocs } from "firebase/firestore";
import { Acara } from "./type";

const SeminarPage = async () => {
  try {
    const colRef = collection(db, "acara");
    const snapshot = await getDocs(colRef);
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      tanggal: doc.data().tanggal.toDate().toISOString(),
    }));

    const shuffledData = shuffle(data);

    return <View initialData={shuffledData as Acara[]} />;
  } catch (error) {
    console.error("Error fetching data:", error);

    // Error state component
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-6">
            Gagal memuat data acara. Silakan coba lagi nanti.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
          >
            Muat Ulang
          </button>
        </div>
      </div>
    );
  }
};

export default SeminarPage;
