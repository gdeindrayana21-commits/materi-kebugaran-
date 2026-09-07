import React, { useState, useEffect } from 'react';
import { X, Save, CheckCircle2, User, Award, Dumbbell, FileText, Target, Sparkles } from 'lucide-react';
import { StudentSubmissionRecord } from '../types';
import { calculateCategory } from '../utils/realtimeDb';

interface ScoreInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  recordToEdit?: StudentSubmissionRecord | null;
  onSaveRecord: (record: Partial<StudentSubmissionRecord>) => void;
}

export const ScoreInputModal: React.FC<ScoreInputModalProps> = ({
  isOpen,
  onClose,
  recordToEdit,
  onSaveRecord
}) => {
  const [nama, setNama] = useState('');
  const [kelas, setKelas] = useState('X-1');
  const [noAbsen, setNoAbsen] = useState('01');
  const [quizScore, setQuizScore] = useState<number>(85);
  const [practicalScore, setPracticalScore] = useState<number>(85);
  const [lkmStatus, setLkmStatus] = useState<'Selesai' | 'Proses' | 'Belum'>('Selesai');
  const [personalTarget, setPersonalTarget] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (recordToEdit) {
      setNama(recordToEdit.studentName || recordToEdit.nama || '');
      setKelas(recordToEdit.kelas || 'X-1');
      setNoAbsen(recordToEdit.noAbsen || '01');
      setQuizScore(recordToEdit.quizScore ?? recordToEdit.nilaiEvaluasi ?? 80);
      setPracticalScore(85);
      setLkmStatus(recordToEdit.lkmStatus || (recordToEdit.lkmCompleted ? 'Selesai' : 'Proses'));
      setPersonalTarget(recordToEdit.personalTarget || recordToEdit.targetPribadi || '');
    } else {
      setNama('');
      setKelas('X-1');
      setNoAbsen('01');
      setQuizScore(80);
      setPracticalScore(80);
      setLkmStatus('Selesai');
      setPersonalTarget('');
    }
  }, [recordToEdit, isOpen]);

  if (!isOpen) return null;

  const currentCategory = calculateCategory(quizScore);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nama.trim()) return;

    const payload: Partial<StudentSubmissionRecord> = {
      id: recordToEdit?.id,
      studentId: recordToEdit?.studentId,
      nama: nama.trim(),
      studentName: nama.trim(),
      kelas,
      noAbsen: String(noAbsen).padStart(2, '0'),
      quizScore: Number(quizScore),
      nilaiEvaluasi: Number(quizScore),
      skorEvaluasi: Math.round((Number(quizScore) / 100) * 15),
      totalSoal: 15,
      fitnessCategory: currentCategory,
      kategori: currentCategory,
      lkmStatus,
      lkmCompleted: lkmStatus === 'Selesai',
      isSubmitted: true,
      status: 'Sudah Selesai',
      personalTarget: personalTarget.trim() || 'Rutin menjaga kebugaran jasmani setiap minggu.',
      targetPribadi: personalTarget.trim() || 'Rutin menjaga kebugaran jasmani setiap minggu.',
      tanggal: new Date().toISOString().split('T')[0]
    };

    onSaveRecord(payload);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 600);
  };

  return (
    <div
      id="score-input-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto animate-in fade-in"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-600 p-5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white font-bold text-lg shadow-inner">
              ⚡
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg leading-snug">
                {recordToEdit ? 'Edit Nilai Siswa (Real-Time)' : 'Input Nilai Siswa Baru'}
              </h3>
              <p className="text-xs text-blue-100 font-medium">
                Tersinkronisasi langsung ke database kelas & rekap guru
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 overflow-y-auto flex-1">
          {/* Nama Siswa */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Nama Lengkap Peserta Didik</span>
            </label>
            <input
              type="text"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Contoh: I Putu Gede Mahardika"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Kelas & No Absen */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                Kelas
              </label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                <option value="X-1">Kelas X-1</option>
                <option value="X-2">Kelas X-2</option>
                <option value="X-3">Kelas X-3</option>
                <option value="X-4">Kelas X-4</option>
                <option value="X-MIPA-1">Kelas X-MIPA-1</option>
                <option value="X-MIPA-2">Kelas X-MIPA-2</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                No. Absen
              </label>
              <input
                type="number"
                min="1"
                max="50"
                required
                value={noAbsen}
                onChange={(e) => setNoAbsen(e.target.value)}
                placeholder="01"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Nilai Evaluasi / Teori (0 - 100) */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Nilai Evaluasi Kuis (0 - 100)</span>
              </label>
              <span className="text-sm font-black px-2 py-0.5 rounded-md bg-blue-100 text-blue-700">
                {quizScore}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={quizScore}
                onChange={(e) => setQuizScore(Number(e.target.value))}
                className="flex-1 accent-blue-600 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <input
                type="number"
                min="0"
                max="100"
                value={quizScore}
                onChange={(e) => setQuizScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-16 px-2 py-1 border border-slate-300 rounded-lg text-center font-bold text-sm"
              />
            </div>

            {/* Dynamic Category Badge */}
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/80">
              <span className="text-slate-500 font-medium">Predikat / Kategori Capaian:</span>
              <span className="font-extrabold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-800 shadow-2xs">
                {currentCategory}
              </span>
            </div>
          </div>

          {/* Status LKM */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status Pengerjaan LKM Digital</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Selesai', 'Proses', 'Belum'] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setLkmStatus(status)}
                  className={`py-2 px-2 rounded-xl text-xs font-bold border transition ${
                    lkmStatus === status
                      ? status === 'Selesai'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : status === 'Proses'
                        ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                        : 'bg-rose-500 text-white border-rose-500 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {status === 'Selesai' ? '✓ Selesai' : status === 'Proses' ? '⏳ Proses' : '✕ Belum'}
                </button>
              ))}
            </div>
          </div>

          {/* Target Pribadi */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-indigo-600" />
              <span>Rencana Aktivitas / Target Mandiri</span>
            </label>
            <textarea
              rows={2}
              value={personalTarget}
              onChange={(e) => setPersonalTarget(e.target.value)}
              placeholder="Contoh: Rutin jogging 3x seminggu dan melatih daya tahan otot lengan."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-bold text-xs transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-xs shadow-md shadow-blue-500/20 transition active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Tersimpan Real-Time!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Simpan ke Database ➔</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
