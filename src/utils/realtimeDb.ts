import { StudentSubmissionRecord, StudentFeedbackItem, StudentProfile, LKMData, WorkoutPos, StudentSelfReflection } from '../types';
import { INITIAL_CLASS_RECORDS } from '../data/mockData';

const CHANNEL_NAME = 'pjok_realtime_db_channel';
const STORAGE_KEY_CLASS_RECORDS = 'pjok_class_records';
const STORAGE_KEY_FEEDBACK_LIST = 'pjok_feedback_list';

export interface RealtimeEvent {
  type: 'SCORE_UPDATED' | 'RECORD_UPSERT' | 'RECORD_DELETE' | 'FEEDBACK_ADDED' | 'BULK_SYNC' | 'PROFILE_SYNC';
  sender?: string;
  timestamp: number;
  data: any;
  message?: string;
}

// BroadcastChannel instance with safety check (for SSR or environments without it)
let channel: BroadcastChannel | null = null;
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
  } catch (e) {
    console.warn('BroadcastChannel not available:', e);
  }
}

/**
 * Normalizes a student record to ensure backward-compatibility
 * and consistent field access.
 */
export function normalizeStudentRecord(
  r: Partial<StudentSubmissionRecord>,
  index = 0
): StudentSubmissionRecord {
  const id = r.id || r.studentId || `sub-${index + 1}-${Date.now()}`;
  const name = r.studentName || r.nama || `Siswa ${index + 1}`;
  const noAbsen = r.noAbsen ? String(r.noAbsen).padStart(2, '0') : String(index + 1).padStart(2, '0');
  const score = r.quizScore ?? r.nilaiEvaluasi ?? 0;
  const isDone = r.isSubmitted ?? (r.status === 'Sudah Selesai' || score > 0);
  const category = r.fitnessCategory || r.kategori || calculateCategory(score);

  return {
    ...r,
    id,
    studentId: id,
    studentName: name,
    nama: name,
    kelas: r.kelas || 'X-1',
    noAbsen,
    quizScore: score,
    nilaiEvaluasi: score,
    skorEvaluasi: r.skorEvaluasi ?? (score > 0 ? Math.round((score / 100) * 15) : 0),
    totalSoal: r.totalSoal || 15,
    fitnessCategory: category,
    kategori: category,
    isSubmitted: isDone,
    status: r.status || (isDone ? 'Sudah Selesai' : 'Sedang Mengerjakan'),
    lkmStatus: r.lkmStatus || (r.lkmCompleted ? 'Selesai' : 'Proses'),
    lkmCompleted: r.lkmCompleted ?? (r.lkmStatus === 'Selesai'),
    refleksiCompleted: r.refleksiCompleted ?? false,
    suaraGuruCompleted: r.suaraGuruCompleted ?? false,
    personalTarget: r.personalTarget || r.targetPribadi || '-',
    targetPribadi: r.targetPribadi || r.personalTarget || '-',
    tanggal: r.tanggal || new Date().toISOString().split('T')[0]
  };
}

export function calculateCategory(score: number): string {
  if (score >= 85) return '🌟 Sangat Baik';
  if (score >= 70) return '👍 Baik';
  if (score >= 55) return '📚 Cukup';
  return '💪 Perlu Berlatih';
}

/**
 * Retrieves records from localStorage with fallback to INITIAL_CLASS_RECORDS.
 */
export function getStoredRecords(): StudentSubmissionRecord[] {
  if (typeof window === 'undefined') return INITIAL_CLASS_RECORDS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CLASS_RECORDS);
    if (!raw) return INITIAL_CLASS_RECORDS;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((item, idx) => normalizeStudentRecord(item, idx));
    }
  } catch (err) {
    console.error('Error loading stored records:', err);
  }
  return INITIAL_CLASS_RECORDS;
}

/**
 * Saves class records to localStorage and broadcasts to all other tabs/windows.
 */
export function saveAndBroadcastRecords(
  records: StudentSubmissionRecord[],
  event?: Partial<RealtimeEvent>
): void {
  if (typeof window === 'undefined') return;
  try {
    const normalized = records.map((r, i) => normalizeStudentRecord(r, i));
    localStorage.setItem(STORAGE_KEY_CLASS_RECORDS, JSON.stringify(normalized));

    const payload: RealtimeEvent = {
      type: event?.type || 'BULK_SYNC',
      timestamp: Date.now(),
      data: normalized,
      message: event?.message || 'Database diperbarui secara real-time',
      sender: event?.sender || 'App'
    };

    if (channel) {
      channel.postMessage(payload);
    }
  } catch (err) {
    console.error('Error broadcasting records:', err);
  }
}

