"use client";

import React from "react";
import SeminarCard from "./components/seminarCard";
import AcaraCard from "@/app/(tabs)/acara/card";
import { Acara } from "@/app/(tabs)/acara/type";

const RekomendasiSeminar = ({ data }: { data: Acara[] }) => {
  return (
    <div className="layout py-20">
      <h5 className="text-center">Daftar Seminar</h5>
      <h3 className="text-lg font-bold text-center">Rekomendasi Seminar</h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
        {data.map((item) => (
          <AcaraCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default RekomendasiSeminar;
