import React from "react";

type Props = { title: string; subtitle: string };

const AuthLeftSide = ({ title, subtitle }: Props) => {
  return (
    <div className="w-6/12 hidden lg:block bg-[url(/img/auth-image.jpg)] h-screen bg-cover relative text-white text-center">
      <div className="bg-[#0D65D9] opacity-30 w-full h-full absolute" />
      <div className="flex flex-col justify-center items-center h-full z-50 absolute w-full">
        <h1 className="text-3xl font-bold mb-5">{title}</h1>
        <h3>{subtitle}</h3>
      </div>
    </div>
  );
};

export default AuthLeftSide;
