import Link from 'next/link';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon icon="solar:document-missing-bold" className="text-4xl text-slate-400" />
        </div>
        <h2 className="text-2xl font-display font-bold text-secondary-900 dark:text-white mb-3">
          Sertifikat Tidak Ditemukan
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-6">
          Sertifikat yang Anda cari tidak ada dalam database kami. 
          Pastikan ID sertifikat sudah benar.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/sertifikasi"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondary-900 text-white rounded-xl font-semibold hover:bg-secondary-800 transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" />
            Kembali ke Daftar
          </Link>
          <a
            href="https://wa.me/6288210372698"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-semibold hover:bg-slate-50 transition-colors"
          >
            <Icon icon="tabler:brand-whatsapp" />
            Hubungi Kami
          </a>
        </div>
      </div>
    </div>
  );
}
