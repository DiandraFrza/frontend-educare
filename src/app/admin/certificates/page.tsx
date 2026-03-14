"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAdminApi } from "@/contexts/AdminContext";
import toast from "react-hot-toast";

interface Certificate {
  id: number;
  certificate_number: string;
  template_type: string;
  holder_name: string;
  holder_institution: string;
  competency_title: string;
  issue_date: string;
  expiry_date: string;
  issuer_name: string;
  issuer_title: string;
  category: string;
  status: string;
  skills: string[];
  director_signature?: string | null;
  manager_signature?: string | null;
  participant_photo?: string | null;
}

export default function AdminCertificates() {
  const apiFetch = useAdminApi();
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editCert, setEditCert] = useState<Certificate | null>(null);

  const [formData, setFormData] = useState({
    certificate_number: "", template_type: "simple", holder_name: "",
    competency_title: "", issue_date: "", issuer_name: "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTrr",
    issuer_title: "Direktur Utama", category: "general", status: "active", skills: [] as string[],
    director_signature: null as File | null, manager_signature: null as File | null, participant_photo: null as File | null,
  });

  const fetchCertificates = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (statusFilter !== "all") params.set("status", statusFilter);
    params.set("per_page", "50");
    const res = await apiFetch(`/admin/certificates?${params}`);
    const data = await res.json();
    setCertificates(data.data || []);
    setLoading(false);
  }, [apiFetch, search, statusFilter]);

  useEffect(() => { fetchCertificates(); }, [fetchCertificates]);

  const openAdd = () => {
    setEditCert(null);
    setFormData({
      certificate_number: "", template_type: "simple", holder_name: "",
      competency_title: "", issue_date: new Date().toISOString().split("T")[0],
      issuer_name: "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTrr",
      issuer_title: "Direktur Utama", category: "general", status: "active", skills: [],
      director_signature: null, manager_signature: null, participant_photo: null,
    });
    setShowForm(true);
  };

  const openEdit = (cert: Certificate) => {
    setEditCert(cert);
    setFormData({
      certificate_number: cert.certificate_number, template_type: cert.template_type,
      holder_name: cert.holder_name, competency_title: cert.competency_title,
      issue_date: cert.issue_date ? cert.issue_date.split("T")[0] : "",
      issuer_name: cert.issuer_name, issuer_title: cert.issuer_title,
      category: cert.category, status: cert.status, skills: cert.skills || [],
      director_signature: null, manager_signature: null, participant_photo: null, // Don't pre-fill files
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null) {
          if (key === 'skills' && Array.isArray(value)) {
             value.forEach((v: string) => fd.append('skills[]', v));
          } else {
             fd.append(key, value as string | Blob);
          }
        }
      });

      if (editCert) {
        fd.append('_method', 'PUT'); // Laravel spoofing for multipart/form-data PUT
        const res = await apiFetch(`/admin/certificates/${editCert.id}`, { method: "POST", body: fd });
        if (res.ok) { toast.success("Sertifikat diupdate"); fetchCertificates(); setShowForm(false); }
        else { const data = await res.json(); toast.error(data.message || "Gagal update sertifikat"); }
      } else {
        const res = await apiFetch("/admin/certificates", { method: "POST", body: fd });
        if (res.ok) { toast.success("Sertifikat dibuat"); fetchCertificates(); setShowForm(false); }
        else { const data = await res.json(); toast.error(data.message || "Gagal membuat sertifikat"); }
      }
    } catch { toast.error("Terjadi kesalahan"); }
  };

  const deleteCert = async (id: number) => {
    if (!confirm("Hapus sertifikat ini?")) return;
    const res = await apiFetch(`/admin/certificates/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Sertifikat dihapus"); fetchCertificates(); }
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      expired: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      revoked: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };
    const labels: Record<string, string> = { active: "Aktif", expired: "Expired", revoked: "Dicabut" };
    return <span className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${styles[status] || ""}`}>{labels[status] || status}</span>;
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Kelola Sertifikat</h1>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">
          <Icon icon="solar:add-circle-linear" /> Buat Sertifikat
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 relative">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari nama, nomor sertifikat..." className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary-500">
          <option value="all">Semua Status</option>
          <option value="active">Aktif</option>
          <option value="expired">Expired</option>
          <option value="revoked">Dicabut</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16"><Icon icon="solar:refresh-linear" className="text-2xl text-primary-500 animate-spin" /></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-left bg-slate-50 dark:bg-slate-700/50">
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Nomor</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Pemegang</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400 hidden md:table-cell">Kompetensi</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400 hidden lg:table-cell">Tanggal</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {certificates.map((cert) => (
                  <tr key={cert.id} className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="px-4 py-3 font-mono text-xs text-primary-600 dark:text-primary-400">{cert.certificate_number}</td>
                    <td className="px-4 py-3 font-medium text-slate-700 dark:text-slate-200">{cert.holder_name}</td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 hidden md:table-cell">{cert.competency_title}</td>
                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 hidden lg:table-cell">{cert.issue_date ? new Date(cert.issue_date).toLocaleDateString("id-ID") : "-"}</td>
                    <td className="px-4 py-3">{statusBadge(cert.status)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button onClick={() => openEdit(cert)} className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"><Icon icon="solar:pen-linear" /></button>
                        <button onClick={() => deleteCert(cert.id)} className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Icon icon="solar:trash-bin-trash-linear" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {certificates.length === 0 && <tr><td colSpan={6} className="text-center py-12 text-slate-400">Tidak ada sertifikat</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">{editCert ? "Edit Sertifikat" : "Buat Sertifikat Baru"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Nomor Sertifikat *</label>
                <input type="text" value={formData.certificate_number} onChange={(e) => setFormData({ ...formData, certificate_number: e.target.value })} placeholder="EDU/CLS/2026/xxx" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Template</label>
                  <select value={formData.template_type} onChange={(e) => setFormData({ ...formData, template_type: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="simple">Simple</option><option value="formal">Formal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="active">Aktif</option><option value="expired">Expired</option><option value="revoked">Dicabut</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Nama Pemegang *</label>
                  <input type="text" value={formData.holder_name} onChange={(e) => setFormData({ ...formData, holder_name: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Pas Foto Peserta (Opsional)</label>
                  {editCert?.participant_photo && !formData.participant_photo && (
                    <img src={editCert.participant_photo.startsWith('http') ? editCert.participant_photo : `http://localhost:8000${editCert.participant_photo}`} alt="Foto Peserta" className="h-10 mb-2 object-contain rounded" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, participant_photo: e.target.files?.[0] || null })} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Judul Kompetensi *</label>
                <input type="text" value={formData.competency_title} onChange={(e) => setFormData({ ...formData, competency_title: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Tanggal Terbit *</label>
                <input type="date" value={formData.issue_date} onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Kategori</label>
                <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="general / teknisi-akuntansi / ..." className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Tanda Tangan Direktur Utama</label>
                  {editCert?.director_signature && !formData.director_signature && (
                    <img src={editCert.director_signature.startsWith('http') ? editCert.director_signature : `http://localhost:8000${editCert.director_signature}`} alt="TTD Director" className="h-10 mb-2 object-contain" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, director_signature: e.target.files?.[0] || null })} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Tanda Tangan Manager</label>
                  {editCert?.manager_signature && !formData.manager_signature && (
                    <img src={editCert.manager_signature.startsWith('http') ? editCert.manager_signature : `http://localhost:8000${editCert.manager_signature}`} alt="TTD Manager" className="h-10 mb-2 object-contain" />
                  )}
                  <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, manager_signature: e.target.files?.[0] || null })} className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" />
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="flex-1 py-2.5 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-xl font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-700">Batal</button>
              <button onClick={handleSave} className="flex-1 py-2.5 bg-primary-600 text-white rounded-xl font-semibold text-sm hover:bg-primary-700">Simpan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
