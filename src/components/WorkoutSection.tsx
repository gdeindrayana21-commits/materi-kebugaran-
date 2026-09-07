import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Play,
  Pause,
  RotateCcw,
  Save,
  CheckCircle2,
  Dumbbell,
  Timer as TimerIcon,
  Flame,
  ArrowRight,
  Heart
} from 'lucide-react';
import { WorkoutPos } from '../types';

interface WorkoutSectionProps {
  workoutData: WorkoutPos[];
  onSaveWorkout: (data: WorkoutPos[]) => void;
  onGoToLKM: () => void;
}

export const WorkoutSection: React.FC<WorkoutSectionProps> = ({
  workoutData,
  onSaveWorkout,
  onGoToLKM
}) => {
  const [items, setItems] = useState<WorkoutPos[]>(workoutData);
  const [isSaved, setIsSaved] = useState(false);

  // Simple integrated stopwatch
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!timerActive && seconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, seconds]);

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = () => {
    setTimerActive(false);
    setSeconds(0);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remainingSec = sec % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSec.toString().padStart(2, '0')}`;
  };

  const handleFieldChange = (
    id: number,
    field: 'repetitions' | 'difficulty' | 'feeling' | 'notes',
    value: string
  ) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
    setIsSaved(false);
  };

  const handleSave = () => {
    onSaveWorkout(items);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const difficultyOptions = [
    { value: 'Mudah', label: '😊 Mudah' },
    { value: 'Cukup Menantang', label: '🙂 Cukup Menantang' },
    { value: 'Menantang', label: '😅 Menantang' },
    { value: 'Sangat Menantang', label: '🔥 Sangat Menantang' }
  ];

  return (
    <div className="space-y-8 pb-8">
      {/* Header with Stopwatch Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Dumbbell className="w-4 h-4" />
            <span>Aktivitas Praktik Pembelajaran Lapangan</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🏃 Latihan Kebugaran Jasmani (Sirkuit 6 Pos)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Lakukan setiap pos latihan sesuai kemampuan fisikmu. Catat repetisi dan refleksikan perasaanmu!
          </p>
        </div>

        {/* Stopwatch Card */}
        <div className="flex items-center bg-slate-900 text-white p-3 rounded-2xl shadow-sm space-x-3 w-fit">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <TimerIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Stopwatch Latihan</div>
            <div className="text-xl font-black font-mono tracking-wider text-emerald-400">
              {formatTimer(seconds)}
            </div>
          </div>
          <div className="flex items-center space-x-1 pl-2 border-l border-slate-700">
            <button
              type="button"
              onClick={toggleTimer}
              className={`p-2 rounded-lg text-xs font-bold transition ${
                timerActive ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'
              }`}
              title={timerActive ? 'Jeda' : 'Mulai'}
            >
              {timerActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              type="button"
              onClick={resetTimer}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ⚠️ Peringatan Keselamatan Penting */}
      <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-5 shadow-xs">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1.5 text-xs text-amber-950">
            <h4 className="font-black text-sm uppercase tracking-wide text-amber-900">
              Protokol Keselamatan & Kesehatan Peserta Didik
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-semibold">
              <div className="flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Lakukan aktivitas sesuai kemampuan pribadi.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Pastikan kondisi tubuh siap dan tidak sedang sakit.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Lakukan pemanasan statis dan dinamis dahulu.</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>⚠️</span>
                <span>Segera berhenti jika pusing, sesak, atau nyeri sendi.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Circuit Workout Stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((pos) => (
          <div
            key={pos.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition p-5 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2.5">
              {/* Station Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span className="text-xs font-black text-blue-700 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                  {pos.title}
                </span>
                <span className="text-[11px] font-bold text-slate-500">Pos {pos.id} dari 6</span>
              </div>

              {/* Component Info */}
              <div>
                <div className="text-xs font-extrabold text-slate-900 flex items-center gap-1">
                  <span>🎯</span>
                  <span>Komponen: {pos.component}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Fokus Otot: <strong>{pos.targetMuscle}</strong>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 leading-relaxed">
                {pos.description}
              </p>
            </div>

            {/* Input Form for this Station */}
            <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Hasil / Jumlah Repetisi:
                </label>
                <input
                  type="text"
                  value={pos.repetitions}
                  onChange={(e) => handleFieldChange(pos.id, 'repetitions', e.target.value)}
                  placeholder="Contoh: 15 kali / 30 detik"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tingkat Kesulitan:
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {difficultyOptions.map((diff) => (
                    <button
                      key={diff.value}
                      type="button"
                      onClick={() => handleFieldChange(pos.id, 'difficulty', diff.value)}
                      className={`p-1.5 rounded-lg text-[11px] font-semibold text-center border transition ${
                        pos.difficulty === diff.value
                          ? 'bg-blue-600 text-white border-blue-600 font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {diff.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Perasaan Setelah Latihan:
                </label>
                <input
                  type="text"
                  value={pos.feeling}
                  onChange={(e) => handleFieldChange(pos.id, 'feeling', e.target.value)}
                  placeholder="Contoh: Otot lengan terasa hangat, napas teratur"
                  className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Save Action & Next Button */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center space-x-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Hasil Praktik Sirkuit</span>
          </button>
          {isSaved && (
            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" />
              Tersimpan di data belajar!
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={onGoToLKM}
          className="flex items-center space-x-1.5 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
        >
          <span>Lanjut ke Lembar Kerja Peserta Didik (LKM) ➔</span>
        </button>
      </div>
    </div>
  );
};
