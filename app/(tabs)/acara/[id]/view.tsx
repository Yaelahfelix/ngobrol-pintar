"use client";

import React, { useEffect } from "react";
import DetailCard from "./card";
import { Acara } from "../type";
import { Button } from "@heroui/button";
import { formatRupiah } from "@/lib/formatRupiah";
import { Card, CardBody, useDisclosure, Chip } from "@heroui/react";
import Image from "next/image";
import ModalDaftar from "./modalDaftar";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  User,
  Users,
  Gift,
  CreditCard,
  ArrowRight,
} from "lucide-react";

type Props = {
  data: Acara;
};

const View = ({ data }: Props) => {
  const session = useAuth();
  const { isOpen, onOpenChange, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.type = "text/javascript";
    script.setAttribute("data-client-key", "SB-Mid-client-cMGKwpCGPNbUwhre");
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const handleRegister = () => {
    if (session.isSignedIn) {
      onOpen();
    } else {
      router.push("/auth/login");
    }
  };
  const isFree = data.is_free;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-4">
                <Chip
                  size="sm"
                  className={`${isFree ? "bg-green-500" : "bg-orange-500"} text-white font-medium`}
                  startContent={
                    isFree ? (
                      <Gift className="w-3 h-3" />
                    ) : (
                      <CreditCard className="w-3 h-3" />
                    )
                  }
                >
                  {isFree ? "GRATIS" : "BERBAYAR"}
                </Chip>
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {data.name}
              </h1>

              <div className="flex items-center gap-3 mb-6 text-blue-100">
                <User className="w-5 h-5" />
                <span className="text-lg">
                  {data.pembicara} - {data.jabatan_pembicara}
                </span>
              </div>

              <p className="text-blue-100 text-lg leading-relaxed mb-8">
                {data.description}
              </p>

              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                endContent={<ArrowRight className="w-5 h-5" />}
                onPress={handleRegister}
              >
                {session.isSignedIn ? "Daftar Sekarang" : "Login untuk Daftar"}
              </Button>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-30"></div>
              <Card className="relative shadow-2xl border-0 overflow-hidden">
                <div className="aspect-video relative">
                  <Image
                    src={data.thumbnailUrl}
                    alt={data.name}
                    fill
                    className="object-contain"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 animate-pulse">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {isFree ? "GRATIS" : formatRupiah(data.harga)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {isFree ? "Pendaftaran Gratis" : "Biaya Pendaftaran"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Detail Seminar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Dapatkan informasi lengkap tentang seminar yang akan Anda ikuti
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <DetailCard
            title="Tanggal & Waktu"
            description={`${data.tanggal}`}
            icon={<Calendar className="w-5 h-5 text-blue-600" />}
          />

          <DetailCard
            title="Lokasi"
            description={data.tempat}
            icon={<MapPin className="w-5 h-5 text-blue-600" />}
          />

          <DetailCard
            title="Pembicara"
            description={`${data.pembicara} - ${data.jabatan_pembicara}`}
            icon={<User className="w-5 h-5 text-blue-600" />}
          />

          <DetailCard
            title="Kapasitas"
            description={`${data.slot} peserta`}
            icon={<Users className="w-5 h-5 text-blue-600" />}
          />

          <DetailCard
            title="Biaya"
            description={
              isFree ? "Gratis untuk semua peserta" : formatRupiah(data.harga)
            }
            icon={
              isFree ? (
                <Gift className="w-5 h-5 text-green-600" />
              ) : (
                <CreditCard className="w-5 h-5 text-blue-600" />
              )
            }
          />
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 border-0">
            <CardBody className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4 mx-auto">
                Jangan Lewatkan Kesempatan Ini!
              </h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Bergabunglah dengan peserta lainnya dan dapatkan ilmu berharga
                dari {data.pembicara}
              </p>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                endContent={<ArrowRight className="w-5 h-5" />}
                onPress={handleRegister}
              >
                {session.isSignedIn ? "Daftar Sekarang" : "Login untuk Daftar"}
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Registration Modal */}
      <ModalDaftar
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
        isFree={isFree}
        price={Number(data.harga)}
        idSeminar={data.id}
        seminarTitle={data.name}
      />
    </div>
  );
};

export default View;
