import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle,
  XCircle,
  Trophy,
  RotateCcw,
  Sparkles,
  Award,
  BookOpen,
  Send,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Lightbulb
} from 'lucide-react';
import { QUIZ_QUESTIONS, ESSAY_QUESTIONS } from '../data/mockData';
import { EssayQuestion, StudentProfile } from '../types';
import { StudentIdentityCard } from './StudentIdentityCard';

interface EvaluationSectionProps {
  profile: StudentProfile;
  onUpdateProfile?: (profile: StudentProfile) => void;
  onScoreUpdated: (score: number, correctCount: number, category: string) => void;
  onGoToReflection: () => void;
}

export const EvaluationSection: React.FC<EvaluationSectionProps> = ({
  profile,
  onUpdateProfile,
  onScoreUpdated,
  onGoToReflection
}) => {
  const [activeTab, setActiveTab] = useState<'pg' | 'uraian'>('pg');

  // Multiple Choice Quiz State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  // Essay State
  const [essayItems, setEssayItems] = useState<EssayQuestion[]>(ESSAY_QUESTIONS);
  const [showEssayRubric, setShowEssayRubric] = useState<Record<number, boolean>>({});

  // Multiple Choice Calculations
  let correctCount = 0;
  QUIZ_QUESTIONS.forEach((q) => {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  const totalQuestions = QUIZ_QUESTIONS.length;
  const incorrectCount = totalQuestions - correctCount;
  const percentageScore = Math.round((correctCount / totalQuestions) * 100);

  const getCategory = (score: number) => {
    if (score >= 85) return '🌟 Sangat Baik';
    if (score >= 70) return '👍 Baik';
    if (score >= 55) return '📚 Cukup';
    return '💪 Perlu Berlatih';
  };

  const handleSelectOption = (questionId: number, optionKey: string) => {
    if (quizSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    const cat = getCategory(percentageScore);
    onScoreUpdated(percentageScore, correctCount, cat);

    if (percentageScore >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback
      }
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setQuizSubmitted(false);
    setCurrentQIndex(0);
  };

  const handleEssayChange = (id: number, val: string) => {
    setEssayItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, studentAnswer: val } : item))
    );
  };

  const toggleEssayRubric = (id: number) => {
    setShowEssayRubric((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const currentQ = QUIZ_QUESTIONS[currentQIndex];
  const answeredCount = Object.keys(userAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div className="space-y-8 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>Evaluasi Belajar Interaktif PJOK Kelas X</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            🎯 Evaluasi Kebugaran Jasmani
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Uji capaian kompetensi melalui 15 soal pilihan ganda otomatis dan 5 pertanyaan uraian analisis.
          </p>
        </div>

        <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('pg')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'pg'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            15 Pilihan Ganda
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('uraian')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeTab === 'uraian'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            5 Soal Uraian
          </button>
        </div>
      </div>

      {/* Identitas Peserta Didik Card */}
      <StudentIdentityCard
        profile={profile}
        onUpdateProfile={onUpdateProfile}
        title="Identitas Peserta Didik Evaluasi"
        subtitle="Identitas ini akan langsung tercatat bersama perolehan nilai evaluasi ke database rekap guru."
        badgeText="Wajib Diisi"
      />

      {/* SECTION A: PILIHAN GANDA */}
      {activeTab === 'pg' && (
        <div className="space-y-6">
          {/* Hasil Akhir jika sudah disubmit */}
          {quizSubmitted && (
            <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4 animate-in zoom-in-95 duration-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                    {percentageScore >= 80 ? '🌟' : percentageScore >= 65 ? '👍' : '💪'}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                      Rekap Nilai Akhir Evaluasi
                    </span>
                    <h3 className="text-2xl font-black">
                      🎉 HASIL BELAJAR EVALUASI
                    </h3>
                    <p className="text-xs text-blue-100">
                      Kategori Pencapaian:{' '}
                      <strong className="text-amber-300 text-sm">{getCategory(percentageScore)}</strong>
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-[11px] font-bold text-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>Tersinkronisasi Real-Time ke Database Rekap Guru</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 text-center text-xs">
                  <div className="px-2">
                    <div className="text-xl font-black text-amber-300">{percentageScore}</div>
                    <div className="text-[10px] uppercase font-bold text-blue-100">Nilai</div>
                  </div>
                  <div className="px-2 border-l border-white/20">
                    <div className="text-xl font-black text-emerald-300">{correctCount}</div>
                    <div className="text-[10px] uppercase font-bold text-blue-100">Benar</div>
                  </div>
                  <div className="px-2 border-l border-white/20">
                    <div className="text-xl font-black text-rose-300">{incorrectCount}</div>
                    <div className="text-[10px] uppercase font-bold text-blue-100">Salah</div>
                  </div>
                  <div className="px-2 border-l border-white/20">
                    <div className="text-xl font-black text-white">{totalQuestions}</div>
                    <div className="text-[10px] uppercase font-bold text-blue-100">Total</div>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-white/20 flex flex-wrap items-center justify-between gap-3 text-xs">
                <p className="text-blue-100">
                  💡 Kamu dapat meninjau nomor soal di bawah untuk melihat pembahasan lengkap dari guru.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleResetQuiz}
                    className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-white font-semibold transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Ulangi Kuis</span>
                  </button>
                  <button
                    type="button"
                    onClick={onGoToReflection}
                    className="flex items-center space-x-1.5 px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg shadow-sm transition"
                  >
                    <span>Lanjut ke Refleksi Diri ➔</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Progress & Question Navigator Bar */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="font-extrabold text-slate-700">
                Pengerjaan Soal Pilihan Ganda: {answeredCount} dari {totalQuestions} Terjawab
              </span>
              <span className="font-bold text-blue-600">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 15 Question Buttons Navigator */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isCurrent = idx === currentQIndex;
                let statusClass = 'bg-slate-100 text-slate-700 border-slate-200';

                if (quizSubmitted) {
                  const isCorrect = userAnswers[q.id] === q.correctAnswer;
                  statusClass = isCorrect
                    ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                    : 'bg-rose-600 text-white border-rose-600 font-bold';
                } else if (isAnswered) {
                  statusClass = 'bg-blue-600 text-white border-blue-600 font-bold';
                }

                if (isCurrent) {
                  statusClass += ' ring-2 ring-amber-400 ring-offset-1';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQIndex(idx)}
                    className={`w-8 h-8 rounded-lg text-xs font-bold border transition ${statusClass}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                Soal Nomor {currentQIndex + 1} dari {totalQuestions}
              </span>
              {quizSubmitted && (
                <span className="text-xs font-bold">
                  {userAnswers[currentQ.id] === currentQ.correctAnswer ? (
                    <span className="text-emerald-600 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" /> Jawabanmu Benar
                    </span>
                  ) : (
                    <span className="text-rose-600 flex items-center gap-1">
                      <XCircle className="w-4 h-4" /> Jawabanmu Belum Tepat
                    </span>
                  )}
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                const isCorrectAnswer = opt.key === currentQ.correctAnswer;

                let cardStyle =
                  'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800';

                if (isSelected && !quizSubmitted) {
                  cardStyle = 'bg-blue-50 border-blue-600 text-blue-950 ring-1 ring-blue-500 font-bold';
                }

                if (quizSubmitted) {
                  if (isCorrectAnswer) {
                    cardStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold';
                  } else if (isSelected && !isCorrectAnswer) {
                    cardStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    disabled={quizSubmitted}
                    className={`w-full flex items-start space-x-3 p-4 rounded-xl border text-left transition text-xs sm:text-sm ${cardStyle}`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-extrabold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-slate-300 text-slate-700'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span className="leading-relaxed mt-0.5">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanation if submitted */}
            {quizSubmitted && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Kunci Jawaban & Pembahasan Guru:</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  <strong>Kunci: {currentQ.correctAnswer}</strong> — {currentQ.explanation}
                </p>
              </div>
            )}

            {/* Navigation Next/Prev */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentQIndex((prev) => Math.max(0, prev - 1))}
                disabled={currentQIndex === 0}
                className="flex items-center space-x-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {!quizSubmitted && (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
                >
                  Selesaikan & Nilai 🚀
                </button>
              )}

              <button
                type="button"
                onClick={() => setCurrentQIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                disabled={currentQIndex === totalQuestions - 1}
                className="flex items-center space-x-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 rounded-xl text-xs font-semibold text-slate-700 transition"
              >
                <span>Selanjutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION B: 5 SOAL URAIAN */}
      {activeTab === 'uraian' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-2">
            <h3 className="text-base font-black text-slate-900">
              📝 Soal Uraian Analisis Konsep Kebugaran Jasmani
            </h3>
            <p className="text-xs text-slate-600">
              Jawablah pertanyaan analisis berikut dengan bahasa yang jelas, logis, dan ilmiah sesuai pemahaman yang telah kamu pelajari.
            </p>
          </div>

          <div className="space-y-5">
            {essayItems.map((item, idx) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-xs font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                    Soal Uraian {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => toggleEssayRubric(item.id)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1 rounded-lg border border-amber-200 transition"
                  >
                    {showEssayRubric[item.id] ? 'Tutup Rubrik Guru' : 'Lihat Rubrik & Jawaban Model'}
                  </button>
                </div>

                <p className="text-sm font-extrabold text-slate-900 leading-relaxed">
                  {item.question}
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Jawaban Peserta Didik:
                  </label>
                  <textarea
                    value={item.studentAnswer}
                    onChange={(e) => handleEssayChange(item.id, e.target.value)}
                    rows={3}
                    placeholder="Tuliskan jawaban analisis lengkapmu di sini..."
                    className="w-full p-3 text-xs text-slate-800 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                  />
                </div>

                {showEssayRubric[item.id] && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs space-y-2 animate-in fade-in duration-200">
                    <div className="font-bold text-emerald-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-700" />
                      <span>Pedoman Penskoran & Jawaban Model Guru PJOK:</span>
                    </div>
                    <p className="text-slate-600">
                      <strong>Rubrik Penilaian:</strong> {item.rubric}
                    </p>
                    <p className="text-slate-800 bg-white p-3 rounded-lg border border-emerald-200 leading-relaxed">
                      <strong>Contoh Jawaban Ideal:</strong> {item.modelAnswer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={onGoToReflection}
              className="flex items-center space-x-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition"
            >
              <span>Lanjut ke Refleksi Diri Peserta Didik ➔</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
