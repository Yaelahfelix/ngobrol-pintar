import Link from "next/link";
import React from "react";
import { Acara } from "./type";
import Image from "next/image";
import { formatRupiah } from "@/lib/formatRupiah";

type Props = { data: Acara };

const AcaraCard = ({ data }: Props) => {
  // Format date function
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
      {/* Image Container */}
      <div className="relative">
        <div className="relative w-full aspect-video bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          <Image
            fill
            src={data.thumbnailUrl}
            alt={data.name}
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {data.category}
          </span>
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4">
          {data.is_free ? (
            <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              GRATIS
            </span>
          ) : (
            <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
              {formatRupiah(data.harga)}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {data.name}
          </h2>
        </div>

        {/* Event Details */}
        <div className="space-y-3">
          {/* Date & Time */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0"
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
            <div>
              <div className="font-medium">{formatDate(data.tanggal)}</div>
              <div className="text-xs text-gray-500">
                {formatTime(data.tanggal)}
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-3 text-blue-500 flex-shrink-0"
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
            <span className="line-clamp-1">{data.tempat}</span>
          </div>
        </div>

        {/* Description (if available) */}
        {data.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {data.description}
          </p>
        )}

        {/* Action Button */}
        <div className="pt-2">
          <Link href={`/acara/${data.id}`} className="block">
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl">
              <span className="flex items-center justify-center">
                Daftar Sekarang
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default AcaraCard;
