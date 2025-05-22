"use client";

import React from "react";
import SeminarCard from "./components/seminarCard";

const RekomendasiSeminar = () => {
  return (
    <div className="layout py-20">
      <h5 className="text-center">Daftar Seminar</h5>
      <h3 className="text-lg font-bold text-center">Rekomendasi Seminar</h3>

      <div className="flex flex-col gap-5 mt-16">
        <div className="flex gap-5 ">
          <SeminarCard />
          <SeminarCard />
          <SeminarCard />
        </div>
        <div className="flex gap-5 ">
          <SeminarCard />
          <SeminarCard />
          <SeminarCard />
        </div>
      </div>
    </div>
  );
};

export default RekomendasiSeminar;
