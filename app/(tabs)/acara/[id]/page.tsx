import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import View from "./view";
import { redirect } from "next/navigation";
import { Acara } from "../type";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const docRef = doc(db, "acara", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    redirect("/acara");
  }

  const data = {
    id: docSnap.id,
    ...docSnap.data(),
    tanggal: docSnap.data().tanggal.toDate().toISOString(),
  };
  return <View data={data as Acara} />;
}
