export interface StudentProfile {
  nama: string;
  kelas: string;
  noAbsen: string;
  namaGuru: string;
  tahunPelajaran: string;
  tanggal: string;
  sekolah: string;
}

export interface LearningObjective {
  id: number;
  text: string;
  completed: boolean;
}

export interface FitnessComponent {
  id: string;
  name: string;
  englishName: string;
  definition: string;
  activities: string[];
  lifeExample: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface MatchingItem {
  id: string;
  activity: string;
  correctComponent: string;
  explanation: string;
}

export interface WorkoutPos {
  id: number;
  title: string;
  component: string;
  targetMuscle: string;
  description: string;
  repetitions: string;
  difficulty: 'Mudah' | 'Cukup Menantang' | 'Menantang' | 'Sangat Menantang' | '';
  feeling: string;
  notes: string;
}

export interface LKMActivityPlan {
  hari: string;
  aktivitas: string;
  durasi: string;
  target: string;
}

export interface LKMIdentifyRow {
  aktivitas: string;
  komponen: string;
  alasan: string;
}

export interface LKMData {
  // Kegiatan 1: Mengamati
  kegiatan1: {
    q1Kekuatan: string;
    q2DayaTahan: string;
    q3Kelincahan: string;
    q4AlasanBugar: string;
  };
  // Kegiatan 2: Menganalisis
  kegiatan2: {
    q1Faktor: string;
    q2HubunganFisik: string;
    q3KebiasaanSehat: string;
  };
  // Kegiatan 3: Mengidentifikasi
  kegiatan3: LKMIdentifyRow[];
  // Kegiatan 4: Rencana Aktivitas Diri
  kegiatan4: LKMActivityPlan[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

export interface EssayQuestion {
  id: number;
  question: string;
  rubric: string;
  modelAnswer: string;
  studentAnswer: string;
}

export interface StudentSelfReflection {
  q1PengetahuanBaru: string;
  q2KomponenDipahami: string;
  q3AktivitasMenantang: string;
  q4KondisiBugar: 'Sangat Baik' | 'Baik' | 'Cukup' | 'Perlu Ditingkatkan' | '';
  q4Alasan: string;
  q5KebiasaanDitingkatkan: string;
  q6TargetPribadi: string;
  skalaPemahaman: number; // 1 to 5 stars
}

export interface TeacherEvaluationStatements {
  jelas: number;
  tanya: number;
  perhatian: number;
  arahan: number;
  suasana: number;
  motivasi: number;
  adil: number;
  aktif: number;
  bantu: number;
  menarik: number;
}

export interface StudentVoiceForTeacher {
  isAnonymous: boolean;
  studentName: string;
  studentClass: string;
  // Bagian A: Proses Pembelajaran
  pendapatPembelajaran: 'Sangat Menyenangkan' | 'Menyenangkan' | 'Cukup Menyenangkan' | 'Kurang Menyenangkan' | '';
  alasanPendapat: string;
  kemudahanMateri: number; // 1 to 5
  materiPalingMudah: string;
  materiMasihBingung: string;
  // Bagian B: Cara Mengajar Guru (10 pernyataan, 1 to 5)
  guruStatements: TeacherEvaluationStatements;
  // Bagian C: Media Pembelajaran
  tampilanMedia: 'Sangat Menarik' | 'Menarik' | 'Cukup Menarik' | 'Kurang Menarik' | '';
  kemudahanMedia: 'Sangat Mudah' | 'Mudah' | 'Cukup Mudah' | 'Sulit' | '';
  fiturDisukai: string[];
  mediaPerluDiperbaiki: string;
  // Bagian D: Hal yang Disukai
  halDisukai: string;
  aktivitasMenarik: string;
  pengalamanBaru: string;
  // Bagian E: Saran untuk Guru
  guruSudahBaik: string;
  saranAgarMenarik: string;
  aktivitasBerikutnya: string;
  metodeDiinginkan: string[];
  metodeLainnya: string;
  // Bagian F: Pesan
  pesanGuru: string;
  // Bagian G: Kepuasan Keseluruhan
  kepuasanRating: number; // 1 to 5
  // Bagian H: Konfirmasi
  konfirmasiJujur: boolean;
  konfirmasiTujuan: boolean;
  submittedAt?: string;
}

export interface StudentFeedbackItem {
  id: string;
  studentName: string;
  kelas: string;
  isAnonymous: boolean;
  funMaterial: string;
  difficultPart: string;
  atmosphere: '🎉 Sangat Menyenangkan' | '😊 Menyenangkan' | '😐 Biasa Saja' | '😴 Kurang Menarik';
  suggestedActivity: string;
  messageToTeacher: string;
  timestamp: string;
}

export interface TeacherReflection {
  q1SeluruhSiswaAktif: string;
  q2MateriMudah: string;
  q3MateriPerluPenguatan: string;
  q4AlokasiWaktu: string;
  q5PerbaikanBerikutnya: string;
  catatanTindakLanjut: string;
  catatanRemedialPengayaan: string;
  updatedAt?: string;
  q1TujuanTercapai?: 'Ya' | 'Sebagian' | 'Belum';
  q2Partisipasi?: 'Sangat Aktif' | 'Aktif' | 'Cukup Aktif' | 'Perlu Ditingkatkan';
  q4MateriPerluKuat?: string;
  q5AktivitasMenarik?: string;
  q6Kendala?: string;
  q7TindakLanjut?: string;
  q8CatatanKhusus?: string;
}

export interface StudentSubmissionRecord {
  id?: string;
  studentId?: string;
  studentName?: string;
  nama?: string;
  kelas: string;
  noAbsen: string;
  tanggal?: string;
  quizScore?: number;
  nilaiEvaluasi?: number;
  skorEvaluasi?: number;
  totalSoal?: number;
  fitnessCategory?: string;
  kategori?: string;
  lkmStatus?: 'Selesai' | 'Proses' | 'Belum';
  isSubmitted?: boolean;
  status?: 'Sudah Selesai' | 'Sedang Mengerjakan' | 'Belum Mengerjakan';
  personalTarget?: string;
  targetPribadi?: string;
  lkmCompleted?: boolean;
  refleksiCompleted?: boolean;
  suaraGuruCompleted?: boolean;
  kepuasanRating?: number;
  suaraAnonim?: boolean;
  saranGuru?: string;
  lkmData?: LKMData;
  workoutData?: WorkoutPos[];
  selfReflection?: StudentSelfReflection;
  studentVoice?: StudentVoiceForTeacher;
}

export interface BadgeInfo {
  id: string;
  title: string;
  tier: 'Perunggu' | 'Perak' | 'Emas' | 'Spesial';
  icon: string;
  description: string;
  unlocked: boolean;
  progressText: string;
}
