import React, { useState, useEffect } from 'react';
import {
  StudentProfile,
  LKMData,
  WorkoutPos,
  StudentSelfReflection,
  StudentFeedbackItem,
  TeacherReflection,
  StudentSubmissionRecord,
  LearningObjective
} from './types';
import {
  INITIAL_STUDENT_PROFILE,
  INITIAL_LKM,
  INITIAL_WORKOUT_POS,
  INITIAL_SELF_REFLECTION,
  INITIAL_FEEDBACK_LIST,
  INITIAL_TEACHER_REFLECTION,
  INITIAL_CLASS_RECORDS,
  LEARNING_OBJECTIVES
} from './data/mockData';
import {
  getStoredRecords,
  upsertStudentRecord,
  saveAndBroadcastRecords,
  subscribeToRealtimeUpdates
} from './utils/realtimeDb';

// Components
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MateriSection } from './components/MateriSection';
import { ComponentsSection } from './components/ComponentsSection';
import { MatchGameSection } from './components/MatchGameSection';
import { WorkoutSection } from './components/WorkoutSection';
import { LKMSection } from './components/LKMSection';
import { EvaluationSection } from './components/EvaluationSection';
import { SelfReflectionSection } from './components/SelfReflectionSection';
import { StudentVoiceSection } from './components/StudentVoiceSection';
import { TeacherSection } from './components/TeacherSection';
import { StudentProfileModal } from './components/StudentProfileModal';

