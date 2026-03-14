"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

interface Course {
  id: number;
  title: string;
  price: number;
  category: string;
  schedule: string;
  time: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const INFO_SOURCES = [
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "teman", label: "Teman" },
  { value: "facebook", label: "Facebook" },
  { value: "lainnya", label: "Lainnya" },
];

export default function DaftarPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetchingCourses, setFetchingCourses] = useState(true);
  const [success, setSuccess] = useState(false);
  const [registrationNumber, setRegistrationNumber] = useState("");

  // Form state
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [infoSource, setInfoSource] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Fetch courses from API
  useEffect(() => {
    fetch(`${API_URL}/courses`)
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.data || []);
        setFetchingCourses(false);
      })
      .catch(() => {
        setFetchingCourses(false);
        toast.error("Gagal memuat daftar kelas");
      });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }
      setPaymentProof(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const toggleCourse = (id: number) => {
    setSelectedCourses((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCourses.length === 0) {
      toast.error("Pilih minimal 1 kelas");
      return;
    }
    if (!paymentProof) {
      toast.error("Upload bukti transfer");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("full_name", fullName);
    formData.append("institution", institution);
    formData.append("phone", phone);
    if (email) formData.append("email", email);
    formData.append("info_source", infoSource);
    selectedCourses.forEach((id) => {
      formData.append("course_ids[]", String(id));
    });
    formData.append("payment_proof", paymentProof);

    try {
      const res = await fetch(`${API_URL}/registrations`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setRegistrationNumber(data.data?.registration_number || "");
        toast.success("Pendaftaran berhasil!");
      } else {
        // Handle validation errors
        if (data.errors) {
          const firstError = Object.values(data.errors)[0];
          toast.error(
            Array.isArray(firstError) ? firstError[0] as string : String(firstError)
          );
        } else {
          toast.error(data.message || "Terjadi kesalahan");
        }
      }
    } catch {
      toast.error("Gagal mengirim pendaftaran. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // ─── SUCCESS STATE ───────────────────────────────────────
  if (success) {
    return (
      <main className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft-lg dark:shadow-slate-900/50 p-8 sm:p-12 border border-slate-100 dark:border-slate-700">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon
                  icon="solar:check-circle-bold"
                  className="text-4xl text-green-500"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white mb-3">
                Pendaftaran Berhasil! 🎉
              </h1>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Terima kasih telah mendaftar di Educare Academy.
              </p>

              {registrationNumber && (
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-2xl p-4 mb-6">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                    Nomor Pendaftaran
                  </p>
                  <p className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {registrationNumber}
                  </p>
                </div>
              )}

              <p className="text-sm text-slate-500 dark:text-slate-400 mb-8">
                Tim kami akan memverifikasi pembayaran Anda dalam 1x24 jam.
                Informasi selanjutnya akan dikirim melalui WhatsApp.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary-700 transition-colors"
                >
                  <Icon icon="solar:home-linear" />
                  Kembali ke Beranda
                </a>
                <a
                  href={`https://wa.me/6288210372698?text=Halo%20Educare%2C%20saya%20baru%20mendaftar%20dengan%20nomor%20${registrationNumber}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                >
                  <Icon icon="tabler:brand-whatsapp" />
                  Hubungi via WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    );
  }

  // ─── FORM STATE ──────────────────────────────────────────
  return (
    <main className="min-h-screen pt-28 pb-20 bg-gradient-to-br from-slate-50 via-white to-primary-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Decorations */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-primary-200/30 dark:bg-primary-900/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-secondary-200/20 dark:bg-secondary-900/10 rounded-full blur-3xl" />

      <div className="container mx-auto lg:max-w-screen-xl md:max-w-screen-md px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-4 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold rounded-full mb-4">
            Pendaftaran Kelas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white mb-4">
            Daftar{" "}
            <span className="gradient-text">Sekarang</span>
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Silahkan pilih kelas yang ingin diikuti dan lengkapi data diri Anda.
          </p>
        </motion.div>

        {/* Payment Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 sm:p-6">
            <div className="flex items-start gap-3">
              <Icon
                icon="solar:info-circle-bold"
                className="text-2xl text-amber-500 flex-shrink-0 mt-0.5"
              />
              <div>
                <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                  Informasi Pembayaran
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-400">
                  Transfer ke rekening{" "}
                  <strong>901003672522 (Seabank)</strong> A/N{" "}
                  <strong>Muhammad Aziz Andriansyah</strong>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-slate-800 rounded-3xl shadow-soft-lg dark:shadow-slate-900/50 p-6 sm:p-10 border border-slate-100 dark:border-slate-700 space-y-6"
          >
            {/* Nama Lengkap */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Nama Lengkap (Jika Ada Gelar Cantumkan){" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Contoh: Dr. Ahmad Fauzi, S.E., M.Ak."
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Asal Instansi */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Asal Instansi <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                placeholder="Contoh: Universitas Indonesia"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Nomor Telepon & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Email <span className="text-slate-400">(opsional)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-800 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Sumber Info */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                Dapat Informasi Pelatihan Dari{" "}
                <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INFO_SOURCES.map((src) => (
                  <label
                    key={src.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all ${
                      infoSource === src.value
                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                        : "border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-700 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="info_source"
                      value={src.value}
                      checked={infoSource === src.value}
                      onChange={(e) => setInfoSource(e.target.value)}
                      required
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        infoSource === src.value
                          ? "border-primary-500"
                          : "border-slate-300 dark:border-slate-500"
                      }`}
                    >
                      {infoSource === src.value && (
                        <div className="w-2 h-2 rounded-full bg-primary-500" />
                      )}
                    </div>
                    <span className="text-sm font-medium">{src.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pilihan Kelas */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">
                Pilihan Kelas <span className="text-red-500">*</span>
                <span className="text-slate-400 font-normal ml-2">
                  (bisa pilih lebih dari 1)
                </span>
              </label>
              {fetchingCourses ? (
                <div className="flex items-center justify-center py-8">
                  <Icon
                    icon="solar:refresh-linear"
                    className="text-2xl text-primary-500 animate-spin"
                  />
                  <span className="ml-2 text-slate-500">Memuat kelas...</span>
                </div>
              ) : (
                <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                  {courses.map((course) => (
                    <label
                      key={course.id}
                      className={`flex items-center gap-4 px-4 py-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        selectedCourses.includes(course.id)
                          ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                          : "border-slate-200 dark:border-slate-600 hover:border-primary-300 dark:hover:border-primary-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleCourse(course.id)}
                      />
                      <div
                        className={`w-5 h-5 rounded flex items-center justify-center border-2 flex-shrink-0 ${
                          selectedCourses.includes(course.id)
                            ? "border-primary-500 bg-primary-500"
                            : "border-slate-300 dark:border-slate-500"
                        }`}
                      >
                        {selectedCourses.includes(course.id) && (
                          <Icon
                            icon="solar:check-read-linear"
                            className="text-white text-xs"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-slate-800 dark:text-white text-sm truncate">
                          {course.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {course.schedule} • {course.time}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-primary-600 dark:text-primary-400 flex-shrink-0">
                        {formatPrice(course.price)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
              {selectedCourses.length > 0 && (
                <div className="mt-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl flex items-center justify-between">
                  <span className="text-sm text-primary-700 dark:text-primary-300">
                    {selectedCourses.length} kelas dipilih
                  </span>
                  <span className="text-sm font-bold text-primary-700 dark:text-primary-300">
                    Total:{" "}
                    {formatPrice(
                      courses
                        .filter((c) => selectedCourses.includes(c.id))
                        .reduce((sum, c) => sum + c.price, 0)
                    )}
                  </span>
                </div>
              )}
            </div>

            {/* Bukti Transfer */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                Bukti Transfer <span className="text-red-500">*</span>
              </label>
              <div
                className={`relative border-2 border-dashed rounded-xl transition-all ${
                  previewUrl
                    ? "border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900/10"
                    : "border-slate-300 dark:border-slate-600 hover:border-primary-400 dark:hover:border-primary-600"
                }`}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                {previewUrl ? (
                  <div className="p-4 flex items-center gap-4">
                    {paymentProof?.type.startsWith("image/") ? (
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <Icon
                          icon="solar:document-text-linear"
                          className="text-3xl text-slate-400"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 dark:text-white text-sm truncate">
                        {paymentProof?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {((paymentProof?.size || 0) / 1024).toFixed(0)} KB • Klik
                        untuk ganti
                      </p>
                    </div>
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-2xl text-green-500"
                    />
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Icon
                      icon="solar:cloud-upload-linear"
                      className="text-4xl text-slate-400 mb-2 mx-auto"
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">
                      <span className="text-primary-600 dark:text-primary-400 font-semibold">
                        Klik untuk upload
                      </span>{" "}
                      atau drag file ke sini
                    </p>
                    <p className="text-xs text-slate-400">
                      JPG, PNG, atau PDF (Maks. 2MB)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-400 text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-xl disabled:shadow-none"
            >
              {loading ? (
                <>
                  <Icon
                    icon="solar:refresh-linear"
                    className="text-xl animate-spin"
                  />
                  Mengirim...
                </>
              ) : (
                <>
                  <Icon icon="solar:send-square-linear" className="text-xl" />
                  Kirim Pendaftaran
                </>
              )}
            </button>

            <p className="text-center text-xs text-slate-400 dark:text-slate-500">
              Dengan mendaftar, Anda menyetujui{" "}
              <a
                href="/syarat-ketentuan"
                className="text-primary-500 hover:underline"
              >
                Syarat & Ketentuan
              </a>{" "}
              dan{" "}
              <a
                href="/kebijakan-privasi"
                className="text-primary-500 hover:underline"
              >
                Kebijakan Privasi
              </a>{" "}
              kami.
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
