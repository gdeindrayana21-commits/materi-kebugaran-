import * as XLSX from 'xlsx';
import { StudentSubmissionRecord, StudentProfile } from '../types';

export function exportClassToExcel(
  records: StudentSubmissionRecord[],
  infoOrClass?: string | { sekolah: string; guru: string; materi: string; tahun: string }
) {
  const wb = XLSX.utils.book_new();

  const school = typeof infoOrClass === 'object' ? infoOrClass.sekolah : 'SMA NEGERI 1 TEJAKULA';
  const kelas = typeof infoOrClass === 'string' ? infoOrClass : 'Kelas X PJOK';
  const guru = typeof infoOrClass === 'object' ? infoOrClass.guru : 'Gde Bayu Indrayana, S.Pd.';
  const materi = typeof infoOrClass === 'object' ? infoOrClass.materi : 'Kebugaran Jasmani';

  // Sheet 1: Rekap Nilai & Siswa
  const sheet1Data: (string | number)[][] = [
    [school],
    [`Materi: ${materi} | Kelas: ${kelas} | Guru: ${guru}`],
    [`Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}`],
    [],
    [
      'No',
      'Nama Peserta Didik',
      'Kelas',
      'No Absen',
      'Nilai Evaluasi',
      'Kategori',
      'Status LKM',
      'Target Pribadi'
    ]
  ];

  records.forEach((r, idx) => {
    sheet1Data.push([
      (idx + 1).toString(),
      r.studentName || r.nama || `Siswa ${idx + 1}`,
      r.kelas || 'X',
      r.noAbsen || (idx + 1).toString(),
      r.quizScore ?? r.nilaiEvaluasi ?? 0,
      r.fitnessCategory || r.kategori || 'Baik',
      r.lkmStatus || (r.lkmCompleted ? 'Selesai' : 'Belum'),
      r.personalTarget || r.targetPribadi || '-'
    ]);
  });

  const ws1 = XLSX.utils.aoa_to_sheet(sheet1Data);
  XLSX.utils.book_append_sheet(wb, ws1, 'Rekap Nilai Siswa');

  // Sheet 2: Rekap Sirkuit Fisik (6 Pos)
  const sheet2Data: (string | number)[][] = [
    [school],
    ['REKAP AKTIVITAS PRAKTIK KEBUGARAN (6 POS SIRKUIT)'],
    [],
    [
      'No',
      'Nama Siswa',
      'Kelas',
      'Push Up Reps',
      'Sit Up Reps',
      'Back Up Reps',
      'Tangga Reps',
      'Shuttle Run Reps',
      'Squat Reps'
    ]
  ];

  records.forEach((r, idx) => {
    const w = r.workoutData || [];
    const getPosReps = (posId: number) => w.find((p) => p.id === posId)?.repetitions || '-';
    sheet2Data.push([
      (idx + 1).toString(),
      r.studentName || r.nama || `Siswa ${idx + 1}`,
      r.kelas || 'X',
      getPosReps(1),
      getPosReps(2),
      getPosReps(3),
      getPosReps(4),
      getPosReps(5),
      getPosReps(6)
    ]);
  });

  const ws2 = XLSX.utils.aoa_to_sheet(sheet2Data);
  XLSX.utils.book_append_sheet(wb, ws2, 'Praktik Pos Kebugaran');

  // Write file
  XLSX.writeFile(
    wb,
    `Rekap_PJOK_Kebugaran_Jasmani_${new Date().toISOString().split('T')[0]}.xlsx`
  );
}

export function printClassReport() {
  window.print();
}

export function printStudentReport(profile?: StudentProfile) {
  window.print();
}
