import { db } from "@/lib/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { formData, payload, userId, price, invoice, idSeminar, user } =
    await request.json();
  const SERVER_KEY = "SB-Mid-server-PvAbD2oijBL7WPIm3Vv6MrWq";
  const AUTH_STRING = btoa(SERVER_KEY);
  const endpoint = "https://app.sandbox.midtrans.com/snap/v1/transactions";
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${AUTH_STRING}`,
    },
    body: JSON.stringify(payload),
  });

  const response = await res.json();

  return NextResponse.json({ token: response.token });
};
