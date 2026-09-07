import React from 'react';
import {
  Play,
  BookOpen,
  Dumbbell,
  FileText,
  CheckCircle,
  Award,
  BarChart2,
  Sparkles,
  Heart,
  Activity,
  Flame,
  Zap,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { StudentProfile, LearningObjective } from '../types';

interface HeroSectionProps {
  profile: StudentProfile;
  onNavigate?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  onStartLearning?: () => void;
  onOpenProfile?: () => void;
  objectives?: LearningObjective[];
  onToggleObjective?: (id: number) => void;
  completedSteps?: Record<string, boolean>;
  quizScore?: number;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onNavigate,
  onSelectTab,
  onStartLearning,
  onOpenProfile,
  objectives = [],
  onToggleObjective,
  completedSteps,
  quizScore
}) => {
  const navigate = onNavigate || onSelectTab || (() => {});
  const handleOpenProfile = onOpenProfile || (() => {});
  const handleToggleObj = onToggleObjective || (() => {});

  const safeObjectives = Array.isArray(objectives) ? objectives : [];
  const completedObjectivesCount = safeObjectives.filter((o) => o?.completed).length;
  const totalObjCount = safeObjectives.length || 1;
  const objectiveProgress = Math.round((completedObjectivesCount / totalObjCount) * 100);

  const learningSteps = [
    { step: 1, label: 'BELAJAR', icon: '📖', desc: 'Konsep dasar' },
    { step: 2, label: 'MENGAMATI', icon: '👀', desc: 'Studi visual' },
    { step: 3, label: 'MEMAHAMI', icon: '💡', desc: 'Komponen bugar' },
    { step: 4, label: 'MENGANALISIS', icon: '🔍', desc: 'Studi kasus' },
    { step: 5, label: 'MELAKUKAN', icon: '🏃', desc: 'Praktik sirkuit' },
    { step: 6, label: 'MEREFLEKSIKAN', icon: '🪞', desc: 'Evaluasi diri' },
    { step: 7, label: 'BERKEMBANG', icon: '🌱', desc: 'Target hidup sehat' },
  ];

  return (
    <div className="space-y-10 pb-8">
      {/* Hero Banner with Modern Sporty Gradients & Silhouettes */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-700 via-indigo-700 to-emerald-600 text-white shadow-xl p-6 sm:p-10 lg:p-12 border border-blue-400/20">
        {/* Subtle decorative background circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-20 w-72 h-72 rounded-full bg-emerald-400/15 blur-2xl pointer-events-none" />
        <div className="absolute -left-10 bottom-0 w-60 h-60 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Title, Quote, Badges */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-400 text-slate-900 uppercase tracking-wide shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                PJOK KELAS X • FASE E
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-white backdrop-blur-xs border border-white/20">
                🏫 {profile.sekolah}
              </span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                🏃‍♂️ KEBUGARAN JASMANI
              </h1>
              <p className="text-xl sm:text-2xl font-bold text-amber-300">
                “Bergerak Hari Ini, Bugar Setiap Hari!”
              </p>
              <p className="text-sm sm:text-base text-blue-100 italic max-w-2xl font-medium">
                “Tubuh Bugar, Pikiran Segar, Prestasi Gemilang”
              </p>
            </div>

            {/* Motivational Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/20 max-w-2xl">
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-normal">
                💬 <strong className="font-semibold text-white">Prinsip Kebugaran:</strong> “Kebugaran jasmani bukan tentang menjadi yang paling kuat, tetapi tentang memiliki tubuh yang mampu menjalani aktivitas sehari-hari dengan sehat, efektif, dan penuh energi tanpa kelelahan yang berlebihan.”
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <button
                id="cta-mulai-belajar"
                type="button"
                onClick={() => navigate('materi')}
                className="group relative inline-flex items-center space-x-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-sm sm:text-base shadow-xl shadow-amber-500/30 hover:shadow-2xl hover:shadow-amber-400/50 hover:-translate-y-1 active:translate-y-0 active:scale-95 transition-all duration-200 border-2 border-amber-200/90 ring-4 ring-amber-400/25"
              >
                <span className="w-8 h-8 rounded-xl bg-slate-950 text-amber-300 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:rotate-6 transition-transform">
                  <Play className="w-4 h-4 fill-amber-300 ml-0.5" />
                </span>
                <span className="tracking-wide font-black uppercase">MULAI BELAJAR</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-950/10 text-slate-900 text-[10px] font-black uppercase tracking-wider">
                  FASE E
                </span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-1.5 transition-transform" />
              </button>
              <button
                type="button"
                onClick={() => navigate('materi')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 hover:-translate-y-0.5 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/25 shadow-sm transition-all active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-amber-300" />
                <span>📚 MATERI</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('aktivitas')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 hover:-translate-y-0.5 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/25 shadow-sm transition-all active:scale-95"
              >
                <Dumbbell className="w-4 h-4 text-emerald-300" />
                <span>💪 AKTIVITAS</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('lkm')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 hover:-translate-y-0.5 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/25 shadow-sm transition-all active:scale-95"
              >
                <FileText className="w-4 h-4 text-blue-300" />
                <span>📝 LKM</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('evaluasi')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 hover:-translate-y-0.5 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/25 shadow-sm transition-all active:scale-95"
              >
                <CheckCircle className="w-4 h-4 text-purple-300" />
                <span>🎯 EVALUASI</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('refleksi-diri')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 hover:-translate-y-0.5 text-white font-bold text-xs sm:text-sm backdrop-blur-md border border-white/25 shadow-sm transition-all active:scale-95"
              >
                <Award className="w-4 h-4 text-pink-300" />
                <span>🪞 REFLEKSI</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('unduh')}
                className="flex items-center space-x-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-0.5 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-emerald-600/30 transition-all border border-emerald-300/40 active:scale-95"
              >
                <BarChart2 className="w-4 h-4 text-emerald-100" />
                <span>📊 HASIL BELAJAR</span>
              </button>
            </div>
          </div>

          {/* Right Column: Learning Module Information & Activity Stats */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl p-5 border border-white/25 shadow-lg space-y-3.5">
              <div className="flex items-center justify-between border-b border-white/15 pb-2.5">
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-300">
                  Modul Ajar PJOK
                </span>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 border border-emerald-300/30 px-2 py-0.5 rounded-full font-bold">
                  Fase E • Kelas X
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-blue-100">Satuan Pendidikan:</span>
                  <span className="font-bold text-white text-right">SMA Negeri 1 Tejakula</span>
                </div>
                <div className="flex justify-between items-center bg-white/10 px-2.5 py-1.5 rounded-lg border border-white/15">
                  <span className="text-blue-100 font-medium">Guru PJOK:</span>
                  <span className="font-extrabold text-amber-300 flex items-center gap-1">
                    👨‍🏫 {profile.namaGuru || 'Gde Bayu Indrayana, S.Pd.'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-100">Tahun Pelajaran:</span>
                  <span className="font-medium text-white">{profile.tahunPelajaran}</span>
                </div>
              </div>

              {/* Informative Note for Identity Filling */}
              <div className="bg-amber-400/20 border border-amber-300/40 rounded-xl p-3 text-[11px] text-amber-100 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-300">
                  <span>💡 Petunjuk Pengisian Data:</span>
                </div>
                <p className="leading-relaxed">
                  Peserta didik hanya perlu mengisi identitas saat mengerjakan <strong>LKM</strong>, <strong>Evaluasi</strong>, <strong>Refleksi Diri</strong>, atau <strong>Suara Siswa</strong>.
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/15">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-blue-100 font-semibold">Tujuan Pembelajaran Tercapai:</span>
                  <span className="font-extrabold text-amber-300">{completedObjectivesCount}/{safeObjectives.length} ({objectiveProgress}%)</span>
                </div>
                <div className="w-full h-2 bg-black/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-300"
                    style={{ width: `${objectiveProgress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Fitness Stats Grid */}
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                <div className="text-xl mb-1">💪</div>
                <div className="text-xs font-bold text-white">9 Komponen</div>
                <div className="text-[10px] text-blue-200">Kebugaran Jasmani</div>
              </div>
              <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3 border border-white/15">
                <div className="text-xl mb-1">🏋️</div>
                <div className="text-xs font-bold text-white">6 Pos Sirkuit</div>
                <div className="text-[10px] text-blue-200">Praktik Lapangan</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Flow Architecture: BELAJAR → MENGAMATI → MEMAHAMI → MENGANALISIS → MELAKUKAN → MEREFLEKSIKAN → BERKEMBANG */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              Alur Pembelajaran Interaktif PJOK
            </h2>
            <p className="text-xs text-slate-500">
              Ikuti setiap tahapan secara terarah untuk hasil belajar maksimal
            </p>
          </div>
          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 w-fit">
            Kurikulum Merdeka SMA Kelas X
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {learningSteps.map((s, idx) => (
            <div
              key={s.step}
              className="relative bg-slate-50 hover:bg-blue-50/50 rounded-xl p-3 border border-slate-200 text-center transition group hover:border-blue-300"
            >
              <div className="text-2xl mb-1 group-hover:scale-110 transition-transform">{s.icon}</div>
              <div className="text-[11px] font-extrabold text-blue-900">{s.label}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">{s.desc}</div>
              {idx < learningSteps.length - 1 && (
                <div className="hidden lg:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 text-slate-300 text-xs">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 4. TUJUAN PEMBELAJARAN (Interactive Checklist with Progress) */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Target Ketercapaian
            </span>
            <h2 className="text-lg font-extrabold text-slate-900">
              🎯 Tujuan Pembelajaran Kebugaran Jasmani
            </h2>
            <p className="text-xs text-slate-500">
              Centang tujuan yang telah kamu capai selama proses belajar
            </p>
          </div>
          <div className="flex items-center space-x-3 bg-emerald-50 px-3.5 py-2 rounded-xl border border-emerald-200">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <div>
              <div className="text-xs font-bold text-emerald-900">
                {completedObjectivesCount} dari {safeObjectives.length} Tercapai
              </div>
              <div className="w-28 h-1.5 bg-emerald-200 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all duration-300"
                  style={{ width: `${objectiveProgress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {safeObjectives.map((obj) => (
            <div
              key={obj.id}
              onClick={() => handleToggleObj(obj.id)}
              className={`flex items-start space-x-3 p-3.5 rounded-xl border cursor-pointer transition ${
                obj.completed
                  ? 'bg-emerald-50/80 border-emerald-300 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200'
              }`}
            >
              <div
                className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition ${
                  obj.completed
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-slate-300 bg-white'
                }`}
              >
                {obj.completed && <Check className="w-3.5 h-3.5" />}
              </div>
              <div className="text-xs leading-relaxed">
                <span className="font-bold text-slate-800 mr-1.5">Tujuan {obj.id}:</span>
                <span className={obj.completed ? 'text-emerald-900 font-medium' : 'text-slate-600'}>
                  {obj.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 10 Topik Pembelajaran Grid */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-3">
          📚 10 Topik Utama Media Pembelajaran:
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
          {[
            { no: 1, title: 'Pengertian Kebugaran', tab: 'materi' },
            { no: 2, title: 'Manfaat Kebugaran', tab: 'materi' },
            { no: 3, title: 'Hubungan Kesehatan', tab: 'materi' },
            { no: 4, title: 'Komponen Kebugaran', tab: 'komponen' },
            { no: 5, title: 'Aktivitas Latihan Sirkuit', tab: 'aktivitas' },
            { no: 6, title: 'Lembar Kerja Siswa (LKM)', tab: 'lkm' },
            { no: 7, title: 'Evaluasi Pembelajaran', tab: 'evaluasi' },
            { no: 8, title: 'Refleksi Diri Siswa', tab: 'refleksi-diri' },
            { no: 9, title: 'Suara Siswa untuk Guru', tab: 'suara-siswa' },
            { no: 10, title: 'Rekapitulasi & Unduh', tab: 'unduh' },
          ].map((item) => (
            <button
              key={item.no}
              type="button"
              onClick={() => onNavigate(item.tab)}
              className="flex items-center space-x-2.5 p-3 rounded-xl bg-white border border-slate-200 text-left hover:border-blue-400 hover:shadow-xs transition"
            >
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center shrink-0">
                {item.no}
              </span>
              <span className="text-xs font-semibold text-slate-700 hover:text-blue-700">
                {item.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
