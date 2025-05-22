import SpotlightCard from "@/components/SpotlightCard/SpotlightCard";
import { Button } from "@heroui/button";
import Image from "next/image";
import React from "react";

type Props = {};

const SeminarCard = (props: Props) => {
  return (
    <SpotlightCard className="w-4/12" spotlightColor="rgb(4, 92, 254, 0.3)">
      <div className="relative aspect-video w-full">
        <Image
          fill
          alt=""
          objectFit="cover"
          src="https://picsum.photos/200/300"
          unoptimized
        />
      </div>
      <div className="p-5">
        <div className="flex gap-5 items-center">
          <h5 className="text-base font-bold w-full">
            Tren dan Inovasi Terkini dalam Dunia Kesehatan.
          </h5>
          <p className="text-sm ">Gratis</p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Pembicara: Dr. Felix S.Kom</p>
          <p className="text-xs text-slate-500">Sabtu, 30 April 2025</p>
        </div>

        <div className="mt-5 flex justify-end">
          <Button color="primary">Daftar</Button>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default SeminarCard;
