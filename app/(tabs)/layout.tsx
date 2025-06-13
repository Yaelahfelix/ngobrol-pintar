import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "@/styles/globals.css";
import clsx from "clsx";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
