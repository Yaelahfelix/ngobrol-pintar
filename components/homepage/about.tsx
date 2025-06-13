"use client";
import { Card, CardBody } from "@heroui/react";
import React from "react";

const About = () => {
  return (
    <div className="layout py-20">
      <Card>
        <CardBody className=" p-10 flex gap-3 flex-col lg:flex-row">
          <div className="lg:w-4/12">
            <h5 className="text-left">Siapa Kami?</h5>
            <h3 className="text-3xl font-bold text-left mb-10">Tentang Kami</h3>
          </div>
          <p className="lg:w-8/12">
            Ngobrol Pintar adalah platform interaktif yang dirancang untuk
            menjadi ruang bertumbuh bagi siapa saja yang ingin memperluas
            wawasan dan koneksi. Kami menyediakan informasi dan akses mudah ke
            berbagai seminar, webinar, forum diskusi, dan acara edukatif lainnya
            yang relevan dengan kebutuhan zaman.
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default About;
