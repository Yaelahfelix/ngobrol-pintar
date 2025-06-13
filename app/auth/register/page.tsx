import React from "react";
import AuthLeftSide from "../components";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import Link from "next/link";
import { SignIn, SignUp } from "@clerk/nextjs";

const LoginPage = () => {
  return (
    <section className="flex">
      <AuthLeftSide
        subtitle="Tempat dimana kamu bisa menonton seminar kita"
        title="Selamat Datang di Ngobrol Pintar"
      />
      <div className="flex h-screen lg:w-6/12 items-center justify-center mx-auto">
        <SignUp
          appearance={{
            elements: {
              headerTitle: "Register to Ngobrol Pintar",
            },
          }}
          signInUrl="/auth/register"
          routing="hash"
        />
      </div>
      {/* <form className="lg:w-6/12 h-screen flex flex-col justify-center lg:p-32 xl: p-72">
        <div>
          <h1 className="text-3xl font-bold mb-3">Selamat Datang Kembali</h1>
          <h6 className="text-slate-500 text-sm">
            Masuk dengan akun NgobrolPintar-mu yuk!
          </h6>
        </div>
        <div className="mt-5 flex flex-col items-end">
          <Input
            label="Email"
            color="default"
            labelPlacement="outside"
            className="mb-5 w-full"
          />
          <Input
            label="Password"
            color="default"
            labelPlacement="outside"
            className="w-full"
            type="password"
          />
          <Link href="/" className="text-slate-400 text-sm mt-1.5">
            Forgot Password?
          </Link>
        </div>

        <div className="mt-10">
          <Button color="primary" radius="full" className="w-full">
            Login
          </Button>
        </div>
      </form> */}
    </section>
  );
};

export default LoginPage;
