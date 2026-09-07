import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Gamepad2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  ArrowRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { MATCH_ITEMS } from '../data/mockData';

const COMPONENT_OPTIONS = [
  'Kekuatan',
  'Kekuatan dan daya tahan otot',
  'Daya tahan dan kekuatan otot tungkai',
  'Kelincahan',
  'Kecepatan',
  'Kelentukan',
  'Keseimbangan'
];

interface MatchGameSectionProps {
  onGameCompleted?: (score: number) => void;
  onGoToWorkout: () => void;
}

export const MatchGameSection: React.FC<MatchGameSectionProps> = ({
  onGameCompleted,
  onGoToWorkout
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (itemId: string, choice: string) => {
    if (submitted) return;
    setUserAnswers((prev) => ({ ...prev, [itemId]: choice }));
  };

  const handleReset = () => {
    setUserAnswers({});
    setSubmitted(false);
  };

  // Check answers
  let correctCount = 0;
  MATCH_ITEMS.forEach((item) => {
    if (userAnswers[item.id] === item.correctComponent) {
      correctCount++;
    }
  });

  const total = MATCH_ITEMS.length;
  const percentage = Math.round((correctCount / total) * 100);

  const handleSubmit = () => {
    setSubmitted(true);
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback if canvas-confetti is not loaded
      }
    }
    if (onGameCompleted) {
      onGameCompleted(percentage);
    }
  };

  const isAllAnswered = MATCH_ITEMS.every((item) => userAnswers[item.id]);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Gamepad2 className="w-4 h-4" />
            <span>Aktivitas Interaktif Gamifikasi</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🎮 Cocokkan Komponen Kebugaran Jasmani
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Pasangkan setiap bentuk aktivitas fisik dengan komponen kebugaran yang paling dilatih!
          </p>
        </div>

        <div className="flex items-center gap-2">
          {submitted && (
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center space-x-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Main Ulang</span>
            </button>
          )}
        </div>
      </div>

      {/* Score Summary if submitted */}
      {submitted && (
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4 animate-in zoom-in-95 duration-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                {percentage >= 80 ? '🏆' : percentage >= 60 ? '👍' : '💪'}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Hasil Permainan
                </span>
                <h3 className="text-2xl font-black">
                  {percentage >= 80
                    ? 'Luar Biasa! Pemahamanmu Sangat Baik!'
                    : percentage >= 60
                    ? 'Bagus! Hampir Sempurna!'
                    : 'Terus Berlatih, Kamu Pasti Bisa!'}
                </h3>
                <p className="text-xs text-blue-100">
                  Pelajari ulasan penjelasan pada kartu di bawah untuk memperdalam pemahamanmu.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div className="text-center px-2">
                <div className="text-2xl font-black text-amber-300">{correctCount}/{total}</div>
                <div className="text-[10px] uppercase font-bold text-blue-100">Benar</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="text-center px-2">
                <div className="text-2xl font-black text-emerald-300">{percentage}%</div>
                <div className="text-[10px] uppercase font-bold text-blue-100">Skor</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Matching Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MATCH_ITEMS.map((item, idx) => {
          const selected = userAnswers[item.id];
          const isCorrect = selected === item.correctComponent;
          return (
            <div
              key={item.id}
              className={`rounded-2xl p-5 border transition flex flex-col justify-between ${
                submitted
                  ? isCorrect
                    ? 'bg-emerald-50/90 border-emerald-300 shadow-xs'
                    : 'bg-rose-50/90 border-rose-300 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-blue-300 shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    Aktivitas {idx + 1}
                  </span>
                  {submitted && (
                    <span className="flex items-center gap-1 text-xs font-bold">
                      {isCorrect ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" /> Benar
                        </span>
                      ) : (
                        <span className="text-rose-700 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Belum Tepat
                        </span>
                      )}
                    </span>
                  )}
                </div>

                <h4 className="text-base font-black text-slate-900 mb-3">
                  🏃 {item.activity}
                </h4>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-bold text-slate-600 uppercase">
                    Pilih Komponen:
                  </label>
                  <select
                    value={selected || ''}
                    onChange={(e) => handleSelect(item.id, e.target.value)}
                    disabled={submitted}
                    className={`w-full text-xs font-semibold rounded-xl p-2.5 border transition ${
                      submitted
                        ? isCorrect
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-rose-100 text-rose-900 border-rose-300'
                        : 'bg-slate-50 text-slate-800 border-slate-300 focus:bg-white focus:ring-2 focus:ring-blue-500'
                    }`}
                  >
                    <option value="">-- Pilih Komponen Kebugaran --</option>
                    {COMPONENT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Explanations after submit */}
              {submitted && (
                <div className="mt-3 pt-3 border-t border-black/10 text-xs space-y-1">
                  {!isCorrect && (
                    <p className="font-bold text-rose-800">
                      Kunci Jawaban: <span className="underline">{item.correctComponent}</span>
                    </p>
                  )}
                  <p className="text-slate-600 flex items-start gap-1.5 text-[11px] leading-relaxed">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span>{item.explanation}</span>
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom submit button */}
      {!submitted && (
        <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-xs text-slate-600">
            {isAllAnswered ? (
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" />
                Semua 9 aktivitas telah dipilih! Klik tombol periksa di samping.
              </span>
            ) : (
              <span>
                Pilihlah jawaban untuk semua 9 aktivitas untuk dapat memeriksa hasilmu.
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className={`px-6 py-3 rounded-xl font-black text-xs transition flex items-center justify-center space-x-2 ${
              isAllAnswered
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Periksa Jawaban Saya 🚀</span>
          </button>
        </div>
      )}

      {submitted && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onGoToWorkout}
            className="flex items-center space-x-1.5 px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md transition"
          >
            <span>Lanjut ke Praktik 6 Pos Kebugaran Sirkuit ➔</span>
          </button>
        </div>
      )}
    </div>
  );
};
