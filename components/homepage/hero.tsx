"use client";

import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";
import Particles from "../Particles/Particles";
import RotatingText from "../RotatingText/RotatingText";
import Link from "next/link";
import { Search } from "lucide-react";

const HomepageHero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 pt-32 pb-10 min-h-[80vh] md:min-h-[70vh] lg:h-auto flex items-center">
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      >
        <div className="w-full h-full relative">
          <Particles
            alphaParticles={false}
            disableRotation={false}
            moveParticlesOnHover={true}
            particleBaseSize={40}
            particleColors={["#FFF"]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
          />
        </div>
      </div>
      <div className="layout flex gap-4">
        <section className="lg:w-6/12 flex flex-col gap-4 justify-center text-center lg:text-left">
          <div className="text-4xl text-white">
            <div className="flex gap-5 items-center justify-center lg:justify-start">
              Cari
              <RotatingText
                texts={[
                  "Seminar",
                  "Workshop",
                  "Komunitas",
                  "Forum",
                  "Talkshow",
                  "Webinar",
                ]}
                mainClassName="px-2 sm:px-2 md:px-3  text-blue-500 bg-white font-bold overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={3000}
              />
            </div>
            <h1>
              di <span className="font-bold">NgobrolPintar</span>
            </h1>
          </div>

          <div className="text-sm text-sky-50 leading-7">
            Ngobrol Pintar adalah ruang diskusi santai namun bermakna. Tempat
            para pemikir kreatif, profesional muda, dan peminat ilmu berbagi
            gagasan, pengalaman, dan inspirasi.
          </div>

          <div>
            <Link href="/acara">
              <Button color="default" startContent={<Search />}>
                Cari Seminar
              </Button>
            </Link>
          </div>
        </section>

        <section className="hidden w-6/12 lg:flex justify-end items-center">
          <Image
            src="/img/hero-image.png"
            alt="hero"
            width={400}
            height={400}
          />
        </section>
      </div>
    </section>
  );
};

export default HomepageHero;
