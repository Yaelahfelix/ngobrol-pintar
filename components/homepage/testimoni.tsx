"use client";

import React from "react";
import CardTestimoni from "../cardTestimoni";

const Testimoni = () => {
  return (
    <section className="">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="-mb-3"
      >
        <path
          fill="#3b82f6"
          fillOpacity="1"
          d="M0,96L48,101.3C96,107,192,117,288,149.3C384,181,480,235,576,229.3C672,224,768,160,864,154.7C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </svg>
      <div className="bg-blue-500">
        <div className="layout py-5   text-white">
          <h5 className="text-center">
            Kenapa harus selalu aktif mengikuti kegiatan?
          </h5>
          <h3 className="text-lg font-bold text-center mb-10">
            Tonton Penjelasannya
          </h3>

          <div className="flex gap-5 flex-col md:flex-row">
            <CardTestimoni
              title={
                "Webinarnya informatif banget! Materinya disampaikan dengan santai tapi tetap berbobot. Nggak nyesel ikut!."
              }
              author={"Ferdinand Felix"}
              job="Software Engineer"
              img="/img/felix.jpeg"
            />
            <CardTestimoni
              title={
                "Saya baru pertama kali ikut webinar, dan langsung ketagihan! Presenternya asyik, dan sesi tanya jawabnya aktif banget."
              }
              author={"Dhealova Fitri Wulandari"}
              job="Designer"
              img="/img/dhea.jpeg"
            />
            <CardTestimoni
              title={
                "Topik yang dibahas sangat relevan dengan kehidupan saya. Setelah ikut, saya langsung bisa terapkan ilmunya untuk diri sendiri!"
              }
              author={"Muhammad Aulia Rahmandhani"}
              job="Project Manager"
              img="/img/aldi.jpeg"
            />
          </div>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="-mt-3"
      >
        <path
          fill="#3b82f6"
          fillOpacity="1"
          d="M0,256L48,245.3C96,235,192,213,288,202.7C384,192,480,192,576,170.7C672,149,768,107,864,85.3C960,64,1056,64,1152,96C1248,128,1344,192,1392,224L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
};

export default Testimoni;
