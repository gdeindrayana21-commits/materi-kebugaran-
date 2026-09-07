import React, { useState } from 'react';
import {
  BicepsFlexed,
  HeartPulse,
  Zap,
  Smile,
  Repeat,
  Scale,
  Sparkles,
  Flame,
  Timer,
  ChevronRight,
  ChevronLeft,
  ArrowLeft,
  Gamepad2,
  Dumbbell,
  BookOpen,
  CheckCircle2,
  Lightbulb,
  Award,
  ArrowRight
} from 'lucide-react';
import { FITNESS_COMPONENTS } from '../data/mockData';
import { FitnessComponent } from '../types';

interface ComponentsSectionProps {
  onPlayGame: () => void;
  onGoToWorkout: () => void;
}

export const ComponentsSection: React.FC<ComponentsSectionProps> = ({
  onPlayGame,
  onGoToWorkout
}) => {
  // If activeComponentId is null, show the grid of 9 components.
  // When a component is clicked, it immediately opens the full explanation view.
  const [activeComponentId, setActiveComponentId] = useState<string | null>(null);

  const getIcon = (iconName: string, className = 'w-6 h-6') => {
    switch (iconName) {
      case 'BicepsFlexed':
        return <BicepsFlexed className={className} />;
      case 'HeartPulse':
        return <HeartPulse className={className} />;
      case 'Zap':
        return <Zap className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      case 'Repeat':
        return <Repeat className={className} />;
      case 'Scale':
        return <Scale className={className} />;
      case 'Sparkles':
        return <Sparkles className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'Timer':
        return <Timer className={className} />;
      default:
        return <Sparkles className={className} />;
    }
  };

  const handleOpenDetail = (id: string) => {
    setActiveComponentId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setActiveComponentId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentIndex = FITNESS_COMPONENTS.findIndex((c) => c.id === activeComponentId);
  const currentComponent = currentIndex >= 0 ? FITNESS_COMPONENTS[currentIndex] : null;

  const prevComponent = currentIndex > 0 ? FITNESS_COMPONENTS[currentIndex - 1] : null;
  const nextComponent =
    currentIndex >= 0 && currentIndex < FITNESS_COMPONENTS.length - 1
      ? FITNESS_COMPONENTS[currentIndex + 1]
      : null;

  return (
    <div className="space-y-8 pb-10">
      {/* ---------------------------------------------------- */}
      {/* VIEW 1: GRID OF 9 COMPONENTS (LIST VIEW)           */}
      {/* ---------------------------------------------------- */}
      {!currentComponent && (
        <div className="space-y-8 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Materi Pokok Kurikulum PJOK Fase E Kelas X</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                9 Komponen Kebugaran Jasmani
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Pilih dan klik salah satu kartu komponen di bawah ini untuk langsung membaca penjelasan lengkap, konsep gerak, contoh latihan, dan aplikasinya dalam kehidupan sehari-hari.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onPlayGame}
                className="flex items-center space-x-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md shadow-amber-400/20 hover:-translate-y-0.5 transition-all active:scale-95 cursor-pointer"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Uji di Game Cocokkan 🎮</span>
              </button>
            </div>
          </div>

          {/* Prompt instruction badge */}
          <div className="flex items-center justify-between px-2 text-xs">
            <span className="font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse"></span>
              Daftar 9 Komponen (Klik Kartu untuk Membaca):
            </span>
            <span className="text-slate-500 font-semibold hidden sm:inline">
              9 Komponen Siap Dipelajari
            </span>
          </div>

          {/* 9 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FITNESS_COMPONENTS.map((item, index) => {
              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenDetail(item.id)}
                  className="group bg-white hover:bg-gradient-to-b hover:from-white hover:to-blue-50/50 rounded-3xl p-6 border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer hover:-translate-y-1 relative overflow-hidden"
                >
                  {/* Decorative background accent */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${item.gradient} opacity-5 group-hover:opacity-15 rounded-full blur-2xl transition-all duration-300 pointer-events-none`}
                  />

                  <div>
                    {/* Top Row: Icon & Number Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}
                      >
                        {getIcon(item.icon, 'w-7 h-7')}
                      </div>
                      <span className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-600 text-xs font-black flex items-center justify-center transition-colors">
                        {index + 1}
                      </span>
                    </div>

                    {/* Titles */}
                    <div className="mb-2.5">
                      <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
                        {item.englishName}
                      </span>
                    </div>

                    {/* Definition snippet */}
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {item.definition}
                    </p>

                    {/* Quick activities preview */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {item.activities.slice(0, 2).map((act, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 group-hover:bg-blue-100/60 text-slate-700 group-hover:text-blue-800 text-[11px] font-semibold transition-colors"
                        >
                          ✓ {act}
                        </span>
                      ))}
                      {item.activities.length > 2 && (
                        <span className="px-2 py-1 rounded-lg bg-slate-50 text-slate-400 text-[11px] font-semibold">
                          +{item.activities.length - 2} lagi
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Read detail button */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-blue-600 font-bold text-xs group-hover:text-blue-700">
                    <span>Baca Penjelasan Lengkap</span>
                    <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* VIEW 2: FULL DETAILED EXPLANATION VIEW               */}
      {/* ---------------------------------------------------- */}
      {currentComponent && (
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-200">
          {/* Sticky/Top Navigation: Back Button & Step indicator */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBackToList}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all active:scale-95 w-fit cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>← Kembali ke Daftar 9 Komponen</span>
            </button>

            <div className="flex items-center space-x-2 text-xs font-bold text-slate-600">
              <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg border border-blue-200">
                Komponen {currentIndex + 1} dari {FITNESS_COMPONENTS.length}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-900 font-extrabold">{currentComponent.name}</span>
            </div>
          </div>

          {/* Main Explanation Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-lg space-y-8">
            {/* Vibrant Hero Header of Component */}
            <div
              className={`rounded-3xl p-6 sm:p-8 text-white bg-gradient-to-r ${currentComponent.gradient} shadow-md space-y-4`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
                  {getIcon(currentComponent.icon, 'w-8 h-8')}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider bg-black/25 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-xs">
                    {currentComponent.englishName}
                  </span>
                  <span className="text-xs font-black bg-white text-slate-950 px-3 py-1.5 rounded-full shadow-xs">
                    Komponen #{currentIndex + 1}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-white/80 block mb-1">
                  Penjelasan Mendalam Komponen
                </span>
                <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  {currentComponent.name}
                </h2>
              </div>
            </div>

            {/* Bagian 1: Pengertian & Konsep */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-blue-600 font-extrabold text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>1. Pengertian & Definisi Konseptual</span>
              </div>
              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-5 sm:p-6 text-slate-800 leading-relaxed font-medium text-sm sm:text-base">
                <p>{currentComponent.definition}</p>
              </div>
            </div>

            {/* Bagian 2: Contoh Aktivitas Latihan di Sekolah & Rumah */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-emerald-600 font-extrabold text-xs uppercase tracking-wider">
                <Dumbbell className="w-4 h-4" />
                <span>2. Contoh Bentuk Latihan (Sekolah & Mandiri di Rumah)</span>
              </div>
              <p className="text-xs text-slate-600">
                Berikut ragam bentuk latihan fisik yang efektif untuk mengembangkan dan meningkatkan komponen {currentComponent.name}:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {currentComponent.activities.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-3 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl p-4 text-emerald-950 font-bold text-xs sm:text-sm shadow-xs"
                  >
                    <span className="w-7 h-7 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xs font-black shrink-0 shadow-xs">
                      {idx + 1}
                    </span>
                    <span>{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bagian 3: Contoh Nyata Kehidupan Sehari-hari */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 font-extrabold text-xs uppercase tracking-wider">
                <Lightbulb className="w-4 h-4" />
                <span>3. Aplikasi Nyata dalam Kehidupan Sehari-Hari & Olahraga</span>
              </div>
              <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5 sm:p-6 text-slate-800 leading-relaxed text-xs sm:text-sm font-medium">
                <p className="text-slate-900 font-bold mb-1">Kenapa komponen ini sangat penting?</p>
                <p>{currentComponent.lifeExample}</p>
              </div>
            </div>

            {/* Bagian 4: Kiat Latihan Aman & Manfaat Fisiologis */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 sm:p-6 border border-indigo-200/70 space-y-2 text-xs sm:text-sm text-indigo-950">
              <div className="flex items-center gap-2 font-black text-indigo-900 uppercase tracking-wider text-xs">
                <Award className="w-4 h-4 text-indigo-600" />
                <span>Prinsip Pembelajaran & Peningkatan Kebugaran</span>
              </div>
              <p className="leading-relaxed text-slate-700">
                Untuk meningkatkan <strong>{currentComponent.name}</strong> secara optimal, lakukan latihan secara bertahap dan teratur (minimal 2–3 kali per minggu) dengan memperhatikan prinsip beban bertambah (<em>progressive overload</em>) serta pemanasan dan pendinginan yang tepat.
              </p>
            </div>

            {/* -------------------------------------------------- */}
            {/* TOMBOL KEMBALI & NAVIGASI SELESAI MEMBACA          */}
            {/* -------------------------------------------------- */}
            <div className="pt-6 border-t border-slate-200 space-y-4">
              {/* Primary Return Button */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm shadow-lg shadow-blue-500/25 transition-all hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-amber-300" />
                  <span>Selesai Membaca, Kembali ke 9 Komponen</span>
                </button>

                {/* Quick Prev / Next Navigator */}
                <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-end">
                  {prevComponent ? (
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(prevComponent.id)}
                      className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      title={`Beralih ke ${prevComponent.name}`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="truncate max-w-[110px]">{prevComponent.name}</span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextComponent ? (
                    <button
                      type="button"
                      onClick={() => handleOpenDetail(nextComponent.id)}
                      className="flex items-center space-x-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition"
                      title={`Beralih ke ${nextComponent.name}`}
                    >
                      <span className="truncate max-w-[110px]">{nextComponent.name}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <div />
                  )}
                </div>
              </div>

              {/* Next Action Suggestions */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 text-xs text-slate-500">
                <span>Langkah Belajar Selanjutnya:</span>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={onPlayGame}
                    className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold transition"
                  >
                    🎮 Mainkan Game Cocokkan
                  </button>
                  <button
                    type="button"
                    onClick={onGoToWorkout}
                    className="px-3 py-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold transition"
                  >
                    🏃 Praktik 6 Pos Sirkuit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
