import React, { useState } from 'react';
import {
  Users,
  FileSpreadsheet,
  Printer,
  Sparkles,
  TrendingUp,
  Award,
  CheckCircle,
  Clock,
  MessageSquareHeart,
  Save,
  ShieldCheck,
  Search,
  Filter,
  BarChart3,
  Plus,
  Edit,
  Trash2,
  LayoutGrid,
  Table as TableIcon,
  RefreshCw,
  Radio
} from 'lucide-react';
import {
  StudentSubmissionRecord,
  TeacherReflection,
  StudentFeedbackItem
} from '../types';
import { exportClassToExcel, printClassReport } from '../utils/exportUtils';
import { ScoreInputModal } from './ScoreInputModal';

interface TeacherSectionProps {
  classRecords: StudentSubmissionRecord[];
  feedbackList: StudentFeedbackItem[];
  teacherReflection: TeacherReflection;
  onSaveTeacherReflection: (data: TeacherReflection) => void;
  onUpsertRecord?: (record: Partial<StudentSubmissionRecord>) => void;
  onDeleteRecord?: (idOrAbsen: string) => void;
}

export const TeacherSection: React.FC<TeacherSectionProps> = ({
  classRecords = [],
  feedbackList = [],
  teacherReflection,
  onSaveTeacherReflection,
  onUpsertRecord,
  onDeleteRecord
}) => {
  const [activeTab, setActiveTab] = useState<'rekap' | 'suara' | 'refleksi'>('rekap');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'tuntas' | 'remedial' | 'lkm'>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [reflectionData, setReflectionData] = useState<TeacherReflection>(teacherReflection);
  const [isSaved, setIsSaved] = useState(false);

  // Score Input Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recordToEdit, setRecordToEdit] = useState<StudentSubmissionRecord | null>(null);

  const safeClassRecords = Array.isArray(classRecords) ? classRecords : [];
  const safeFeedbackList = Array.isArray(feedbackList) ? feedbackList : [];

  // Statistics
  const totalStudents = safeClassRecords.length;
  const totalSubmitted = safeClassRecords.filter(
    (r) => r?.isSubmitted || r?.status === 'Sudah Selesai'
  ).length;
  const avgScore = totalStudents > 0
    ? Math.round(
        safeClassRecords.reduce(
          (acc, curr) => acc + (curr?.quizScore ?? curr?.nilaiEvaluasi ?? 0),
          0
        ) / totalStudents
      )
    : 0;
  const passedStudents = safeClassRecords.filter(
    (r) => (r?.quizScore ?? r?.nilaiEvaluasi ?? 0) >= 75
  ).length;
  const passRate = totalStudents > 0 ? Math.round((passedStudents / totalStudents) * 100) : 0;

  // Filter records
  const searchLower = (searchTerm || '').trim().toLowerCase();
  const filteredRecords = safeClassRecords.filter((r) => {
    if (!r) return false;
    const name = (r.studentName || r.nama || '').toLowerCase();
    const absen = (r.noAbsen || '').toString().toLowerCase();
    const matchesSearch = name.includes(searchLower) || absen.includes(searchLower);
    if (!matchesSearch) return false;

    const score = r.quizScore ?? r.nilaiEvaluasi ?? 0;
    const isLkmDone = r.lkmStatus === 'Selesai' || r.lkmCompleted || false;

    if (statusFilter === 'tuntas') return score >= 75;
    if (statusFilter === 'remedial') return score < 75;
    if (statusFilter === 'lkm') return isLkmDone;
    return true;
  });

  const handleAddNew = () => {
    setRecordToEdit(null);
    setIsModalOpen(true);
  };

  const handleEditRecord = (rec: StudentSubmissionRecord) => {
    setRecordToEdit(rec);
    setIsModalOpen(true);
  };

  const handleDeleteRecord = (rec: StudentSubmissionRecord) => {
    const studentId = rec.id || rec.studentId || rec.noAbsen;
    if (window.confirm(`Hapus data nilai untuk ${rec.studentName || rec.nama}?`)) {
      if (onDeleteRecord) {
        onDeleteRecord(studentId);
      }
    }
  };

  const handleSaveModalRecord = (data: Partial<StudentSubmissionRecord>) => {
    if (onUpsertRecord) {
      onUpsertRecord(data);
    }
  };

  const handleSaveReflection = () => {
    onSaveTeacherReflection(reflectionData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleExportExcel = () => {
    exportClassToExcel(safeClassRecords, 'X-MIPA-1');
  };

  const handlePrint = () => {
    printClassReport();
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>Portal Pendidik PJOK Kelas X</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            📊 Dashboard & Refleksi Guru PJOK
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Kelola rekap nilai peserta didik, tinjau aspirasi suara siswa, dan dokumentasikan refleksi pembelajaran.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('rekap')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'rekap'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rekap Hasil Kelas
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('suara')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'suara'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Suara Siswa ({safeFeedbackList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('refleksi')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeTab === 'refleksi'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Refleksi Pendidik
          </button>
        </div>
      </div>

      {/* TAB 1: REKAP KELAS */}
      {activeTab === 'rekap' && (
        <div className="space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
                👥
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Total Peserta Didik</div>
                <div className="text-2xl font-black text-slate-900">{totalStudents} Siswa</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
                📈
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Rata-Rata Evaluasi</div>
                <div className="text-2xl font-black text-emerald-600">{avgScore} / 100</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-lg">
                🏆
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Ketuntasan Klasikal</div>
                <div className="text-2xl font-black text-amber-600">{passRate}% Tuntas</div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-lg">
                📝
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">LKM Selesai</div>
                <div className="text-2xl font-black text-indigo-600">{totalSubmitted} / {totalStudents}</div>
              </div>
            </div>
          </div>

          {/* Real-time Status Banner & Quick Action */}
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg border border-indigo-900/50">
            <div className="flex items-start sm:items-center space-x-3.5">
              <span className="relative flex h-4 w-4 mt-0.5 sm:mt-0 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 shadow-sm shadow-emerald-400"></span>
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-black text-sm sm:text-base text-white tracking-wide">
                    DATABASE REAL-TIME AKTIF
                  </span>
                  <span className="text-[10px] uppercase font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tracking-wider">
                    ⚡ Live Auto-Sync
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  Setiap kali murid mengisi evaluasi, LKM, atau nilai, data otomatis diperbarui langsung tanpa perlu muat ulang halaman.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleAddNew}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all active:scale-95 border border-amber-200"
              >
                <Plus className="w-4 h-4 text-slate-950 stroke-[3]" />
                <span>+ Input Nilai Siswa</span>
              </button>
            </div>
          </div>

          {/* Table / Card Container & Action Bar */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-6 space-y-4">
            {/* Filter and Search Bar */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-1">
                {/* Search Input */}
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari nama atau nomor absen..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => setStatusFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      statusFilter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Semua ({safeClassRecords.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('tuntas')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      statusFilter === 'tuntas'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Tuntas ({passedStudents})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('remedial')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      statusFilter === 'remedial'
                        ? 'bg-amber-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Perlu Bimbingan ({safeClassRecords.length - passedStudents})
                  </button>
                  <button
                    type="button"
                    onClick={() => setStatusFilter('lkm')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      statusFilter === 'lkm'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    LKM Selesai ({totalSubmitted})
                  </button>
                </div>
              </div>

              {/* View Switcher & Export Tools */}
              <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 lg:pt-0">
                {/* Table/Cards Toggle */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setViewMode('table')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      viewMode === 'table' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Tampilan Tabel"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Tabel</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('cards')}
                    className={`p-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 ${
                      viewMode === 'cards' ? 'bg-white shadow-xs text-slate-900' : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Tampilan Kartu"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Kartu</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleExportExcel}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span className="hidden sm:inline">Excel</span>
                </button>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition"
                >
                  <Printer className="w-4 h-4" />
                  <span className="hidden sm:inline">Cetak</span>
                </button>
              </div>
            </div>

            {/* If no records match filter */}
            {filteredRecords.length === 0 ? (
              <div className="py-12 text-center text-slate-500 space-y-2">
                <p className="text-sm font-bold">Tidak ada peserta didik yang sesuai filter pencarian.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="text-xs text-blue-600 font-bold hover:underline"
                >
                  Reset Filter
                </button>
              </div>
            ) : viewMode === 'table' ? (
              /* Class Records Table (Responsive with min-width and horizontal scroll) */
              <div className="overflow-x-auto rounded-2xl border border-slate-200">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 font-extrabold uppercase border-b border-slate-200">
                      <th className="p-3 w-12 text-center">No</th>
                      <th className="p-3 min-w-[180px]">Nama Peserta Didik</th>
                      <th className="p-3 w-28 text-center">Status LKM</th>
                      <th className="p-3 w-24 text-center">Skor Kuis</th>
                      <th className="p-3 min-w-[140px]">Kategori Capaian</th>
                      <th className="p-3 min-w-[200px]">Rencana Aktivitas Mandiri</th>
                      <th className="p-3 w-24 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRecords.map((rec, idx) => {
                      const studentId = rec.studentId || rec.id || `rec-${idx}`;
                      const name = rec.studentName || rec.nama || `Siswa ${idx + 1}`;
                      const score = rec.quizScore ?? rec.nilaiEvaluasi ?? 0;
                      const isLkmDone = rec.lkmStatus === 'Selesai' || rec.lkmCompleted || false;
                      const category = rec.fitnessCategory || rec.kategori || 'Baik';
                      const target = rec.personalTarget || rec.targetPribadi || '-';

                      return (
                        <tr key={studentId} className="hover:bg-slate-50/80 transition">
                          <td className="p-3 text-center font-bold text-slate-500">{rec.noAbsen || idx + 1}</td>
                          <td className="p-3 font-extrabold text-slate-900">
                            <div className="flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-[10px] flex items-center justify-center font-bold shrink-0">
                                {rec.noAbsen || idx + 1}
                              </span>
                              <div>
                                <span className="block truncate max-w-[220px]">{name}</span>
                                <span className="text-[10px] text-slate-400 font-medium">{rec.kelas || 'X-1'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            {isLkmDone ? (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-black text-[10px] inline-flex items-center gap-1">
                                <CheckCircle className="w-3 h-3 text-emerald-600" /> Selesai
                              </span>
                            ) : rec.lkmStatus === 'Proses' ? (
                              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-black text-[10px]">
                                ⏳ Proses
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-bold text-[10px]">
                                Belum
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-center font-black text-sm">
                            <span
                              className={`px-2.5 py-1 rounded-lg ${
                                score >= 75
                                  ? 'bg-emerald-50 text-emerald-700 font-black'
                                  : 'bg-amber-50 text-amber-700 font-black'
                              }`}
                            >
                              {score}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="font-bold text-slate-700">{category}</span>
                          </td>
                          <td className="p-3 text-slate-600 italic text-[11px]">“{target}”</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleEditRecord(rec)}
                                className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Edit Nilai"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRecord(rec)}
                                className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                                title="Hapus Data"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              /* Class Records Cards (Ultra-Responsive Mobile & Tablet View) */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredRecords.map((rec, idx) => {
                  const studentId = rec.studentId || rec.id || `rec-${idx}`;
                  const name = rec.studentName || rec.nama || `Siswa ${idx + 1}`;
                  const score = rec.quizScore ?? rec.nilaiEvaluasi ?? 0;
                  const isLkmDone = rec.lkmStatus === 'Selesai' || rec.lkmCompleted || false;
                  const category = rec.fitnessCategory || rec.kategori || 'Baik';
                  const target = rec.personalTarget || rec.targetPribadi || '-';

                  return (
                    <div
                      key={studentId}
                      className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200 hover:border-blue-300 hover:shadow-xs transition space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-2.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                            {rec.noAbsen || idx + 1}
                          </div>
                          <div>
                            <h4 className="font-extrabold text-slate-900 text-sm leading-tight">{name}</h4>
                            <span className="text-[11px] text-slate-500">{rec.kelas || 'X-1'} • No. {rec.noAbsen || idx + 1}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditRecord(rec)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                            title="Edit Nilai"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteRecord(rec)}
                            className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition"
                            title="Hapus Data"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-xl border border-slate-200/80 text-xs">
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase">Nilai Evaluasi</span>
                          <span className={`text-base font-black ${score >= 75 ? 'text-emerald-600' : 'text-amber-600'}`}>
                            {score} / 100
                          </span>
                        </div>
                        <div>
                          <span className="block text-[10px] font-bold text-slate-400 uppercase">Status LKM</span>
                          {isLkmDone ? (
                            <span className="text-emerald-700 font-extrabold text-xs flex items-center gap-1">
                              ✓ Selesai
                            </span>
                          ) : (
                            <span className="text-amber-700 font-extrabold text-xs">
                              ⏳ Dalam Proses
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="text-xs space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                          <span className="text-slate-500 font-medium">Predikat:</span>
                          <span className="font-bold text-slate-800">{category}</span>
                        </div>
                        {target && target !== '-' && (
                          <div className="text-[11px] text-slate-600 bg-white/60 p-2 rounded-lg italic">
                            “{target}”
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Score Input & Edit Modal */}
      <ScoreInputModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recordToEdit={recordToEdit}
        onSaveRecord={handleSaveModalRecord}
      />

      {/* TAB 2: SUARA SISWA (14B) */}
      {activeTab === 'suara' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Highlight Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-5 rounded-2xl border border-indigo-100 space-y-1">
              <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider">
                Suasana Kelas Terbanyak
              </span>
              <div className="text-xl font-black text-indigo-950">🎉 Sangat Menyenangkan</div>
              <p className="text-[11px] text-slate-600">Dipilih oleh 85% peserta didik</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-2xl border border-emerald-100 space-y-1">
              <span className="text-[10px] font-black uppercase text-emerald-700 tracking-wider">
                Materi Paling Disukai
              </span>
              <div className="text-xl font-black text-emerald-950">Sirkuit 6 Pos & Game</div>
              <p className="text-[11px] text-slate-600">Aktivitas praktik motorik interaktif</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-100 space-y-1">
              <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">
                Bagian Butuh Penguatan
              </span>
              <div className="text-xl font-black text-amber-950">Kelincahan vs Kecepatan</div>
              <p className="text-[11px] text-slate-600">Perlu visualisasi shuttle run lebih lanjut</p>
            </div>
          </div>

          {/* Feedback Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safeFeedbackList.map((item) => (
              <div
                key={item.id}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{item.isAnonymous ? '🤫' : '🎓'}</span>
                    <span className="font-extrabold text-slate-900 text-xs">
                      {item.isAnonymous ? 'Peserta Didik (Anonim)' : item.studentName}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">{item.timestamp}</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-700">
                  <p>
                    <strong>Materi Disenangi:</strong> {item.funMaterial}
                  </p>
                  <p>
                    <strong>Bagian Sulit:</strong> {item.difficultPart}
                  </p>
                  <p>
                    <strong>Suasana:</strong>{' '}
                    <span className="bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-full text-[11px]">
                      {item.atmosphere}
                    </span>
                  </p>
                  <p>
                    <strong>Usulan Lanjutan:</strong> {item.suggestedActivity}
                  </p>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 italic text-slate-800 mt-2">
                    💬 “{item.messageToTeacher}”
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: REFLEKSI GURU (15) */}
      {activeTab === 'refleksi' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  📝 Lembar Refleksi Pendidik (PJOK Kelas X)
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dokumentasikan efektivitas pembelajaran untuk peningkatan mutu instruksional berkelanjutan.
                </p>
              </div>
              <button
                type="button"
                onClick={handleSaveReflection}
                className="flex items-center space-x-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Refleksi</span>
              </button>
            </div>

            {/* 5 Questions */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  1. Apakah seluruh peserta didik aktif dan antusias dalam mengikuti seluruh aktivitas pembelajaran?
                </label>
                <textarea
                  rows={2}
                  value={reflectionData.q1SeluruhSiswaAktif}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      q1SeluruhSiswaAktif: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  2. Bagian materi mana yang paling mudah dan cepat dipahami oleh peserta didik?
                </label>
                <textarea
                  rows={2}
                  value={reflectionData.q2MateriMudah}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      q2MateriMudah: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  3. Bagian materi atau gerakan latihan mana yang masih memerlukan bimbingan & penguatan khusus?
                </label>
                <textarea
                  rows={2}
                  value={reflectionData.q3MateriPerluPenguatan}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      q3MateriPerluPenguatan: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  4. Apakah alokasi waktu (2 x 45 menit) mencukupi untuk tahapan teori, sirkuit fisik, dan LKM?
                </label>
                <textarea
                  rows={2}
                  value={reflectionData.q4AlokasiWaktu}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      q4AlokasiWaktu: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">
                  5. Perbaikan apa yang perlu dilakukan untuk strategi pembelajaran pada pertemuan berikutnya?
                </label>
                <textarea
                  rows={2}
                  value={reflectionData.q5PerbaikanBerikutnya}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      q5PerbaikanBerikutnya: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Catatan Tindak Lanjut & Remedial */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="block font-bold text-slate-800">
                  📌 Rencana Tindak Lanjut Pembelajaran:
                </label>
                <textarea
                  rows={3}
                  value={reflectionData.catatanTindakLanjut}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      catatanTindakLanjut: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-bold text-slate-800">
                  💡 Program Remedial & Pengayaan:
                </label>
                <textarea
                  rows={3}
                  value={reflectionData.catatanRemedialPengayaan}
                  onChange={(e) =>
                    setReflectionData({
                      ...reflectionData,
                      catatanRemedialPengayaan: e.target.value
                    })
                  }
                  className="w-full p-2.5 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-3">
              {isSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Refleksi Pendidik berhasil disimpan ke sistem!
                </span>
              )}
              <button
                type="button"
                onClick={handleSaveReflection}
                className="ml-auto px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-xs transition"
              >
                Simpan Lembar Refleksi Guru
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
