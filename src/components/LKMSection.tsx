import React, { useState } from 'react';
import {
  FileText,
  Save,
  CheckCircle2,
  Download,
  Printer,
  Plus,
  Trash2,
  HelpCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { LKMData, StudentProfile } from '../types';
import { StudentIdentityCard } from './StudentIdentityCard';

interface LKMSectionProps {
  profile: StudentProfile;
  initialLKM: LKMData;
  onSaveLKM: (data: LKMData) => void;
  onGoToEvaluation: () => void;
  onUpdateProfile?: (profile: StudentProfile) => void;
}

export const LKMSection: React.FC<LKMSectionProps> = ({
  profile,
  initialLKM,
  onSaveLKM,
  onGoToEvaluation,
  onUpdateProfile
}) => {
  const [lkm, setLkm] = useState<LKMData>(initialLKM);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleK1Change = (field: keyof LKMData['kegiatan1'], val: string) => {
    setLkm((prev) => ({
      ...prev,
      kegiatan1: { ...prev.kegiatan1, [field]: val }
    }));
    setSavedSuccess(false);
  };

  const handleK2Change = (field: keyof LKMData['kegiatan2'], val: string) => {
    setLkm((prev) => ({
      ...prev,
      kegiatan2: { ...prev.kegiatan2, [field]: val }
    }));
    setSavedSuccess(false);
  };

  const handleK3Change = (index: number, field: 'komponen' | 'alasan', val: string) => {
    const updated = [...lkm.kegiatan3];
    updated[index] = { ...updated[index], [field]: val };
    setLkm((prev) => ({ ...prev, kegiatan3: updated }));
    setSavedSuccess(false);
  };

  const handleK4Change = (
    index: number,
    field: 'hari' | 'aktivitas' | 'durasi' | 'target',
    val: string
  ) => {
    const updated = [...lkm.kegiatan4];
    updated[index] = { ...updated[index], [field]: val };
    setLkm((prev) => ({ ...prev, kegiatan4: updated }));
    setSavedSuccess(false);
  };

  const handleAddK4Row = () => {
    setLkm((prev) => ({
      ...prev,
      kegiatan4: [
        ...prev.kegiatan4,
        { hari: 'Kamis', aktivitas: '', durasi: '20 menit', target: '' }
      ]
    }));
  };

  const handleRemoveK4Row = (index: number) => {
    if (lkm.kegiatan4.length <= 1) return;
    const updated = lkm.kegiatan4.filter((_, i) => i !== index);
    setLkm((prev) => ({ ...prev, kegiatan4: updated }));
  };

  const handleSave = () => {
    onSaveLKM(lkm);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4" />
            <span>Lembar Kerja Peserta Didik (LKM) Digital</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            📝 LKM Kebugaran Jasmani Kelas X
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Kerjakan rangkaian tugas observasi, analisis kasus, identifikasi komponen, dan rancangan aktivitas pribadi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan LKM</span>
          </button>
        </div>
      </div>

      {/* Identitas Peserta Didik Card */}
      <StudentIdentityCard
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        title="Identitas Peserta Didik LKM"
        subtitle="Isi/periksa nama dan nomor absen Anda sebelum mengerjakan lembar tugas ini."
        badgeText="Wajib Diisi"
      />

      {/* KEGIATAN 1 – MENGAMATI */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600">
            Tahap 1
          </span>
          <h3 className="text-base font-black text-slate-900">
            KEGIATAN 1 – MENGAMATI (OBSERVASI GERAK)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Amati 5 aktivitas: Push Up, Sit Up, Lari, Peregangan, dan Naik Turun Tangga.
          </p>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              1. Dari kelima aktivitas tersebut, aktivitas mana yang menurutmu paling membutuhkan kekuatan otot? Jelaskan!
            </label>
            <textarea
              value={lkm.kegiatan1.q1Kekuatan}
              onChange={(e) => handleK1Change('q1Kekuatan', e.target.value)}
              rows={2}
              placeholder="Jawabanmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              2. Aktivitas mana yang paling dominan membutuhkan daya tahan (endurance)? Mengapa demikian?
            </label>
            <textarea
              value={lkm.kegiatan1.q2DayaTahan}
              onChange={(e) => handleK1Change('q2DayaTahan', e.target.value)}
              rows={2}
              placeholder="Jawabanmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              3. Aktivitas mana yang memerlukan kelincahan saat berpindah posisi tubuh?
            </label>
            <textarea
              value={lkm.kegiatan1.q3Kelincahan}
              onChange={(e) => handleK1Change('q3Kelincahan', e.target.value)}
              rows={2}
              placeholder="Jawabanmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              4. Mengapa setiap manusia (terutama pelajar seperti kamu) memerlukan kebugaran jasmani yang baik?
            </label>
            <textarea
              value={lkm.kegiatan1.q4AlasanBugar}
              onChange={(e) => handleK1Change('q4AlasanBugar', e.target.value)}
              rows={2}
              placeholder="Jawabanmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* KEGIATAN 2 – MENGANALISIS */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-emerald-600">
            Tahap 2
          </span>
          <h3 className="text-base font-black text-slate-900">
            KEGIATAN 2 – MENGANALISIS KASUS KESEHATAN & KEBUGARAN
          </h3>
          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-slate-800 font-medium mt-2">
            “Dua peserta didik memiliki kemampuan akademik yang sama-sama baik. Namun, salah satu peserta didik sangat mudah merasa lelah ketika mengikuti aktivitas fisik maupun kegiatan ekstrakurikuler di sekolah.”
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-800 mb-1">
              1. Faktor-faktor apa saja yang mungkin memengaruhi kondisi peserta didik yang mudah lelah tersebut?
            </label>
            <textarea
              value={lkm.kegiatan2.q1Faktor}
              onChange={(e) => handleK2Change('q1Faktor', e.target.value)}
              rows={2}
              placeholder="Contoh: Kurang gerak, pola makan tidak seimbang, dehidrasi..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              2. Bagaimana hubungan antara aktivitas fisik teratur dengan peningkatan kebugaran jasmani?
            </label>
            <textarea
              value={lkm.kegiatan2.q2HubunganFisik}
              onChange={(e) => handleK2Change('q2HubunganFisik', e.target.value)}
              rows={2}
              placeholder="Jawabanmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-800 mb-1">
              3. Kebiasaan-kebiasaan sehat apa saja yang dapat kamu rekomendasikan untuk mendukung kebugaran jasmaninya?
            </label>
            <textarea
              value={lkm.kegiatan2.q3KebiasaanSehat}
              onChange={(e) => handleK2Change('q3KebiasaanSehat', e.target.value)}
              rows={2}
              placeholder="Jawabanmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* KEGIATAN 3 – MENGIDENTIFIKASI TABEL */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase tracking-wider text-amber-600">
            Tahap 3
          </span>
          <h3 className="text-base font-black text-slate-900">
            KEGIATAN 3 – MENGIDENTIFIKASI HUBUNGAN AKTIVITAS & KOMPONEN
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Lengkapi tabel di bawah dengan menyebutkan komponen kebugaran serta alasan ilmiahnya.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase border border-slate-200">
                <th className="p-3 w-1/4">Aktivitas</th>
                <th className="p-3 w-1/3">Komponen Kebugaran Terkait</th>
                <th className="p-3">Alasan / Penjelasan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border border-slate-200">
              {lkm.kegiatan3.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-3 font-black text-slate-900 bg-slate-50/50">
                    {row.aktivitas}
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.komponen}
                      onChange={(e) => handleK3Change(idx, 'komponen', e.target.value)}
                      placeholder="Contoh: Kekuatan otot..."
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.alasan}
                      onChange={(e) => handleK3Change(idx, 'alasan', e.target.value)}
                      placeholder="Alasan gerakan..."
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* KEGIATAN 4 – RENCANA AKTIVITAS DIRI */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-rose-600">
              Tahap 4
            </span>
            <h3 className="text-base font-black text-slate-900">
              KEGIATAN 4 – RENCANA AKTIVITAS KEBUGARAN PRIBADI (1 MINGGU)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5 italic">
              “Buatlah rencana aktivitas yang realistis, sesuai kemampuan, dan dapat dilakukan secara konsisten.”
            </p>
          </div>
          <button
            type="button"
            onClick={handleAddK4Row}
            className="flex items-center space-x-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-300 rounded-lg font-bold text-xs transition w-fit"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Jadwal</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-slate-700 font-extrabold uppercase border border-slate-200">
                <th className="p-3 w-28">Hari</th>
                <th className="p-3">Bentuk Aktivitas Latihan</th>
                <th className="p-3 w-32">Durasi</th>
                <th className="p-3">Target / Harapan Pribadi</th>
                <th className="p-3 w-16 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 border border-slate-200">
              {lkm.kegiatan4.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50 transition">
                  <td className="p-2">
                    <select
                      value={row.hari}
                      onChange={(e) => handleK4Change(idx, 'hari', e.target.value)}
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-800 bg-white"
                    >
                      <option value="Senin">Senin</option>
                      <option value="Selasa">Selasa</option>
                      <option value="Rabu">Rabu</option>
                      <option value="Kamis">Kamis</option>
                      <option value="Jumat">Jumat</option>
                      <option value="Sabtu">Sabtu</option>
                      <option value="Minggu">Minggu</option>
                    </select>
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.aktivitas}
                      onChange={(e) => handleK4Change(idx, 'aktivitas', e.target.value)}
                      placeholder="Contoh: Jogging santai & peregangan"
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.durasi}
                      onChange={(e) => handleK4Change(idx, 'durasi', e.target.value)}
                      placeholder="20-30 menit"
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="text"
                      value={row.target}
                      onChange={(e) => handleK4Change(idx, 'target', e.target.value)}
                      placeholder="Badan segar, tidak ngantuk di sekolah"
                      className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <button
                      type="button"
                      onClick={() => handleRemoveK4Row(idx)}
                      disabled={lkm.kegiatan4.length <= 1}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded transition disabled:opacity-30"
                      title="Hapus baris"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Save & Navigation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-xl text-xs shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Lembar Kerja (LKM)</span>
          </button>
          {savedSuccess && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              LKM Berhasil Disimpan!
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onGoToEvaluation}
          className="flex items-center space-x-1.5 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
        >
          <span>Lanjut ke Evaluasi Pembelajaran (Kuis & Uraian) ➔</span>
        </button>
      </div>
    </div>
  );
};
