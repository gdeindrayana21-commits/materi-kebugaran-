import React, { useState } from 'react';
import {
  Award,
  Save,
  CheckCircle2,
  Star,
  Sparkles,
  ArrowRight,
  Heart,
  Target
} from 'lucide-react';
import { StudentSelfReflection, StudentProfile } from '../types';

interface SelfReflectionSectionProps {
  profile: StudentProfile;
  initialReflection: StudentSelfReflection;
  onSaveReflection: (data: StudentSelfReflection) => void;
  onGoToStudentVoice: () => void;
}

export const SelfReflectionSection: React.FC<SelfReflectionSectionProps> = ({
  profile,
  initialReflection,
  onSaveReflection,
  onGoToStudentVoice
}) => {
  const [reflection, setReflection] = useState<StudentSelfReflection>(initialReflection);
  const [isSaved, setIsSaved] = useState(false);

  const starLabels: Record<number, string> = {
    5: '⭐⭐⭐⭐⭐ “Saya memahami materi dengan sangat baik.”',
    4: '⭐⭐⭐⭐ “Saya memahami sebagian besar materi.”',
    3: '⭐⭐⭐ “Saya cukup memahami materi.”',
    2: '⭐⭐ “Saya masih membutuhkan bantuan.”',
    1: '⭐ “Saya perlu mempelajari kembali materi.”'
  };

  const handleSave = () => {
    onSaveReflection(reflection);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Refleksi Pembelajaran Bermakna</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🪞 Lembar Refleksi Diri Peserta Didik
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Merenungkan apa yang telah dipelajari, menilai kondisi kebugaran diri secara jujur, dan menetapkan komitmen pribadi.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="flex items-center space-x-1.5 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition w-fit"
        >
          <Save className="w-4 h-4" />
          <span>Simpan Refleksi Diri</span>
        </button>
      </div>

      {/* Skala Pemahaman Bintang (1 to 5) */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-xs space-y-4">
        <div>
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            ⭐ Skala Pemahaman Materi Hari Ini
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Pilih tingkat pemahaman yang paling merefleksikan proses belajarmu:
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <button
              key={stars}
              type="button"
              onClick={() => {
                setReflection((prev) => ({ ...prev, skalaPemahaman: stars }));
                setIsSaved(false);
              }}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold border transition text-left ${
                reflection.skalaPemahaman === stars
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs ring-2 ring-amber-300'
                  : 'bg-white text-slate-700 border-amber-200 hover:bg-amber-100/60'
              }`}
            >
              {starLabels[stars]}
            </button>
          ))}
        </div>
      </div>

      {/* 6 Pertanyaan Refleksi */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        {/* Q1 */}
        <div className="space-y-1.5 text-xs">
          <label className="block font-bold text-slate-800 text-sm">
            1. Apa pengetahuan atau wawasan baru yang saya peroleh hari ini tentang kebugaran jasmani?
          </label>
          <textarea
            value={reflection.q1PengetahuanBaru}
            onChange={(e) => {
              setReflection({ ...reflection, q1PengetahuanBaru: e.target.value });
              setIsSaved(false);
            }}
            rows={2}
            placeholder="Tuliskan hal paling berkesan yang baru kamu ketahui..."
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Q2 */}
        <div className="space-y-1.5 text-xs">
          <label className="block font-bold text-slate-800 text-sm">
            2. Dari 9 komponen kebugaran jasmani, komponen apa yang paling saya pahami dengan baik?
          </label>
          <input
            type="text"
            value={reflection.q2KomponenDipahami}
            onChange={(e) => {
              setReflection({ ...reflection, q2KomponenDipahami: e.target.value });
              setIsSaved(false);
            }}
            placeholder="Contoh: Kelincahan (Agility) dan Daya Tahan (Endurance)"
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Q3 */}
        <div className="space-y-1.5 text-xs">
          <label className="block font-bold text-slate-800 text-sm">
            3. Aktivitas atau pos latihan kebugaran apa yang paling menantang bagi tubuh saya?
          </label>
          <textarea
            value={reflection.q3AktivitasMenantang}
            onChange={(e) => {
              setReflection({ ...reflection, q3AktivitasMenantang: e.target.value });
              setIsSaved(false);
            }}
            rows={2}
            placeholder="Contoh: Pos 5 Lari bolak-balik karena menuntut kelincahan dan koordinasi kaki..."
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Q4 */}
        <div className="space-y-2 text-xs">
          <label className="block font-bold text-slate-800 text-sm">
            4. Bagaimana penilaian kondisi kebugaran jasmani diri saya saat ini?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { val: 'Sangat Baik', label: '😊 Sangat Baik' },
              { val: 'Baik', label: '🙂 Baik' },
              { val: 'Cukup', label: '😐 Cukup' },
              { val: 'Perlu Ditingkatkan', label: '💪 Perlu Ditingkatkan' }
            ].map((opt) => (
              <button
                key={opt.val}
                type="button"
                onClick={() => {
                  setReflection({ ...reflection, q4KondisiBugar: opt.val as any });
                  setIsSaved(false);
                }}
                className={`p-3 rounded-xl font-bold text-xs border transition ${
                  reflection.q4KondisiBugar === opt.val
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="pt-1">
            <label className="block text-[11px] font-semibold text-slate-600 mb-1">
              Alasan atas pilihan di atas:
            </label>
            <input
              type="text"
              value={reflection.q4Alasan}
              onChange={(e) => {
                setReflection({ ...reflection, q4Alasan: e.target.value });
                setIsSaved(false);
              }}
              placeholder="Berikan alasan jujur mengenai kondisi tubuhmu..."
              className="w-full p-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Q5 */}
        <div className="space-y-1.5 text-xs">
          <label className="block font-bold text-slate-800 text-sm">
            5. Kebiasaan sehat apa yang paling ingin saya tingkatkan untuk mendukung kebugaran jasmani?
          </label>
          <input
            type="text"
            value={reflection.q5KebiasaanDitingkatkan}
            onChange={(e) => {
              setReflection({ ...reflection, q5KebiasaanDitingkatkan: e.target.value });
              setIsSaved(false);
            }}
            placeholder="Contoh: Mengurangi begadang malam, rutin minum air putih, sarapan bergizi..."
            className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Q6 */}
        <div className="space-y-1.5 text-xs">
          <label className="block font-bold text-slate-800 text-sm flex items-center gap-1.5 text-emerald-800">
            <Target className="w-4 h-4 text-emerald-600" />
            6. Target pribadi saya setelah mengikuti pembelajaran Kebugaran Jasmani ini adalah:
          </label>
          <textarea
            value={reflection.q6TargetPribadi}
            onChange={(e) => {
              setReflection({ ...reflection, q6TargetPribadi: e.target.value });
              setIsSaved(false);
            }}
            rows={2}
            placeholder="Contoh: Berolahraga jogging 3 kali seminggu dan mampu push up 20 kali..."
            className="w-full p-3 border border-emerald-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-emerald-50/40"
          />
        </div>
      </div>

      {/* Save Action & Next Navigation */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Refleksi Diri</span>
          </button>
          {isSaved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Refleksi Diri Berhasil Disimpan!
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onGoToStudentVoice}
          className="flex items-center space-x-1.5 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
        >
          <span>Lanjut ke Suara Siswa untuk Guru (Umpan Balik) ➔</span>
        </button>
      </div>
    </div>
  );
};
