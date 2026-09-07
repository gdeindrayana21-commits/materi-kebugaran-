import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  MessageSquareHeart,
  Send,
  CheckCircle2,
  Lock,
  User,
  Sparkles,
  Heart,
  Smile,
  Megaphone,
  ThumbsUp
} from 'lucide-react';
import { StudentFeedbackItem, StudentProfile } from '../types';
import { StudentIdentityCard } from './StudentIdentityCard';

interface StudentVoiceSectionProps {
  profile: StudentProfile;
  feedbackList: StudentFeedbackItem[];
  onSubmitFeedback: (item: StudentFeedbackItem) => void;
  onGoToTeacherDashboard?: () => void;
  onUpdateProfile?: (profile: StudentProfile) => void;
}

export const StudentVoiceSection: React.FC<StudentVoiceSectionProps> = ({
  profile,
  feedbackList,
  onSubmitFeedback,
  onGoToTeacherDashboard,
  onUpdateProfile
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [funMaterial, setFunMaterial] = useState('');
  const [difficultPart, setDifficultPart] = useState('');
  const [atmosphere, setAtmosphere] = useState<StudentFeedbackItem['atmosphere']>('🎉 Sangat Menyenangkan');
  const [suggestedActivity, setSuggestedActivity] = useState('');
  const [messageToTeacher, setMessageToTeacher] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newFeedback: StudentFeedbackItem = {
      id: `fb-${Date.now()}`,
      studentName: profile.nama,
      kelas: profile.kelas,
      isAnonymous,
      funMaterial: funMaterial || 'Praktik Sirkuit 6 Pos & Game Cocokkan',
      difficultPart: difficultPart || 'Menghafal perbedaan reaksi dan kelincahan',
      atmosphere,
      suggestedActivity: suggestedActivity || 'Permainan estafet kebugaran berkelompok',
      messageToTeacher: messageToTeacher || 'Pembelajarannya seru sekali Pak/Bu Guru!',
      timestamp: new Date().toLocaleString('id-ID', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    onSubmitFeedback(newFeedback);
    setSubmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      // fallback
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <MessageSquareHeart className="w-4 h-4" />
            <span>Suara Peserta Didik (Umpan Balik Pembelajaran PJOK)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            💬 Suara Siswa untuk Pembelajaran PJOK
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Sampaikan pengalaman belajar, usulan aktivitas seru, serta saran untuk Bapak/Ibu Guru pengampu.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl">
          <span>Total Aspirasi Terkumpul:</span>
          <span className="font-extrabold text-blue-600">{feedbackList.length}</span>
        </div>
      </div>

      {/* Identitas Peserta Didik Card */}
      <StudentIdentityCard
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        title="Identitas Peserta Didik (Suara Siswa)"
        subtitle="Isi/periksa nama dan kelas Anda untuk menyampaikan aspirasi belajar (dapat memilih mode anonim jika ingin)."
        badgeText="Identitas"
      />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Feedback Form */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-in zoom-in-95 duration-200">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  ✨
                </div>
                <h3 className="text-lg font-black text-emerald-950">
                  Terima Kasih Atas Suaramu!
                </h3>
                <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed max-w-md mx-auto font-medium">
                  “Terima kasih telah memberikan masukan! Suaramu sangat berharga untuk membuat pembelajaran PJOK berikutnya lebih seru, bermakna, dan menyenangkan!”
                </p>
                <div className="pt-3">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
                  >
                    Kirim Umpan Balik Lainnya
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Mode Pengirim: Nama vs Anonim */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    {isAnonymous ? (
                      <Lock className="w-5 h-5 text-indigo-600" />
                    ) : (
                      <User className="w-5 h-5 text-blue-600" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-slate-900">
                        {isAnonymous ? 'Mode Anonim (Rahasia)' : `Atas Nama: ${profile.nama}`}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        {isAnonymous
                          ? 'Nama dan identitasmu tidak akan ditampilkan pada guru.'
                          : `Kelas ${profile.kelas} - ${profile.sekolah}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex bg-white p-1 rounded-xl border border-slate-300">
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(false)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                        !isAnonymous
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Tampilkan Nama
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAnonymous(true)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                        isAnonymous
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Anonim
                    </button>
                  </div>
                </div>

                {/* 1. Materi yang paling menyenangkan */}
                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-800">
                    1. Materi atau aktivitas apa yang paling menyenangkan bagimu hari ini?
                  </label>
                  <input
                    type="text"
                    required
                    value={funMaterial}
                    onChange={(e) => setFunMaterial(e.target.value)}
                    placeholder="Contoh: Praktik 6 Pos Latihan dan Game Cocokkan Komponen"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* 2. Bagian paling sulit dipahami */}
                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-800">
                    2. Bagian pembelajaran mana yang dirasa paling menantang atau sulit dipahami?
                  </label>
                  <input
                    type="text"
                    required
                    value={difficultPart}
                    onChange={(e) => setDifficultPart(e.target.value)}
                    placeholder="Contoh: Membedakan daya tahan kardiorespirasi dan kekuatan otot"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* 3. Suasana Pembelajaran */}
                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-800">
                    3. Bagaimana suasana pembelajaran PJOK hari ini menurutmu?
                  </label>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {[
                      '🎉 Sangat Menyenangkan',
                      '😊 Menyenangkan',
                      '😐 Biasa Saja',
                      '😴 Kurang Menarik'
                    ].map((atm) => (
                      <button
                        key={atm}
                        type="button"
                        onClick={() => setAtmosphere(atm as any)}
                        className={`p-2.5 rounded-xl font-bold text-xs border text-left transition ${
                          atmosphere === atm
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {atm}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 4. Usulan Aktivitas */}
                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-800">
                    4. Usulan aktivitas olahraga / permainan untuk pertemuan berikutnya:
                  </label>
                  <input
                    type="text"
                    required
                    value={suggestedActivity}
                    onChange={(e) => setSuggestedActivity(e.target.value)}
                    placeholder="Contoh: Games estafet kelincahan bola berkelompok di lapangan"
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* 5. Pesan untuk Guru */}
                <div className="space-y-1 text-xs">
                  <label className="block font-bold text-slate-800">
                    5. Pesan atau saran khusus untuk Bapak/Ibu Guru pengampu:
                  </label>
                  <textarea
                    rows={2}
                    value={messageToTeacher}
                    onChange={(e) => setMessageToTeacher(e.target.value)}
                    placeholder="Tuliskan apresiasi, saran fasilitas, atau ide latihan lainnya..."
                    className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black rounded-xl text-xs shadow-md transition flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirimkan Aspirasi Saya ke Guru 🚀</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right: Feed of Aspirations (14B Dashboard) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Megaphone className="w-4 h-4 text-amber-500" />
                Aspirasi Rekan Peserta Didik
              </h3>
              <span className="text-[11px] text-slate-400">Terbaru</span>
            </div>

            <div className="space-y-3 max-h-[520px] overflow-y-auto pr-1">
              {feedbackList.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 hover:bg-blue-50/50 p-4 rounded-2xl border border-slate-200/80 transition space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-[10px]">
                        {item.isAnonymous ? '🤫' : '👤'}
                      </span>
                      <span className="font-extrabold text-slate-900">
                        {item.isAnonymous ? 'Peserta Didik (Anonim)' : item.studentName}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1">
                    <p>
                      <strong className="text-slate-700">Aktivitas Favorit:</strong>{' '}
                      {item.funMaterial}
                    </p>
                    <p>
                      <strong className="text-slate-700">Suasana:</strong>{' '}
                      <span className="bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded">
                        {item.atmosphere}
                      </span>
                    </p>
                    <p>
                      <strong className="text-slate-700">Usulan Lanjutan:</strong>{' '}
                      {item.suggestedActivity}
                    </p>
                    <p className="italic text-slate-700 bg-white p-2 rounded-lg border border-slate-200/60 mt-1">
                      “{item.messageToTeacher}”
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
