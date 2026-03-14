"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useAdminApi } from "@/contexts/AdminContext";
import toast from "react-hot-toast";

interface Course {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  sessions: number;
  quota: number;
  schedule: string;
  time: string;
  level: string;
  category: string;
  instructor: string;
  rating: number;
  students: number;
  is_popular: boolean;
  is_active: boolean;
}

export default function AdminCourses() {
  const apiFetch = useAdminApi();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    title: "", description: "", price: 0, sessions: 10, quota: 10,
    schedule: "Selasa & Jumat", time: "19.00 - Selesai",
    level: "semua", category: "akuntansi", instructor: "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTrr",
  });

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("per_page", "50");
    const res = await apiFetch(`/admin/courses?${params}`);
    const data = await res.json();
    setCourses(data.data || []);
    setLoading(false);
  }, [apiFetch, search]);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  const openAdd = () => {
    setEditCourse(null);
    setFormData({ title: "", description: "", price: 0, sessions: 10, quota: 10, schedule: "Selasa & Jumat", time: "19.00 - Selesai", level: "semua", category: "akuntansi", instructor: "M. Aziz Andriansyah, S.Pd., Gr., CAAT., CAP., CTTrr" });
    setShowForm(true);
  };

  const openEdit = (course: Course) => {
    setEditCourse(course);
    setFormData({ title: course.title, description: course.description, price: course.price, sessions: course.sessions, quota: course.quota, schedule: course.schedule || "", time: course.time || "", level: course.level, category: course.category, instructor: course.instructor });
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      if (editCourse) {
        const res = await apiFetch(`/admin/courses/${editCourse.id}`, { method: "PUT", body: JSON.stringify(formData) });
        if (res.ok) { toast.success("Kelas diupdate"); fetchCourses(); setShowForm(false); }
      } else {
        const res = await apiFetch("/admin/courses", { method: "POST", body: JSON.stringify(formData) });
        if (res.ok) { toast.success("Kelas ditambahkan"); fetchCourses(); setShowForm(false); }
        else { const data = await res.json(); toast.error(data.message || "Gagal menambahkan kelas"); }
      }
    } catch { toast.error("Terjadi kesalahan"); }
  };

  const deleteCourse = async (id: number) => {
    if (!confirm("Hapus kelas ini?")) return;
    const res = await apiFetch(`/admin/courses/${id}`, { method: "DELETE" });
    if (res.ok) { toast.success("Kelas dihapus"); fetchCourses(); }
  };

  const levelLabels: Record<string, string> = { pemula: "Pemula", menengah: "Menengah", mahir: "Mahir", semua: "Semua Level" };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Kelola Kelas</h1>
        <button onClick={openAdd} className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-primary-700 transition-colors">
          <Icon icon="solar:add-circle-linear" /> Tambah Kelas
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 relative">
        <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari kelas..." className="w-full sm:w-80 pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 text-slate-800 dark:text-white" />
      </div>

      {/* Course Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16"><Icon icon="solar:refresh-linear" className="text-3xl text-primary-500 animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 shadow-sm">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2.5 py-1 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded-lg text-xs font-semibold capitalize">{course.category}</span>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(course)} className="p-1.5 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20"><Icon icon="solar:pen-linear" /></button>
                  <button onClick={() => deleteCourse(course.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Icon icon="solar:trash-bin-trash-linear" /></button>
                </div>
              </div>
              <h3 className="font-semibold text-slate-800 dark:text-white mb-1 line-clamp-2">{course.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">{levelLabels[course.level]} • {course.sessions} Pertemuan</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary-600 dark:text-primary-400">Rp {course.price.toLocaleString("id-ID")}</span>
                <span className={`text-xs font-semibold ${course.is_active ? "text-green-600" : "text-slate-400"}`}>{course.is_active ? "Aktif" : "Nonaktif"}</span>
              </div>
            </div>
          ))}
          {courses.length === 0 && <p className="col-span-full text-center py-12 text-slate-400">Tidak ada kelas</p>}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-4">{editCourse ? "Edit Kelas" : "Tambah Kelas Baru"}</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Judul Kelas *</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Deskripsi *</label>
                <textarea rows={3} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Harga (Rp) *</label>
                  <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Pertemuan *</label>
                  <input type="number" value={formData.sessions} onChange={(e) => setFormData({ ...formData, sessions: Number(e.target.value) })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Level</label>
                  <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="pemula">Pemula</option><option value="menengah">Menengah</option><option value="mahir">Mahir</option><option value="semua">Semua Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Kategori</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                    <option value="akuntansi">Akuntansi</option><option value="accurate">Accurate</option><option value="pajak">Pajak</option><option value="excel">Excel</option><option value="umkm">UMKM</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">Instruktur</label>
                <input type="text" value={formData.instructor} onChange={(e) => setFormData({ ...formData, instructor: e.target.value })} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500" />
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
