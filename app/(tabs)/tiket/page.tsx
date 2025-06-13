// app/tiket/page.tsx
import { db } from "@/lib/firebase";
import { useAuth } from "@clerk/nextjs";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { format } from "date-fns";
import { id } from "date-fns/locale";
export default async function TiketListPage() {
  const { userId } = await auth();

  const qTiket = query(collection(db, "tiket"), where("userId", "==", userId));
  const snapshotTiket = await getDocs(qTiket);

  const tiketList = [];

  for (const tiketDoc of snapshotTiket.docs) {
    const tiketData = tiketDoc.data();

    const acaraRef = doc(db, "acara", tiketData.idSeminar);
    const acaraSnapshot = await getDoc(acaraRef);

    if (acaraSnapshot.exists()) {
      tiketList.push({
        id: tiketDoc.id,
        ...tiketData,
        acara: {
          id: acaraSnapshot.id,
          ...acaraSnapshot.data(),
          tanggal: format(
            acaraSnapshot.data().tanggal.toDate(),
            "HH.mm - dd MMMM yyyy",
            { locale: id }
          ),
        },
      });
    }
  }
  console.log(tiketList);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Tiket Saya
              </h1>
              <p className="text-gray-600">
                Kelola dan akses semua tiket event Anda di satu tempat
              </p>
            </div>
            <div className="hidden md:block">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full">
                <span className="font-semibold">{tiketList.length} Tiket</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {tiketList.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="bg-white rounded-3xl shadow-lg p-12 max-w-md mx-auto">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Belum Ada Tiket
              </h3>
              <p className="text-gray-500 mb-6">
                Anda belum memiliki tiket event. Mulai jelajahi event menarik
                dan dapatkan tiket Anda!
              </p>
              <Link href="/acara">
                <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5">
                  Jelajahi Event
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Ticket Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tiketList.map((tiket: any) => (
              <Link href={`/tiket/${tiket.id}`} key={tiket.id}>
                <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2">
                  {/* Status Badge */}
                  <div className="relative">
                    <div className="absolute top-4 right-4 z-10">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          tiket.isExpired
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                      >
                        {tiket.isExpired ? "⏰ Expired" : "✅ Aktif"}
                      </span>
                    </div>

                    {/* Header Gradient */}
                    <div className="h-32 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

                      {/* Category Badge */}
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                          {tiket.acara.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    {/* Event Title */}
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {tiket.acara.name}
                      </h2>
                    </div>

                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-3 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {tiket.acara.tanggal}
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <svg
                          className="w-4 h-4 mr-3 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {tiket.acara.tempat}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">
                          Harga Tiket
                        </span>
                        <span className="text-lg font-bold text-gray-900">
                          Rp {parseInt(tiket.acara.harga).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link className="pt-2" href={"/tiket/" + tiket.id}>
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-center py-3 rounded-xl font-semibold group-hover:from-blue-600 group-hover:to-indigo-700 transition-all duration-200">
                        {tiket.isExpired ? "Lihat Detail" : "Lihat QR Code"}
                      </div>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
