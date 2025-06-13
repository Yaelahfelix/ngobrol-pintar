import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  addToast,
  Divider,
  Spinner,
} from "@heroui/react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth, useUser } from "@clerk/nextjs";
import { CreditCard, Gift, MapPin, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";

// Helper function to format currency
const formatRupiah = (angka: number): string => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(angka);
};

// Generate unique invoice ID
const generateInvoiceId = (): string => {
  const date = new Date();
  const timestamp = date.getTime();
  return `INV-${timestamp}`;
};

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  isFree?: boolean;
  price?: number;
  idSeminar: string;
  seminarTitle?: string;
};

const ModalDaftar = ({
  isOpen,
  onOpenChange,
  onClose,
  isFree = false,
  price = 0,
  idSeminar,
  seminarTitle = "Seminar",
}: Props) => {
  const [formData, setFormData] = useState({
    nama: "",
    kota: "",
    noWhatsapp: "",
  });

  const [errors, setErrors] = useState({
    nama: "",
    kota: "",
    noWhatsapp: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const session = useAuth();
  const user = useUser();
  const Router = useRouter();

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { nama: "", kota: "", noWhatsapp: "" };

    if (!formData.nama.trim()) {
      newErrors.nama = "Nama lengkap wajib diisi";
      isValid = false;
    } else if (formData.nama.trim().length < 2) {
      newErrors.nama = "Nama minimal 2 karakter";
      isValid = false;
    }

    if (!formData.kota.trim()) {
      newErrors.kota = "Kota asal wajib diisi";
      isValid = false;
    }

    if (!formData.noWhatsapp.trim()) {
      newErrors.noWhatsapp = "Nomor WhatsApp wajib diisi";
      isValid = false;
    } else if (
      !/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(
        formData.noWhatsapp.replace(/\s/g, "")
      )
    ) {
      newErrors.noWhatsapp = "Format nomor WhatsApp tidak valid";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const submitHandler = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const userId = session.userId || null;
      const invoice = generateInvoiceId();

      if (isFree) {
        await addDoc(collection(db, "pembayaran"), {
          nama: formData.nama,
          kotaAsal: formData.kota,
          noWhatsapp: formData.noWhatsapp,
          harga: 0,
          noInvoice: invoice,
          statusPembayaran: "success",
          idSeminar,
          userId,
          createdAt: new Date(),
          paymentDetails: {
            payment_type: "free_registration",
            transaction_time: new Date().toISOString(),
          },
        });

        await addDoc(collection(db, "tiket"), {
          userId,
          noInvoice: invoice,
          idSeminar,
          isExpired: false,
          createdAt: new Date(),
          nama: formData.nama,
          kotaAsal: formData.kota,
          noWhatsapp: formData.noWhatsapp,
        });

        const userEmail = user.user?.emailAddresses[0]?.emailAddress;
        if (userEmail) {
          await fetch("/api/send-ticket-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nama: formData.nama,
              kotaAsal: formData.kota,
              noWhatsapp: formData.noWhatsapp,
              noInvoice: invoice,
              idSeminar,
              email: userEmail,
            }),
          });
        }

        addToast({
          title: "Pendaftaran Berhasil! 🎉",
          description: "Tiket gratis telah dikirim ke email Anda",
          color: "success",
        });

        onClose();
        return;
      }

      const payload = {
        transaction_details: {
          order_id: invoice,
          gross_amount: price,
        },
        customer_details: {
          first_name: formData.nama,
          phone: formData.noWhatsapp,
        },
        // item_details: [
        //   {
        //     id: idSeminar,
        //     price: price,
        //     quantity: 1,
        //     name: seminarTitle,
        //   },
        // ],
      };

      const res = await fetch("/api/daftar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          payload,
          formData,
          userId,
          price,
          invoice,
          idSeminar,
          user,
        }),
      });
      const response = await res.json();
      if (res.ok) {
        const docRef = await addDoc(collection(db, "pembayaran"), {
          nama: formData.nama,
          kotaAsal: formData.kota,
          noWhatsapp: formData.noWhatsapp,
          harga: price,
          noInvoice: invoice,
          statusPembayaran: "pending",
          idSeminar,
          userId,
          createdAt: new Date(),
        });
        (window as any).snap.pay(response.token, {
          onSuccess: async function (result: any) {
            console.log("Pembayaran berhasil", result);

            const paymentRef = doc(db, "pembayaran", docRef.id);
            await updateDoc(paymentRef, {
              statusPembayaran: "success",
              paymentDetails: result,
            });

            const data = await addDoc(collection(db, "tiket"), {
              userId,
              noInvoice: invoice,
              idSeminar,
              isExpired: false,
              createdAt: new Date(),
              nama: formData.nama,
              kotaAsal: formData.kota,
              noWhatsapp: formData.noWhatsapp,
            });

            const userEmail = user.user?.emailAddresses[0]?.emailAddress;
            if (userEmail) {
              await fetch("/api/send-ticket-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  nama: formData.nama,
                  kotaAsal: formData.kota,
                  noWhatsapp: formData.noWhatsapp,
                  noInvoice: invoice,
                  idSeminar,
                  email: userEmail,
                }),
              });
            }
            addToast({
              title: "Pembayaran Berhasil! 🎉",
              description: "Tiket telah dikirim ke email Anda",
              color: "success",
            });
            Router.push("/tiket/" + data.id);
            onClose();
          },
          onPending: async function (result: any) {
            const paymentRef = doc(db, "pembayaran", docRef.id);
            await updateDoc(paymentRef, {
              statusPembayaran: "error",
              paymentDetails: result,
            });
            addToast({
              title: "Terjadi Kesalahan",
              description: "Gagal memproses pendaftaran. Silakan coba lagi.",
              color: "danger",
            });
          },
          onError: async function (result: any) {
            const paymentRef = doc(db, "pembayaran", docRef.id);
            await updateDoc(paymentRef, {
              statusPembayaran: "error",
              paymentDetails: result,
            });
            addToast({
              title: "Terjadi Kesalahan",
              description: "Gagal memproses pendaftaran. Silakan coba lagi.",
              color: "danger",
            });
          },
          onClose: function () {
            console.log("Customer menutup popup pembayaran");
          },
        });
      }
    } catch (err) {
      console.error("Error saat memproses pendaftaran:", err);
      addToast({
        title: "Terjadi Kesalahan",
        description: "Gagal memproses pendaftaran. Silakan coba lagi.",
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ nama: "", kota: "", noWhatsapp: "" });
    setErrors({ nama: "", kota: "", noWhatsapp: "" });
    setIsLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
      classNames={{
        backdrop: "bg-gradient-to-t from-blue-900/20 to-blue-900/10",
        base: "border-blue-200 bg-white",
        header: "border-b-[1px] border-blue-100",
        body: "py-6",
        footer: "border-t-[1px] border-blue-100",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                {isFree ? (
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Gift className="w-5 h-5 text-green-600" />
                  </div>
                ) : (
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                )}
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Form Pendaftaran
                  </h2>
                  <p className="text-sm text-gray-600">{seminarTitle}</p>
                </div>
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap Anda"
                  value={formData.nama}
                  onValueChange={(value) => updateFormData("nama", value)}
                  isInvalid={!!errors.nama}
                  errorMessage={errors.nama}
                  startContent={<User className="w-4 h-4 text-gray-400" />}
                  isRequired
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper:
                      "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                  }}
                />

                <Input
                  label="Kota Asal"
                  placeholder="Masukkan kota asal Anda"
                  value={formData.kota}
                  onValueChange={(value) => updateFormData("kota", value)}
                  isInvalid={!!errors.kota}
                  errorMessage={errors.kota}
                  startContent={<MapPin className="w-4 h-4 text-gray-400" />}
                  isRequired
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper:
                      "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                  }}
                />

                <Input
                  label="Nomor WhatsApp"
                  placeholder="Contoh: 08123456789"
                  value={formData.noWhatsapp}
                  onValueChange={(value) => updateFormData("noWhatsapp", value)}
                  isInvalid={!!errors.noWhatsapp}
                  errorMessage={errors.noWhatsapp}
                  startContent={<Phone className="w-4 h-4 text-gray-400" />}
                  isRequired
                  classNames={{
                    input: "text-gray-900",
                    inputWrapper:
                      "border-gray-200 hover:border-blue-400 focus-within:border-blue-500",
                  }}
                />

                <Divider className="my-4" />

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      Biaya Pendaftaran:
                    </span>
                    <span
                      className={`text-lg font-bold ${isFree ? "text-green-600" : "text-blue-600"}`}
                    >
                      {isFree ? "GRATIS" : formatRupiah(price)}
                    </span>
                  </div>
                  {isFree && (
                    <p className="text-xs text-green-600 mt-1">
                      🎉 Seminar gratis untuk peserta terbatas!
                    </p>
                  )}
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onPress={handleClose}
                isDisabled={isLoading}
              >
                Batal
              </Button>
              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6"
                onPress={submitHandler}
                isLoading={isLoading}
                spinner={<Spinner size="sm" color="white" />}
              >
                {isLoading
                  ? "Memproses..."
                  : isFree
                    ? "Daftar Gratis"
                    : "Bayar & Daftar"}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ModalDaftar;