/**
 * Upserts a student record in real-time.
 * If the student with the same absen or name exists, update them.
 * Otherwise, prepend a new record!
 */
export function upsertStudentRecord(
  records: StudentSubmissionRecord[],
  studentData: Partial<StudentSubmissionRecord>
): { updatedRecords: StudentSubmissionRecord[]; changedRecord: StudentSubmissionRecord } {
  const currentList = records.length > 0 ? records : getStoredRecords();
  const absenTarget = studentData.noAbsen ? String(studentData.noAbsen).padStart(2, '0') : null;
  const nameTarget = (studentData.studentName || studentData.nama || '').trim().toLowerCase();

  let foundIndex = -1;

  if (absenTarget) {
    foundIndex = currentList.findIndex((r) => {
      const recAbsen = r.noAbsen ? String(r.noAbsen).padStart(2, '0') : null;
      return recAbsen === absenTarget;
    });
  }

  if (foundIndex === -1 && nameTarget) {
    foundIndex = currentList.findIndex((r) => {
      const recName = (r.studentName || r.nama || '').trim().toLowerCase();
      return recName === nameTarget;
    });
  }

  let finalRecord: StudentSubmissionRecord;
  let newList: StudentSubmissionRecord[];

  if (foundIndex !== -1) {
    // Merge existing
    const existing = currentList[foundIndex];
    finalRecord = normalizeStudentRecord(
      {
        ...existing,
        ...studentData,
        // Calculate category if score updated
        fitnessCategory:
          studentData.fitnessCategory ||
          studentData.kategori ||
          (studentData.quizScore !== undefined
            ? calculateCategory(studentData.quizScore)
            : existing.fitnessCategory)
      },
      foundIndex
    );

    newList = [...currentList];
    newList[foundIndex] = finalRecord;
  } else {
    // Create new record
    finalRecord = normalizeStudentRecord(
      {
        ...studentData,
        id: studentData.id || `rec-custom-${Date.now()}`,
        studentId: studentData.studentId || `rec-custom-${Date.now()}`,
        studentName: studentData.studentName || studentData.nama || 'Siswa Baru',
        nama: studentData.nama || studentData.studentName || 'Siswa Baru',
        kelas: studentData.kelas || 'X-1',
        noAbsen: absenTarget || String(currentList.length + 1).padStart(2, '0'),
        tanggal: studentData.tanggal || new Date().toISOString().split('T')[0]
      },
      currentList.length
    );

    // Prepend new record so it appears prominently
    newList = [finalRecord, ...currentList];
  }

  saveAndBroadcastRecords(newList, {
    type: 'RECORD_UPSERT',
    data: finalRecord,
    message: `Nilai siswa ${finalRecord.nama} (Absen ${finalRecord.noAbsen}) berhasil disinkronkan!`
  });

  return { updatedRecords: newList, changedRecord: finalRecord };
}

/**
 * Subscribes to real-time events across tabs & windows.
 */
export function subscribeToRealtimeUpdates(
  onRecordsUpdate: (records: StudentSubmissionRecord[], event: RealtimeEvent) => void,
  onNotification?: (msg: string) => void
): () => void {
  if (typeof window === 'undefined') return () => {};

  const handleMessage = (e: MessageEvent<RealtimeEvent>) => {
    if (e.data && e.data.type) {
      if (Array.isArray(e.data.data)) {
        onRecordsUpdate(e.data.data, e.data);
      } else if (e.data.type === 'RECORD_UPSERT') {
        // Refetch fresh stored records
        const fresh = getStoredRecords();
        onRecordsUpdate(fresh, e.data);
      }
      if (e.data.message && onNotification) {
        onNotification(e.data.message);
      }
    }
  };

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY_CLASS_RECORDS && e.newValue) {
      try {
        const parsed = JSON.parse(e.newValue);
        if (Array.isArray(parsed)) {
          const normalized = parsed.map((item, idx) => normalizeStudentRecord(item, idx));
          onRecordsUpdate(normalized, {
            type: 'BULK_SYNC',
            timestamp: Date.now(),
            data: normalized,
            message: 'Data tersinkronisasi antar-jendela!'
          });
        }
      } catch (err) {
        console.error('Storage sync error:', err);
      }
    }
  };

  if (channel) {
    channel.addEventListener('message', handleMessage);
  }
  window.addEventListener('storage', handleStorage);

  return () => {
    if (channel) {
      channel.removeEventListener('message', handleMessage);
    }
    window.removeEventListener('storage', handleStorage);
  };
}
