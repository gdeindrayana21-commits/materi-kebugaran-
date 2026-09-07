import React, { useState } from 'react';
import {
  Home,
  BookOpen,
  Dumbbell,
  FileText,
  CheckCircle,
  Award,
  BarChart2,
  Download,
  Menu,
  X,
  User,
  Sparkles,
  MessageSquareHeart,
  LayoutGrid,
  Gamepad2
} from 'lucide-react';
import { StudentProfile } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab?: (tab: string) => void;
  onSelectTab?: (tab: string) => void;
  profile: StudentProfile;
  onOpenProfile?: () => void;
  onOpenProfileModal?: () => void;
  onOpenBadges?: () => void;
  totalProgress?: number;
  overallProgress?: number;
  activeRole?: 'siswa' | 'guru';
  currentRole?: 'siswa' | 'guru';
  setActiveRole?: (role: 'siswa' | 'guru') => void;
  onRoleChange?: (role: 'siswa' | 'guru') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onSelectTab,
  profile,
  onOpenProfile,
  onOpenProfileModal,
  onOpenBadges = () => {},
  totalProgress = 0,
  overallProgress = 0,
  activeRole,
  currentRole,
  setActiveRole,
  onRoleChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const selectTab = setActiveTab || onSelectTab || (() => {});
  const handleOpenProfile = onOpenProfile || onOpenProfileModal || (() => {});
  const effectiveRole = activeRole || currentRole || 'siswa';
  const changeRole = setActiveRole || onRoleChange || (() => {});
  const progressValue = totalProgress || overallProgress || 0;

  const isItemActive = (itemId: string) => {
    if (activeTab === itemId) return true;
    if ((itemId === 'beranda' || itemId === 'home') && (activeTab === 'home' || activeTab === 'beranda')) return true;
    if ((itemId === 'aktivitas' || itemId === 'praktik') && (activeTab === 'praktik' || activeTab === 'aktivitas')) return true;
    if ((itemId === 'refleksi-diri' || itemId === 'refleksi') && (activeTab === 'refleksi' || activeTab === 'refleksi-diri')) return true;
    if ((itemId === 'suara-siswa' || itemId === 'suara') && (activeTab === 'suara' || activeTab === 'suara-siswa')) return true;
    if ((itemId === 'dashboard-guru' || itemId === 'guru') && (activeTab === 'guru' || activeTab === 'dashboard-guru')) return true;
    return false;
  };

  const navItems = [
    { id: 'beranda', label: 'Beranda', icon: Home },
    { id: 'materi', label: 'Materi', icon: BookOpen },
    { id: 'komponen', label: '9 Komponen', icon: LayoutGrid },
    { id: 'game', label: 'Game Cocokkan', icon: Gamepad2 },
    { id: 'aktivitas', label: 'Praktik Sirkuit', icon: Dumbbell },
    { id: 'lkm', label: 'LKM Digital', icon: FileText },
    { id: 'evaluasi', label: 'Evaluasi', icon: CheckCircle },
    { id: 'refleksi-diri', label: 'Refleksi Diri', icon: Award },
    { id: 'suara-siswa', label: 'Suara Siswa', icon: MessageSquareHeart },
    { id: 'dashboard-guru', label: 'Dashboard Guru', icon: BarChart2 },
    { id: 'unduh', label: 'Unduh Hasil', icon: Download }
  ];

  const handleNavClick = (id: string) => {
    selectTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-sm no-print">
      {/* Top Banner with School Identity */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-emerald-600 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2 font-medium">
            <span className="bg-white/20 px-2 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase">
              {profile.sekolah}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">PJOK KELAS X • MATERI KEBUGARAN JASMANI</span>
          </div>
          <div className="flex items-center space-x-3 text-[11px]">
            <span className="hidden md:inline text-white/80">Guru Pengampu: <strong className="text-white">{profile.namaGuru}</strong></span>
            <div className="flex items-center bg-black/20 rounded-full px-2 py-0.5 border border-white/20">
              <span className="mr-1.5 text-white/80">Mode:</span>
              <button
                type="button"
                onClick={() => changeRole('siswa')}
                className={`px-2 py-0.5 rounded-full font-semibold transition ${
                  effectiveRole === 'siswa' ? 'bg-amber-400 text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Siswa
              </button>
              <button
                type="button"
                onClick={() => changeRole('guru')}
                className={`px-2 py-0.5 rounded-full font-semibold transition ${
                  effectiveRole === 'guru' ? 'bg-emerald-400 text-slate-900 shadow-xs' : 'text-white/80 hover:text-white'
                }`}
              >
                Guru
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavClick('beranda')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 font-black text-xl">
              🏃
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-slate-900 text-lg leading-tight tracking-tight">
                  KEBUGARAN JASMANI
                </h1>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-300">
                  KELAS X
                </span>
              </div>
              <p className="text-xs text-slate-700 hidden sm:block">
                Tubuh Bugar, Pikiran Segar, Prestasi Gemilang
              </p>
            </div>
          </div>

          {/* Desktop Right Info: Progress, Badges & Profile */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Progress indicator */}
            <button
              type="button"
              onClick={onOpenBadges}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition text-xs font-semibold"
              title="Klik untuk melihat lencana prestasi & progres"
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Progres: {Math.round(progressValue)}%</span>
              <div className="w-12 h-2 bg-amber-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
            </button>

            {/* Student Profile Quick Chip */}
            <button
              type="button"
              onClick={handleOpenProfile}
              className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 transition text-xs"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                {profile.nama.charAt(0)}
              </div>
              <div className="text-left">
                <div className="font-bold truncate max-w-[120px]">{profile.nama}</div>
                <div className="text-[10px] text-slate-700">{profile.kelas} • Absen {profile.noAbsen}</div>
              </div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            <button
              type="button"
              onClick={onOpenBadges}
              className="p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold"
            >
              ⭐ {Math.round(progressValue)}%
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Horizontal Tab Navigation */}
        <nav className="hidden lg:flex space-x-1 py-1.5 overflow-x-auto scrollbar-none border-t border-slate-100">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isItemActive(item.id);
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-lg">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-bold text-xs text-slate-800">{profile.nama}</p>
                <p className="text-[11px] text-slate-700">{profile.kelas} • No. {profile.noAbsen}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleOpenProfile();
              }}
              className="text-xs bg-blue-600 text-white px-2.5 py-1 rounded font-medium"
            >
              Edit Profil
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = isItemActive(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center space-x-2 p-2.5 rounded-lg text-xs font-medium text-left transition ${
                    isActive
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};
