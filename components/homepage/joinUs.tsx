import { Button } from "@heroui/button";
import Link from "next/link";
import React from "react";

const JoinUs = () => {
  return (
    <div
      style={{
        backgroundImage: "url('/img/join-us.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <div className="layout py-16 flex flex-col justify-center items-center">
        <h5 className="text-center">Mau daftarin acara kamu juga?</h5>
        <h3 className="text-lg font-bold text-center mb-10">
          Yuk, daftar sebagai admin sekarang juga!
        </h3>
        <Link href="https://admin-ngobrol-pintar.vercel.app">
          <Button color="primary">Daftar</Button>
        </Link>
      </div>
    </div>
  );
};

export default JoinUs;