export default function App() {
  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [currentRole, setCurrentRole] = useState<'siswa' | 'guru'>('siswa');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Real-time Toast alert state
  const [realtimeToast, setRealtimeToast] = useState<{
    message: string;
    type?: 'info' | 'success';
  } | null>(null);

  const showRealtimeToast = (message: string, type: 'info' | 'success' = 'success') => {
    setRealtimeToast({ message, type });
  };

  useEffect(() => {
    if (!realtimeToast) return;
    const timer = setTimeout(() => {
      setRealtimeToast(null);
    }, 3800);
    return () => clearTimeout(timer);
  }, [realtimeToast]);

  // Student & School State
  const [profile, setProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('pjok_student_profile');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          !parsed.namaGuru ||
          parsed.namaGuru.toLowerCase().includes('gede indrayana') ||
          parsed.namaGuru === 'Gede Indrayana, S.Pd.'
        ) {
          parsed.namaGuru = 'Gde Bayu Indrayana, S.Pd.';
        }
        return parsed;
      }
    } catch {
      // fallback
    }
    return INITIAL_STUDENT_PROFILE;
  });

  // Learning Objectives State
  const [objectives, setObjectives] = useState<LearningObjective[]>(() => {
    const saved = localStorage.getItem('pjok_learning_objectives');
    return saved ? JSON.parse(saved) : LEARNING_OBJECTIVES;
  });

  // Learning Progress & Data State
  const [lkmData, setLkmData] = useState<LKMData>(() => {
    const saved = localStorage.getItem('pjok_lkm_data');
    return saved ? JSON.parse(saved) : INITIAL_LKM;
  });

  const [workoutData, setWorkoutData] = useState<WorkoutPos[]>(() => {
    const saved = localStorage.getItem('pjok_workout_data');
    return saved ? JSON.parse(saved) : INITIAL_WORKOUT_POS;
  });

  const [selfReflection, setSelfReflection] = useState<StudentSelfReflection>(() => {
    const saved = localStorage.getItem('pjok_self_reflection');
    return saved ? JSON.parse(saved) : INITIAL_SELF_REFLECTION;
  });

  const [feedbackList, setFeedbackList] = useState<StudentFeedbackItem[]>(() => {
    const saved = localStorage.getItem('pjok_feedback_list');
    return saved ? JSON.parse(saved) : INITIAL_FEEDBACK_LIST;
  });

  const [teacherReflection, setTeacherReflection] = useState<TeacherReflection>(() => {
    const saved = localStorage.getItem('pjok_teacher_reflection');
    return saved ? JSON.parse(saved) : INITIAL_TEACHER_REFLECTION;
  });

  const [classRecords, setClassRecords] = useState<StudentSubmissionRecord[]>(() => {
    return getStoredRecords();
  });

  // Track completed milestones for badge gamification
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('pjok_completed_steps');
    return saved
      ? JSON.parse(saved)
      : {
          materi: false,
          komponen: false,
          game: false,
          praktik: false,
          lkm: false,
          evaluasi: false,
          refleksi: false
        };
  });

  const [quizScore, setQuizScore] = useState<number>(0);

  // Subscribe to real-time cross-tab and cross-window events
  useEffect(() => {
    const unsubscribe = subscribeToRealtimeUpdates((freshRecords, event) => {
      setClassRecords(freshRecords);
      if (event?.message) {
        showRealtimeToast(event.message, 'info');
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Persist state changes
  useEffect(() => {
    localStorage.setItem('pjok_student_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('pjok_learning_objectives', JSON.stringify(objectives));
  }, [objectives]);

  useEffect(() => {
    localStorage.setItem('pjok_lkm_data', JSON.stringify(lkmData));
  }, [lkmData]);

  useEffect(() => {
    localStorage.setItem('pjok_workout_data', JSON.stringify(workoutData));
  }, [workoutData]);

  useEffect(() => {
    localStorage.setItem('pjok_self_reflection', JSON.stringify(selfReflection));
  }, [selfReflection]);

  useEffect(() => {
    localStorage.setItem('pjok_feedback_list', JSON.stringify(feedbackList));
  }, [feedbackList]);

  useEffect(() => {
    localStorage.setItem('pjok_teacher_reflection', JSON.stringify(teacherReflection));
  }, [teacherReflection]);

  useEffect(() => {
    localStorage.setItem('pjok_completed_steps', JSON.stringify(completedSteps));
  }, [completedSteps]);

  // Mark step complete when navigated
  const markStepComplete = (stepKey: string) => {
    setCompletedSteps((prev) => ({ ...prev, [stepKey]: true }));
  };

  const handleToggleObjective = (id: number) => {
    setObjectives((prev) =>
      prev.map((obj) => (obj.id === id ? { ...obj, completed: !obj.completed } : obj))
    );
  };

  const normalizeTab = (tabId: string) => {
    if (tabId === 'beranda') return 'home';
    if (tabId === 'aktivitas') return 'praktik';
    if (tabId === 'refleksi-diri') return 'refleksi';
    if (tabId === 'suara-siswa') return 'suara';
    if (tabId === 'dashboard-guru' || tabId === 'unduh') return 'guru';
    return tabId;
  };

  const handleTabChange = (tabId: string) => {
    const cleanTab = normalizeTab(tabId);
    setActiveTab(cleanTab);
    if (cleanTab === 'guru') {
      setCurrentRole('guru');
    }
    if (['materi', 'komponen', 'game', 'praktik', 'lkm', 'evaluasi', 'refleksi'].includes(cleanTab)) {
      markStepComplete(cleanTab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Profile update handler with real-time sync
  const handleSaveProfile = (updatedProfile: StudentProfile) => {
    setProfile(updatedProfile);
    const res = upsertStudentRecord(classRecords, {
      noAbsen: updatedProfile.noAbsen,
      nama: updatedProfile.nama,
      studentName: updatedProfile.nama,
      kelas: updatedProfile.kelas
    });
    setClassRecords(res.updatedRecords);
    showRealtimeToast(`Profil ${updatedProfile.nama} disinkronkan ke data kelas!`);
  };

  // Handlers for child sections
  const handleSaveLKM = (updated: LKMData) => {
    setLkmData(updated);
    markStepComplete('lkm');

    // Also update class records for current student
    const res = upsertStudentRecord(classRecords, {
      noAbsen: profile.noAbsen,
      nama: profile.nama,
      studentName: profile.nama,
      kelas: profile.kelas,
      lkmStatus: 'Selesai',
      lkmCompleted: true
    });
    setClassRecords(res.updatedRecords);
    showRealtimeToast(`✓ LKM Digital siswa ${profile.nama} berhasil tersimpan ke Database Guru!`);
  };

  const handleSaveWorkout = (updated: WorkoutPos[]) => {
    setWorkoutData(updated);
    markStepComplete('praktik');

    const res = upsertStudentRecord(classRecords, {
      noAbsen: profile.noAbsen,
      nama: profile.nama,
      studentName: profile.nama,
      kelas: profile.kelas,
      workoutData: updated
    });
    setClassRecords(res.updatedRecords);
    showRealtimeToast(`✓ Catatan Praktik Sirkuit ${profile.nama} tersimpan real-time!`);
  };

  const handleSaveSelfReflection = (updated: StudentSelfReflection) => {
    setSelfReflection(updated);
    markStepComplete('refleksi');

    // Update target in class records
    const res = upsertStudentRecord(classRecords, {
      noAbsen: profile.noAbsen,
      nama: profile.nama,
      studentName: profile.nama,
      kelas: profile.kelas,
      refleksiCompleted: true,
      personalTarget: updated.q6TargetPribadi || '-',
      targetPribadi: updated.q6TargetPribadi || '-'
    });
    setClassRecords(res.updatedRecords);
    showRealtimeToast(`✓ Refleksi diri & target ${profile.nama} tersimpan ke Rekap Guru!`);
  };

  const handleAddFeedback = (newFb: StudentFeedbackItem) => {
    setFeedbackList((prev) => [newFb, ...prev]);
  };

  const handleScoreUpdated = (score: number, correct: number, category: string) => {
    setQuizScore(score);
    markStepComplete('evaluasi');

    // Update class records for current student real-time
    const res = upsertStudentRecord(classRecords, {
      noAbsen: profile.noAbsen,
      nama: profile.nama,
      studentName: profile.nama,
      kelas: profile.kelas,
      quizScore: score,
      nilaiEvaluasi: score,
      skorEvaluasi: correct,
      totalSoal: 15,
      fitnessCategory: category,
      kategori: category,
      isSubmitted: true,
      status: 'Sudah Selesai',
      tanggal: new Date().toISOString().split('T')[0]
    });
    setClassRecords(res.updatedRecords);
    showRealtimeToast(`⚡ Nilai Evaluasi (${score}/100) ${profile.nama} tersimpan real-time ke Database!`);
  };

  // Teacher actions
  const handleTeacherUpsertRecord = (recordData: Partial<StudentSubmissionRecord>) => {
    const res = upsertStudentRecord(classRecords, recordData);
    setClassRecords(res.updatedRecords);
    showRealtimeToast(`✓ Data nilai ${res.changedRecord.nama} berhasil diperbarui di database!`);
  };

  const handleTeacherDeleteRecord = (idOrAbsen: string) => {
    const updated = classRecords.filter(
      (r) => r.id !== idOrAbsen && r.studentId !== idOrAbsen && r.noAbsen !== idOrAbsen
    );
    setClassRecords(updated);
    saveAndBroadcastRecords(updated, {
      type: 'RECORD_DELETE',
      message: 'Satu data nilai siswa telah dihapus.'
    });
    showRealtimeToast('Data nilai siswa berhasil dihapus dari database.');
  };

  // Calculate overall progress percentage
  const totalMilestones = 7;
  const completedMilestones = Object.values(completedSteps).filter(Boolean).length;
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Header Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={handleTabChange}
        setActiveTab={handleTabChange}
        profile={profile}
        currentRole={currentRole}
        activeRole={currentRole}
        onRoleChange={(role) => {
          setCurrentRole(role);
          if (role === 'guru') {
            setActiveTab('guru');
          } else if (activeTab === 'guru') {
            setActiveTab('home');
          }
        }}
        setActiveRole={(role) => {
          setCurrentRole(role);
          if (role === 'guru') {
            setActiveTab('guru');
          } else if (activeTab === 'guru') {
            setActiveTab('home');
          }
        }}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenBadges={() => handleTabChange('refleksi')}
        overallProgress={overallProgress}
        totalProgress={overallProgress}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'home' && (
          <HeroSection
            profile={profile}
            onStartLearning={() => handleTabChange('materi')}
            onSelectTab={handleTabChange}
            onNavigate={handleTabChange}
            onOpenProfile={() => setIsProfileModalOpen(true)}
            objectives={objectives}
            onToggleObjective={handleToggleObjective}
            completedSteps={completedSteps}
            quizScore={quizScore}
          />
        )}

        {activeTab === 'materi' && (
          <MateriSection
            onGoToComponents={() => handleTabChange('komponen')}
            onGoToActivity={() => handleTabChange('praktik')}
          />
        )}

        {activeTab === 'komponen' && (
          <ComponentsSection
            onPlayGame={() => handleTabChange('game')}
            onGoToWorkout={() => handleTabChange('praktik')}
          />
        )}

        {activeTab === 'game' && (
          <MatchGameSection
            onGameCompleted={(sc) => markStepComplete('game')}
            onGoToWorkout={() => handleTabChange('praktik')}
          />
        )}

        {activeTab === 'praktik' && (
          <WorkoutSection
            workoutData={workoutData}
            onSaveWorkout={handleSaveWorkout}
            onGoToLKM={() => handleTabChange('lkm')}
          />
        )}

        {activeTab === 'lkm' && (
          <LKMSection
            profile={profile}
            initialLKM={lkmData}
            onSaveLKM={handleSaveLKM}
            onGoToEvaluation={() => handleTabChange('evaluasi')}
            onUpdateProfile={handleSaveProfile}
          />
        )}

        {activeTab === 'evaluasi' && (
          <EvaluationSection
            profile={profile}
            onUpdateProfile={handleSaveProfile}
            onScoreUpdated={handleScoreUpdated}
            onGoToReflection={() => handleTabChange('refleksi')}
          />
        )}

        {activeTab === 'refleksi' && (
          <SelfReflectionSection
            profile={profile}
            initialReflection={selfReflection}
            onSaveReflection={handleSaveSelfReflection}
            onGoToStudentVoice={() => handleTabChange('suara')}
            onUpdateProfile={handleSaveProfile}
          />
        )}

        {activeTab === 'suara' && (
          <StudentVoiceSection
            profile={profile}
            feedbackList={feedbackList}
            onSubmitFeedback={handleAddFeedback}
            onUpdateProfile={handleSaveProfile}
            onGoToTeacherDashboard={() => {
              setCurrentRole('guru');
              handleTabChange('guru');
            }}
          />
        )}

        {activeTab === 'guru' && (
          <TeacherSection
            classRecords={classRecords}
            feedbackList={feedbackList}
            teacherReflection={teacherReflection}
            onSaveTeacherReflection={(up) => setTeacherReflection(up)}
            onUpsertRecord={handleTeacherUpsertRecord}
            onDeleteRecord={handleTeacherDeleteRecord}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 text-xs py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
              🏃
            </div>
            <div>
              <p className="font-extrabold text-white">
                Media Pembelajaran Edukatif Interaktif PJOK Kelas X
              </p>
              <p className="text-slate-400 text-[11px]">
                {profile.sekolah} • Kurikulum Merdeka Fase E
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <button
              type="button"
              onClick={() => handleTabChange('materi')}
              className="hover:text-white transition"
            >
              Materi Inti
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('komponen')}
              className="hover:text-white transition"
            >
              9 Komponen
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('praktik')}
              className="hover:text-white transition"
            >
              Sirkuit Fisik
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('lkm')}
              className="hover:text-white transition"
            >
              LKM Digital
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('guru')}
              className="hover:text-white transition font-bold text-blue-400"
            >
              Portal Guru
            </button>
          </div>

          <p className="text-[10px] text-slate-500">
            “Tubuh Bugar, Pikiran Segar, Prestasi Gemilang”
          </p>
        </div>
      </footer>

      {/* Real-time Floating Notification Toast */}
      {realtimeToast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-[calc(100vw-2.5rem)] sm:w-auto bg-slate-950/95 text-white border border-emerald-500/50 rounded-2xl p-3.5 shadow-2xl backdrop-blur-md flex items-center space-x-3 animate-in slide-in-from-bottom-5 duration-200">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <div className="flex-1 text-xs">
            <span className="block font-black text-[10px] text-emerald-400 uppercase tracking-wider">
              Sinkronisasi Real-Time
            </span>
            <p className="text-slate-200 font-semibold">{realtimeToast.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setRealtimeToast(null)}
            className="text-slate-400 hover:text-white text-xs font-bold px-1"
          >
            ✕
          </button>
        </div>
      )}

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={profile}
        onSave={handleSaveProfile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
