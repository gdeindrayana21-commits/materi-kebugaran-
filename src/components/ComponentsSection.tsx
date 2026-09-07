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
  Gamepad2,
  Dumbbell
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
  const [selectedId, setSelectedId] = useState<string>('kekuatan');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'BicepsFlexed':
        return <BicepsFlexed className="w-6 h-6" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6" />;
      case 'Zap':
        return <Zap className="w-6 h-6" />;
      case 'Smile':
        return <Smile className="w-6 h-6" />;
      case 'Repeat':
        return <Repeat className="w-6 h-6" />;
      case 'Scale':
        return <Scale className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'Flame':
        return <Flame className="w-6 h-6" />;
      case 'Timer':
        return <Timer className="w-6 h-6" />;
      default:
        return <Sparkles className="w-6 h-6" />;
    }
  };

  const currentComponent =
    FITNESS_COMPONENTS.find((c) => c.id === selectedId) || FITNESS_COMPONENTS[0];

  return (
    <div className="space-y-8 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <span>🧩</span>
            <span>Materi 4 Kurikulum PJOK Kelas X</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            Kenali 9 Komponen Kebugaran Jasmani
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Klik kartu komponen di bawah untuk mendalami pengertian, contoh latihan, dan aplikasinya di kehidupan nyata.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onPlayGame}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-xs transition"
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Mainkan Game Cocokkan 🎮</span>
          </button>
        </div>
      </div>

      {/* Main Grid + Detail Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 9 Interactive Cards */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
          {FITNESS_COMPONENTS.map((item, idx) => {
            const isSelected = item.id === selectedId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl border text-left transition ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md translate-x-1'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-blue-50 text-blue-600'
                    }`}
                  >
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold opacity-80">{idx + 1}.</span>
                      <h4 className="font-extrabold text-xs">{item.name}</h4>
                    </div>
                    <p
                      className={`text-[11px] ${
                        isSelected ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {item.englishName}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 transition-transform ${
                    isSelected ? 'translate-x-1 text-white' : 'text-slate-300'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right: Detailed Active Component Panel */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 sticky top-24 animate-in fade-in duration-200">
            {/* Component Header with Vibrant Gradient */}
            <div
              className={`rounded-2xl p-6 text-white bg-gradient-to-r ${currentComponent.gradient} shadow-sm space-y-2`}
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                  {getIcon(currentComponent.icon)}
                </div>
                <span className="text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full border border-white/20">
                  {currentComponent.englishName}
                </span>
              </div>
              <h3 className="text-2xl font-black">{currentComponent.name}</h3>
            </div>

            {/* Pengertian */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-blue-600">
                📖 Pengertian Komponen
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                {currentComponent.definition}
              </p>
            </div>

            {/* Contoh Aktivitas Latihan */}
            <div className="space-y-2">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-emerald-600 flex items-center gap-1.5">
                <Dumbbell className="w-4 h-4" />
                Contoh Aktivitas Latihan di Sekolah & Rumah
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentComponent.activities.map((act, i) => (
                  <div
                    key={i}
                    className="flex items-center space-x-2 bg-emerald-50/70 text-emerald-900 border border-emerald-200 rounded-xl px-3 py-2.5 text-xs font-semibold"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-black shrink-0">
                      ✓
                    </span>
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contoh dalam Kehidupan Sehari-hari */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider text-amber-600">
                💡 Contoh Nyata dalam Kehidupan Sehari-hari
              </h4>
              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                {currentComponent.lifeExample}
              </div>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onPlayGame}
                className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition"
              >
                <span>Uji Pemahaman di Game Cocokkan ➔</span>
              </button>
              <button
                type="button"
                onClick={onGoToWorkout}
                className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-xs transition"
              >
                <span>Praktikkan di 6 Pos Sirkuit 🏃</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
