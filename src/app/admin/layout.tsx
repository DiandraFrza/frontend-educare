"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { AdminProvider, useAdmin } from "@/contexts/AdminContext";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAdmin();
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname.startsWith("/admin/login");

  useEffect(() => {
    if (!isLoading && !user && !isLoginPage) {
      router.push("/admin/login");
    }
  }, [isLoading, user, isLoginPage, router]);

  // Login page: render children directly without sidebar
  if (isLoginPage) return <>{children}</>;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">
        <Icon icon="solar:refresh-linear" className="text-4xl text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  const menuItems = [
    { href: "/admin", icon: "solar:chart-2-linear", label: "Dashboard" },
    { href: "/admin/registrations", icon: "solar:clipboard-list-linear", label: "Pendaftaran" },
    { href: "/admin/courses", icon: "solar:book-2-linear", label: "Kelas" },
    { href: "/admin/certificates", icon: "solar:diploma-linear", label: "Sertifikat" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`flex flex-col fixed lg:sticky top-0 h-screen inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform lg:transform-none ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <Link href="/admin" className="flex items-center gap-3">
<img src="/images/logo/logo-e.png" alt="Educare Academy Logo" className="h-12 w-auto" />
            {/* <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-sm">EDU</div> */}
            <div>
              <p className="font-bold text-slate-800 dark:text-white text-sm">Educare</p>
              <p className="text-xs text-slate-500">Admin Panel</p>
            </div>
          </Link>
        </div>

        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                pathname === item.href
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  : "text-slate-600 dark:text-slate-300 hover:bg-primary-50 dark:hover:bg-slate-700 hover:text-primary-600 dark:hover:text-primary-400"
              }`}
            >
              <Icon icon={item.icon} className="text-xl" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0 bg-white dark:bg-slate-800 w-full">
          <div className="flex items-center gap-3 mb-3 px-2">
            <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
              <Icon icon="solar:user-bold" className="text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
          <button
            onClick={() => { logout(); router.push("/admin/login"); }}
            className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
          >
            <Icon icon="solar:logout-2-linear" className="text-lg" />
            Keluar
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 sm:px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-primary-600 rounded-lg">
            <Icon icon="solar:hamburger-menu-linear" className="text-xl" />
          </button>
          <div className="flex-1" />
          <Link href="/" target="_blank" className="text-sm text-slate-500 dark:text-slate-400 hover:text-primary-600 flex items-center gap-1">
            <Icon icon="solar:link-round-linear" />
            Lihat Situs
          </Link>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
