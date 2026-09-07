import React from 'react';
import { User, School, Calendar, Hash, ShieldCheck, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';

interface StudentIdentityCardProps {
  profile: StudentProfile;
  onUpdateProfile?: (updated: StudentProfile) => void;
  title?: string;
  subtitle?: string;
  badgeText?: string;
}

export const StudentIdentityCard: React.FC<StudentIdentityCardProps> = ({
  profile,
  onUpdateProfile,
  title = 'Identitas Peserta Didik',
  subtitle = 'Isi nama dan nomor absen Anda untuk perekaman nilai dan progres belajar.',
  badgeText = 'Wajib Diisi'
}) => {
  const handleChange = (field: keyof StudentProfile, value: string) => {
    if (!onUpdateProfile) return;
    onUpdateProfile({
      ...profile,
      [field]: value
    });
  };

  const kelasOptions = [
    'X-1', 'X-2', 'X-3', 'X-4', 'X-5',
    'X-6', 'X-7', 'X-8', 'X-9', 'X-10'
  ];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-indigo-800/40 space-y-4 animate-in fade-in duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-indigo-900/60 pb-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600/80 flex items-center justify-center text-white text-sm shrink-0">
            <User className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                {title}
              </h3>
              <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                {badgeText}
              </span>
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="text-left sm:text-right text-[11px] text-indigo-200 font-medium">
          <span>🏫 {profile.sekolah || 'SMA NEGERI 1 TEJAKULA'}</span>
        </div>
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Nama Siswa */}
        <div className="space-y-1 sm:col-span-2 lg:col-span-2">
          <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <User className="w-3 h-3 text-amber-400" />
            <span>Nama Lengkap Siswa *</span>
          </label>
          <input
            type="text"
            value={profile.nama}
            onChange={(e) => handleChange('nama', e.target.value)}
            placeholder="Ketik nama lengkap Anda..."
            className="w-full px-3.5 py-2.5 text-xs font-bold text-white bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-amber-400 rounded-xl focus:ring-2 focus:ring-amber-400/30 focus:outline-none transition placeholder-slate-400"
          />
        </div>

        {/* Kelas */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <School className="w-3 h-3 text-amber-400" />
            <span>Kelas *</span>
          </label>
          <select
            value={profile.kelas}
            onChange={(e) => handleChange('kelas', e.target.value)}
            className="w-full px-3 py-2.5 text-xs font-bold text-white bg-slate-800 border border-white/20 focus:border-amber-400 rounded-xl focus:ring-2 focus:ring-amber-400/30 focus:outline-none transition cursor-pointer"
          >
            {kelasOptions.map((k) => (
              <option key={k} value={k} className="bg-slate-900 text-white font-semibold">
                Kelas {k}
              </option>
            ))}
          </select>
        </div>

        {/* Nomor Absen */}
        <div className="space-y-1">
          <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
            <Hash className="w-3 h-3 text-amber-400" />
            <span>Nomor Absen *</span>
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={profile.noAbsen}
            onChange={(e) => handleChange('noAbsen', e.target.value)}
            placeholder="Absen"
            className="w-full px-3.5 py-2.5 text-xs font-bold text-white bg-white/10 hover:bg-white/15 focus:bg-white/20 border border-white/20 focus:border-amber-400 rounded-xl focus:ring-2 focus:ring-amber-400/30 focus:outline-none transition placeholder-slate-400"
          />
        </div>
      </div>

      {/* Info strip */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-indigo-900/50 text-[11px] text-slate-300">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-300 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Data aktif terhubung ke Rekap Penilaian Guru
          </span>
        </div>
        <div className="text-slate-400">
          Guru Pengampu: <strong className="text-white font-semibold">{profile.namaGuru}</strong>
        </div>
      </div>
    </div>
  );
};
