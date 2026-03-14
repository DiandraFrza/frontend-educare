"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAdminApi } from "@/contexts/AdminContext";

interface DashboardStats {
  total_registrations: number;
  pending_registrations: number;
  verified_registrations: number;
  rejected_registrations: number;
  total_courses: number;
  total_certificates: number;
  active_certificates: number;
  recent_registrations: Array<{
    id: number;
    registration_number: string;
    full_name: string;
    status: string;
    created_at: string;
  }>;
}

export default function AdminDashboard() {
  const apiFetch = useAdminApi();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch("/dashboard/stats")
      .then((res) => res.json())
      .then((data) => { setStats(data.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [apiFetch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Icon icon="solar:refresh-linear" className="text-3xl text-primary-500 animate-spin" />
      </div>
    );
  }

  const statCards = [
    { icon: "solar:clipboard-list-bold", label: "Total Pendaftaran", value: stats?.total_registrations || 0, color: "bg-blue-500" },
    { icon: "solar:clock-circle-bold", label: "Pending", value: stats?.pending_registrations || 0, color: "bg-amber-500" },
    { icon: "solar:check-circle-bold", label: "Terverifikasi", value: stats?.verified_registrations || 0, color: "bg-green-500" },
    { icon: "solar:close-circle-bold", label: "Ditolak", value: stats?.rejected_registrations || 0, color: "bg-red-500" },
    { icon: "solar:book-2-bold", label: "Kelas Aktif", value: stats?.total_courses || 0, color: "bg-purple-500" },
    { icon: "solar:diploma-bold", label: "Sertifikat", value: stats?.total_certificates || 0, color: "bg-teal-500" },
  ];

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      verified: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      rejected: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    const labels: Record<string, string> = { pending: "Pending", verified: "Terverifikasi", rejected: "Ditolak" };
    return <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[status] || ""}`}>{labels[status] || status}</span>;
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className={`w-10 h-10 ${card.color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon icon={card.icon} className="text-white text-xl" />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{card.value}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Registrations */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-800 dark:text-white flex items-center gap-2">
            <Icon icon="solar:clipboard-list-linear" className="text-primary-500" />
            Pendaftaran Terbaru
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 text-left">
                <th className="px-4 sm:px-6 py-3 text-slate-500 dark:text-slate-400 font-medium">No. Daftar</th>
                <th className="px-4 sm:px-6 py-3 text-slate-500 dark:text-slate-400 font-medium">Nama</th>
                <th className="px-4 sm:px-6 py-3 text-slate-500 dark:text-slate-400 font-medium">Status</th>
                <th className="px-4 sm:px-6 py-3 text-slate-500 dark:text-slate-400 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {stats?.recent_registrations?.map((reg) => (
                <tr key={reg.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 sm:px-6 py-3 font-mono text-xs text-primary-600 dark:text-primary-400">{reg.registration_number}</td>
                  <td className="px-4 sm:px-6 py-3 text-slate-700 dark:text-slate-200 font-medium">{reg.full_name}</td>
                  <td className="px-4 sm:px-6 py-3">{statusBadge(reg.status)}</td>
                  <td className="px-4 sm:px-6 py-3 text-slate-500 dark:text-slate-400">{new Date(reg.created_at).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
              {(!stats?.recent_registrations || stats.recent_registrations.length === 0) && (
                <tr><td colSpan={4} className="text-center py-8 text-slate-400">Belum ada pendaftaran</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
