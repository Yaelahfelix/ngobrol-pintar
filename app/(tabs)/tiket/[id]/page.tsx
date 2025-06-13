import { db } from "@/lib/firebase";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { notFound } from "next/navigation";
import { QRCodeSVG as QrCode } from "qrcode.react";

export default async function TiketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tiketDocRef = doc(db, "tiket", id);
  const tiketSnapshot = await getDoc(tiketDocRef);

  if (!tiketSnapshot.exists()) {
    return notFound();
  }

  const tiketData = tiketSnapshot.data();

  // 2. Ambil data acara terkait
  const acaraRef = doc(db, "acara", tiketData.idSeminar);
  const acaraSnapshot = await getDoc(acaraRef);

  if (!acaraSnapshot.exists()) {
    return <div className="text-center mt-10">Acara tidak ditemukan</div>;
  }

  const acaraData = acaraSnapshot.data();

  // Format tanggal acara
  const tanggalFormatted = format(
    acaraData.tanggal.toDate(),
    "HH.mm - dd MMMM yyyy",
    {
      locale: idLocale,
    }
  );

  const tiket: any = {
    id: tiketSnapshot.id,
    ...tiketData,
    acara: {
      id: acaraSnapshot.id,
      ...acaraData,
      tanggal: tanggalFormatted,
    },
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="container mx-auto max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">E-Ticket</h1>
          <p className="text-gray-600">Detail Tiket Acara</p>
        </div>

        {/* Ticket Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Top Section with Gradient */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                  <span className="text-sm font-medium">
                    {tiket.isExpired ? "❌ Expired" : "✅ Active"}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-80">Tanggal Pelaksanaan</p>
                  <p className="font-bold">{tiket.acara.tanggal}</p>
                </div>
              </div>

              <h2 className="text-2xl font-bold mb-1">{tiket.nama}</h2>
              <p className="text-indigo-100">📍 {tiket.kotaAsal}</p>
            </div>
          </div>

          {/* Dotted Border Separator */}
          <div className="relative">
            <div className="absolute left-0 top-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full -translate-x-4 -translate-y-4"></div>
            <div className="absolute right-0 top-0 w-8 h-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full translate-x-4 -translate-y-4"></div>
            <div className="border-t-2 border-dashed border-gray-200 mx-4"></div>
          </div>

          {/* Bottom Section */}
          <div className="p-6 space-y-6">
            {/* Invoice Info */}
            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Invoice Number</p>
                  <p className="font-mono font-bold text-gray-800">
                    {tiket.noInvoice}
                  </p>
                </div>
                <div className="bg-indigo-100 rounded-full p-2">
                  <svg
                    className="w-5 h-5 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">
                Scan QR Code untuk verifikasi
              </p>
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                <QrCode value="sdsd" size={160} />
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="bg-amber-100 rounded-full p-1 mt-0.5">
                  <svg
                    className="w-4 h-4 text-amber-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800">
                    Petunjuk Penggunaan
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Tunjukkan QR code ini kepada petugas saat check-in seminar
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full -translate-x-8 translate-y-8"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-purple-100 to-transparent rounded-full translate-x-6 translate-y-6"></div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>© 2025 Ngobrol Pintar</p>
          <p>Tiket digital valid untuk satu kali penggunaan</p>
        </div>
      </div>
    </div>
  );
}
