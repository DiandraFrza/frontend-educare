"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAdminApi } from "@/contexts/AdminContext";
import toast from "react-hot-toast";

interface Registration {
  id: number;
  registration_number: string;
  full_name: string;
  institution: string;
  phone: string;
  email: string;
  info_source: string;
  payment_proof: string;
  payment_proof_url?: string;
  status: string;
  notes: string;
  created_at: string;
  courses: Array<{ id: number; title: string; price: number }>;
}

export default function AdminRegistrations() {
  const apiFetch = useAdminApi();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);
  const [updating, setUpdating] = useState(false);

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("status", statusFilter);
    params.set("per_page", "50");

    const res = await apiFetch(`/admin/registrations?${params}`);
    const data = await res.json();
    setRegistrations(data.data || []);
    setLoading(false);
  }, [apiFetch, search, statusFilter]);

  useEffect(() => { fetchRegistrations(); }, [fetchRegistrations]);

  const updateStatus = async (id: number, status: string, notes?: string) => {
    setUpdating(true);
    try {
      const res = await apiFetch(`/admin/registrations/${id}/status`, {
        method: "PUT",
        body: JSON.stringify({ status, notes }),
      });
      if (res.ok) {
        toast.success(`Status diubah ke ${status}`);
        fetchRegistrations();
        setSelectedReg(null);
      }
    } catch {
      toast.error("Gagal mengubah status");
    }
    setUpdating(false);
  };

  const deleteRegistration = async (id: number) => {
    if (!confirm("Hapus pendaftaran ini?")) return;
    const res = await apiFetch(`/admin/registrations/${id}`, { method: "DELETE" });
    if (res.ok) {
      toast.success("Pendaftaran dihapus");
      fetchRegistrations();
    }
  };

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Kelola Pendaftaran</h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama, nomor daftar, telepon..."
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="all">Semua Status</option>
          <option value="pending">Pending</option>
          <option value="verified">Terverifikasi</option>
          <option value="rejected">Ditolak</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Icon icon="solar:refresh-linear" className="text-2xl text-primary-500 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-left bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">No. Daftar</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Nama</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400 hidden md:table-cell">Instansi</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400 hidden lg:table-cell">Kelas</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 font-mono text-xs text-primary-600 dark:text-primary-400">{reg.registration_number}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-700 dark:text-slate-200">{reg.full_name}</p>
                      <p className="text-xs text-slate-400">{reg.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 hidden md:table-cell">{reg.institution}</td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {reg.courses?.map((c) => (
                          <span key={c.id} className="px-2 py-0.5 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded text-xs">{c.title}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3">{statusBadge(reg.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setSelectedReg(reg)} className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20" title="Detail">
                          <Icon icon="solar:eye-linear" />
                        </button>
                        {reg.status === "pending" && (
                          <>
                            <button onClick={() => updateStatus(reg.id, "verified")} className="p-2 text-slate-400 hover:text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20" title="Verifikasi">
                              <Icon icon="solar:check-circle-linear" />
                            </button>
                            <button onClick={() => updateStatus(reg.id, "rejected")} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Tolak">
                              <Icon icon="solar:close-circle-linear" />
                            </button>
                          </>
                        )}
                        <button onClick={() => deleteRegistration(reg.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20" title="Hapus">
                          <Icon icon="solar:trash-bin-trash-linear" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {registrations.length === 0 && (
                  <tr><td colSpan={6} className="text-center py-12 text-slate-400">Tidak ada pendaftaran</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedReg && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedReg(null)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-slate-800 dark:text-white">Detail Pendaftaran</h3>
              <button onClick={() => setSelectedReg(null)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg"><Icon icon="solar:close-circle-linear" className="text-xl" /></button>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-slate-500">No. Daftar</span><span className="font-mono text-primary-600 dark:text-primary-400">{selectedReg.registration_number}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Nama</span><span className="font-medium text-slate-700 dark:text-slate-200">{selectedReg.full_name}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Instansi</span><span className="text-slate-700 dark:text-slate-200">{selectedReg.institution}</span></div>
              <div className="flex justify-between"><span className="text-slate-500">Telepon</span><span className="text-slate-700 dark:text-slate-200">{selectedReg.phone}</span></div>
              {selectedReg.email && <div className="flex justify-between"><span className="text-slate-500">Email</span><span className="text-slate-700 dark:text-slate-200">{selectedReg.email}</span></div>}
              <div className="flex justify-between"><span className="text-slate-500">Sumber Info</span><span className="text-slate-700 dark:text-slate-200 capitalize">{selectedReg.info_source}</span></div>
              <div className="flex justify-between items-center"><span className="text-slate-500">Status</span>{statusBadge(selectedReg.status)}</div>
              <div>
                <p className="text-slate-500 mb-2">Kelas Dipilih:</p>
                <div className="space-y-1">
                  {selectedReg.courses?.map((c) => (
                    <div key={c.id} className="flex justify-between bg-slate-50 dark:bg-slate-700/50 px-3 py-2 rounded-lg">
                      <span className="text-slate-700 dark:text-slate-200">{c.title}</span>
                      <span className="text-primary-600 dark:text-primary-400 font-medium">Rp {c.price.toLocaleString("id-ID")}</span>
                    </div>
                  ))}
                </div>
              </div>

              {selectedReg.payment_proof_url && (
                <div className="mt-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                  <p className="text-slate-500 mb-2 flex justify-between items-center">
                    <span>Bukti Transfer:</span>
                    <a 
                      href={selectedReg.payment_proof_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-primary-500 hover:text-primary-600 flex items-center gap-1 bg-primary-50 dark:bg-primary-900/20 px-2 py-1 rounded"
                    >
                      <Icon icon="solar:maximize-square-minimalistic-linear" /> Lihat Penuh
                    </a>
                  </p>
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden flex items-center justify-center p-2 min-h-[150px]">
                    <img 
                      src={selectedReg.payment_proof_url} 
                      alt="Bukti Transfer" 
                      className="max-w-full max-h-[300px] object-contain rounded-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Gambar+Tidak+Tersedia';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-between mt-4 border-t border-slate-100 dark:border-slate-700 pt-4">
                <span className="text-slate-500">Tanggal Daftar</span>
                <span className="text-slate-700 dark:text-slate-200">{new Date(selectedReg.created_at).toLocaleString("id-ID")}</span>
              </div>
            </div>

            {selectedReg.status === "pending" && (
              <div className="flex gap-3 mt-6">
                <button disabled={updating} onClick={() => updateStatus(selectedReg.id, "verified")} className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-slate-400 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  <Icon icon="solar:check-circle-linear" /> Verifikasi
                </button>
                <button disabled={updating} onClick={() => updateStatus(selectedReg.id, "rejected")} className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-slate-400 text-white py-2.5 rounded-xl font-semibold text-sm transition-colors">
                  <Icon icon="solar:close-circle-linear" /> Tolak
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
