import React, { useState } from 'react';
import {
  BookOpen,
  Heart,
  Brain,
  Users,
  Activity,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  ArrowDown,
  Droplets,
  Apple,
  Moon,
  Smile,
  ShieldCheck,
  Send
} from 'lucide-react';

interface MateriSectionProps {
  onGoToComponents: () => void;
  onGoToActivity: () => void;
}

export const MateriSection: React.FC<MateriSectionProps> = ({
  onGoToComponents,
  onGoToActivity
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'pengertian' | 'manfaat' | 'kesehatan'>('pengertian');

  // Interactive Question 1 state
  const [selectedBigBodyAnswer, setSelectedBigBodyAnswer] = useState<string | null>(null);

  // Interactive Activity "Pilih Manfaatnya"
  const [selectedBenefitActivity, setSelectedBenefitActivity] = useState<string | null>(null);

  // Case Study Andi answers
  const [andiQ1, setAndiQ1] = useState('');
  const [andiQ2, setAndiQ2] = useState('');
  const [andiQ3, setAndiQ3] = useState('');
  const [showAndiSolution, setShowAndiSolution] = useState(false);
  const [caseStudySaved, setCaseStudySaved] = useState(false);

  const handleSaveCaseStudy = () => {
    setCaseStudySaved(true);
    setShowAndiSolution(true);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header and Sub Navigation */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
              <BookOpen className="w-4 h-4" />
              Materi Pembelajaran PJOK Kelas X
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Konsep Pokok Kebugaran Jasmani & Kesehatan
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Pahami esensi kebugaran, manfaat holistik, dan hubungannya dengan pola hidup sehat
            </p>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
            <button
              type="button"
              onClick={() => setActiveSubTab('pengertian')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'pengertian'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              1. Pengertian
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('manfaat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'manfaat'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2. Manfaat
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('kesehatan')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeSubTab === 'kesehatan'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              3. Kebugaran & Kesehatan
            </button>
          </div>
        </div>
      </div>

      {/* SUB TAB 1: PENGERTIAN KEBUGARAN JASMANI */}
      {activeSubTab === 'pengertian' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Core Definition Card */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <span className="inline-block bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Definisi PJOK Kelas X
              </span>
              <h3 className="text-xl sm:text-2xl font-black leading-snug">
                Apa itu Kebugaran Jasmani?
              </h3>
              <p className="text-sm sm:text-base text-blue-50 leading-relaxed font-medium">
                <strong className="text-white font-bold underline decoration-amber-400 decoration-2 underline-offset-4">
                  Kebugaran jasmani
                </strong>{' '}
                adalah kemampuan seseorang untuk melakukan aktivitas sehari-hari secara{' '}
                <span className="text-amber-300 font-bold">efektif dan efisien</span> tanpa
                mengalami kelelahan yang berlebihan serta{' '}
                <span className="text-amber-300 font-bold">masih memiliki cadangan energi</span>{' '}
                untuk melakukan aktivitas lainnya (seperti rekreasi, berolahraga, atau keperluan darurat).
              </p>
            </div>
          </div>

          {/* Real Life Student Example */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Contoh Nyata Kebugaran pada Peserta Didik
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Seorang peserta didik di SMA Negeri 1 Tejakula yang memiliki kebugaran jasmani yang baik mampu menjalani rutinitas harian dengan lancar:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {[
                { icon: '🚲', text: 'Berjalan kaki atau bersepeda ke sekolah' },
                { icon: '⚽', text: 'Aktif penuh semangat saat jam pelajaran PJOK' },
                { icon: '🏸', text: 'Bermain olahraga sore bersama teman' },
                { icon: '🧹', text: 'Membantu pekerjaan orang tua di rumah' },
                { icon: '📚', text: 'Belajar dan fokus mengerjakan tugas di malam hari' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50/60 rounded-xl p-3.5 border border-blue-200/80 text-center flex flex-col items-center justify-center space-y-2 hover:bg-blue-100/50 transition"
                >
                  <div className="text-3xl">{item.icon}</div>
                  <p className="text-xs font-semibold text-blue-900 leading-snug">{item.text}</p>
                </div>
              ))}
            </div>
            <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-900 font-semibold text-center">
              ✨ Kunci utamanya: Melakukan semua kegiatan di atas tanpa merasa loyo, lemas, atau kehabisan tenaga!
            </div>
          </div>

          {/* Visual Comparison: Siswa Kurang Bugar vs Siswa Bugar */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
              ⚖️ Perbandingan Visual: Peserta Didik Kurang Bugar vs Bugar
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kurang Bugar */}
              <div className="bg-rose-50/80 rounded-2xl p-5 border border-rose-200 space-y-3">
                <div className="flex items-center space-x-2 text-rose-700 font-black text-sm">
                  <span className="text-xl">😫</span>
                  <h5>Peserta Didik Kurang Bugar</h5>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[10px] font-bold shrink-0">✕</span>
                    <span><strong>Mudah lelah</strong> saat berjalan atau naik tangga sekolah</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[10px] font-bold shrink-0">✕</span>
                    <span><strong>Cepat kehilangan energi</strong> dan mengantuk di kelas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[10px] font-bold shrink-0">✕</span>
                    <span><strong>Mudah kehabisan tenaga</strong> saat baru berolahraga sebentar</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center text-[10px] font-bold shrink-0">✕</span>
                    <span><strong>Aktivitas fisik terbatas</strong> dan cenderung pasif (mager)</span>
                  </li>
                </ul>
              </div>

              {/* Bugar */}
              <div className="bg-emerald-50/80 rounded-2xl p-5 border border-emerald-200 space-y-3">
                <div className="flex items-center space-x-2 text-emerald-700 font-black text-sm">
                  <span className="text-xl">💪</span>
                  <h5>Peserta Didik Bugar</h5>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span><strong>Memiliki energi lebih stabil</strong> sepanjang hari</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span><strong>Tubuh siap beraktivitas</strong> tanpa keluhan pegal berlebih</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span><strong>Daya tahan kardiorespirasi lebih baik</strong>, napas teratur</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0">✓</span>
                    <span><strong>Fokus & konsentrasi belajar terjaga</strong> hingga malam hari</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Question: Tubuh Besar vs Bugar */}
          <div className="bg-amber-50 rounded-2xl p-6 border border-amber-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-amber-900 font-extrabold text-sm">
              <HelpCircle className="w-5 h-5 text-amber-600" />
              <h4>Pertanyaan Interaktif Pemantik Berpikir</h4>
            </div>
            <p className="text-sm text-slate-800 font-bold">
              “Menurutmu, apakah seseorang yang bertubuh besar atau kekar pasti memiliki kebugaran jasmani yang baik?”
            </p>

            <div className="flex flex-wrap gap-3">
              {['Ya', 'Tidak', 'Belum tentu'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setSelectedBigBodyAnswer(option)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition border ${
                    selectedBigBodyAnswer === option
                      ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-xs'
                      : 'bg-white text-slate-700 border-amber-300 hover:bg-amber-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {selectedBigBodyAnswer && (
              <div className="p-4 rounded-xl bg-white border border-amber-300 animate-in fade-in duration-200 text-xs leading-relaxed space-y-2">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Jawaban yang paling tepat adalah:{' '}
                    <strong className="text-blue-700">Belum tentu!</strong>
                  </span>
                </div>
                <p className="text-slate-600">
                  💡 <strong>Penjelasan Edukatif:</strong> Kebugaran jasmani tidak ditentukan oleh ukuran atau bentuk tubuh bagian luar saja. Seseorang yang bertubuh besar atau berotot belum tentu memiliki daya tahan jantung dan paru-paru (kardiorespirasi) atau kelentukan yang baik. Begitu pun orang yang bertubuh kurus belum tentu tidak bugar. Kebugaran dinilai dari efisiensi fungsi organ fisiologis, kekuatan, kelenturan, dan daya tahan tubuhnya dalam beraktivitas.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB TAB 2: MANFAAT KEBUGARAN JASMANI */}
      {activeSubTab === 'manfaat' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Manfaat Tubuh */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xl">
                ❤️
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Manfaat Bagi Tubuh</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">❤️</span>
                  <span>Membantu menjaga kesehatan organ dalam secara optimal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">🫁</span>
                  <span>Meningkatkan efisiensi kerja pompa jantung dan kapasitas paru-paru.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">💪</span>
                  <span>Meningkatkan massa, kekuatan, dan daya tahan otot.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">🦴</span>
                  <span>Membantu menjaga kepadatan serta kekuatan tulang dan persendian.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-0.5">⚡</span>
                  <span>Menstimulasi metabolisme tubuh agar selalu berenergi.</span>
                </li>
              </ul>
            </div>

            {/* Manfaat Belajar */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl">
                🧠
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Manfaat dalam Belajar</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">🧠</span>
                  <span>Meningkatkan suplai oksigen ke otak, mempertajam konsentrasi.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">🎯</span>
                  <span>Membuat peserta didik lebih siap dan sigap menerima materi baru.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">😌</span>
                  <span>Mengurangi rasa kantuk dan rasa cepat jenuh saat belajar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">📚</span>
                  <span>Mendukung produktivitas tugas sekolah dan ekstrakurikuler.</span>
                </li>
              </ul>
            </div>

            {/* Manfaat Sosial & Mental */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xl">
                🤝
              </div>
              <h4 className="font-extrabold text-slate-900 text-sm">Manfaat Sosial & Mental</h4>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">🤝</span>
                  <span>Meningkatkan kemampuan kerja sama, empati, dan sportivitas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">😊</span>
                  <span>Membangun citra tubuh positif dan meningkatkan rasa percaya diri.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">🏆</span>
                  <span>Melatih disiplin waktu, komitmen latihan, dan tanggung jawab.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">🔥</span>
                  <span>Meredakan stres emosional dan memupuk semangat pantang menyerah.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Aktivitas Mini: Pilih Manfaatnya! */}
          <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl p-6 border border-blue-200 space-y-4">
            <div className="flex items-center gap-2 text-indigo-900 font-extrabold text-sm">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h4>Aktivitas Interaktif: “Pilih Manfaatnya!”</h4>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-100 space-y-2">
              <p className="text-xs font-bold text-blue-800 uppercase tracking-wider">Aktivitas Studi:</p>
              <p className="text-sm font-extrabold text-slate-900">
                🚴 “Bersepeda Santai ke Sekolah Secara Rutin (20 Menit Setiap Hari)”
              </p>
              <p className="text-xs text-slate-600">
                Menurutmu, apa manfaat utama yang paling sesuai dengan aktivitas tersebut?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { id: 'a1', label: 'Meningkatkan daya tahan jantung dan paru-paru (kardiorespirasi)' },
                { id: 'a2', label: 'Menguatkan otot tungkai kaki dan sendi lutut' },
                { id: 'a3', label: 'Melatih keseimbangan dan koordinasi penglihatan' },
                { id: 'a4', label: 'Semua manfaat di atas berhubungan tergantung intensitas bersepeda' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedBenefitActivity(opt.id)}
                  className={`p-3 rounded-xl text-left text-xs font-semibold border transition ${
                    selectedBenefitActivity === opt.id
                      ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-blue-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {selectedBenefitActivity && (
              <div className="p-4 rounded-xl bg-white border border-emerald-300 animate-in fade-in duration-200 text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>
                    Tepat Sekali! Aktivitas fisik multifaset memiliki manfaat komprehensif.
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Bersepeda adalah latihan aerobik siklik yang melatih pompa jantung, memperkuat otot paha/betis, sekaligus mengasah refleks navigasi dan keseimbangan statis-dinamis.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SUB TAB 3: HUBUNGAN KEBUGARAN DENGAN KESEHATAN */}
      {activeSubTab === 'kesehatan' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Flow Diagram */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider text-center">
              Diagram Alur Hubungan Kebugaran Jasmani dengan Kesehatan
            </h4>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 py-2">
              <div className="w-full md:w-52 bg-blue-50 border border-blue-200 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">🏃‍♂️</div>
                <div className="text-xs font-black text-blue-900">AKTIVITAS FISIK</div>
                <div className="text-[10px] text-blue-600">Bergerak secara rutin & terarah</div>
              </div>

              <div className="text-blue-500 font-bold rotate-90 md:rotate-0 text-lg">➔</div>

              <div className="w-full md:w-52 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">📈</div>
                <div className="text-xs font-black text-emerald-900">KEBUGARAN MENINGKAT</div>
                <div className="text-[10px] text-emerald-600">Kekuatan & daya tahan terlatih</div>
              </div>

              <div className="text-emerald-500 font-bold rotate-90 md:rotate-0 text-lg">➔</div>

              <div className="w-full md:w-52 bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">⚡</div>
                <div className="text-xs font-black text-amber-900">TUBUH SIAP BERAKTIVITAS</div>
                <div className="text-[10px] text-amber-600">Efisien & tidak mudah lelah</div>
              </div>

              <div className="text-amber-500 font-bold rotate-90 md:rotate-0 text-lg">➔</div>

              <div className="w-full md:w-52 bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-center">
                <div className="text-xl mb-1">❤️</div>
                <div className="text-xs font-black text-indigo-900">MENDUKUNG KESEHATAN</div>
                <div className="text-[10px] text-indigo-600">Imunitas tinggi & kualitas hidup</div>
              </div>
            </div>
          </div>

          {/* Holistic Healthy Lifestyle Circular Cards */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                🌟 Pilar Gaya Hidup Sehat Holistik
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Kebugaran dan kesehatan memiliki hubungan erat, namun kesehatan tidak semata-mata dipengaruhi oleh olahraga saja.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                { icon: '🏃', label: 'Aktivitas Fisik', desc: 'Olahraga rutin teratur' },
                { icon: '🥗', label: 'Pola Makan Bergizi', desc: 'Gizi seimbang & sarapan' },
                { icon: '😴', label: 'Istirahat Cukup', desc: 'Tidur 7-8 jam per hari' },
                { icon: '💧', label: 'Konsumsi Air', desc: 'Minimal 2 liter per hari' },
                { icon: '🧘', label: 'Kesehatan Mental', desc: 'Kelola stres & rileks' },
                { icon: '🚭', label: 'Hindari Zat Berbahaya', desc: 'Bebas rokok & alkohol' }
              ].map((pilar, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 hover:bg-emerald-50/60 p-3 rounded-xl border border-slate-200 text-center transition"
                >
                  <div className="text-2xl mb-1">{pilar.icon}</div>
                  <div className="text-xs font-bold text-slate-800">{pilar.label}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{pilar.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Studi Kasus: Andi */}
          <div className="bg-white rounded-2xl p-6 border border-blue-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-blue-900 font-extrabold text-sm">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <h4>Studi Kasus Pembelajaran</h4>
            </div>

            <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              📖 <strong>Situasi Kasus:</strong> “Andi adalah seorang siswa kelas X yang sangat rajin berolahraga futsal dan jogging 3 kali seminggu. Namun, belakangan ini Andi sering begadang hingga pukul 02.00 dini hari karena bermain game di ponsel, dan ia hampir tidak pernah sarapan pagi saat berangkat ke sekolah.”
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  1. Apakah kebiasaan Andi sudah mendukung kesehatan secara optimal? Jelaskan alasanmu!
                </label>
                <textarea
                  value={andiQ1}
                  onChange={(e) => setAndiQ1(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tuliskan analisismu di sini..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  2. Apa saja hal yang perlu diperbaiki oleh Andi agar tubuhnya tetap sehat dan bugar?
                </label>
                <textarea
                  value={andiQ2}
                  onChange={(e) => setAndiQ2(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tuliskan rekomendasi perbaikan untuk Andi..."
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  3. Mengapa kebugaran jasmani dan pola hidup sehat harus berjalan bersama-sama?
                </label>
                <textarea
                  value={andiQ3}
                  onChange={(e) => setAndiQ3(e.target.value)}
                  rows={2}
                  className="w-full p-2.5 text-xs text-slate-800 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Tuliskan kesimpulan hubungan keduanya..."
                />
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveCaseStudy}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Simpan & Tampilkan Pembahasan Guru</span>
                </button>
              </div>

              {showAndiSolution && (
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 animate-in fade-in duration-200 text-xs space-y-2 mt-3">
                  <div className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Pembahasan & Umpan Balik Edukatif dari Guru PJOK:
                  </div>
                  <ul className="space-y-1.5 text-slate-700">
                    <li>
                      <strong>1. Belum Optimal:</strong> Olahraga merangsang pemecahan jaringan otot dan pengeluaran energi. Jika tidak diimbangi pemulihan (istirahat dan gizi), tubuh akan mengalami katabolisme dan kelelahan kronis.
                    </li>
                    <li>
                      <strong>2. Hal yang Perlu Diperbaiki:</strong> Mengatur jadwal tidur (maksimal pukul 22.00 agar dapat tidur 7-8 jam), selalu sarapan bernutrisi sebelum berangkat ke sekolah untuk pasokan glukosa otak, dan membatasi screen-time malam hari.
                    </li>
                    <li>
                      <strong>3. Sinergi:</strong> Kebugaran adalah mesin penggerak tubuh, sedangkan pola hidup sehat adalah bahan bakar dan perawatan mesinnya. Keduanya harus selaras agar tubuh berdaya tahan tinggi dan terhindar dari penyakit degeneratif.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Footer Navigation within Materi */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          type="button"
          onClick={onGoToComponents}
          className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-sm transition"
        >
          <span>Lanjut ke 9 Komponen Kebugaran Jasmani 🧩</span>
        </button>
        <button
          type="button"
          onClick={onGoToActivity}
          className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition"
        >
          <span>Langsung ke Praktik Lapangan 🏃</span>
        </button>
      </div>
    </div>
  );
};
