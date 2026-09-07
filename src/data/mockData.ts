import {
  FitnessComponent,
  MatchingItem,
  QuizQuestion,
  EssayQuestion,
  StudentSubmissionRecord,
  LearningObjective,
  StudentProfile,
  WorkoutPos,
  TeacherReflection,
  StudentFeedbackItem,
  LKMData,
  StudentSelfReflection
} from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  nama: 'Gede Arya Wibawa',
  kelas: 'X-1',
  noAbsen: '12',
  namaGuru: 'Gde Bayu Indrayana, S.Pd.',
  tahunPelajaran: '2024/2025',
  tanggal: new Date().toISOString().split('T')[0],
  sekolah: 'SMA NEGERI 1 TEJAKULA'
};

export const LEARNING_OBJECTIVES: LearningObjective[] = [
  { id: 1, text: 'Menjelaskan pengertian kebugaran jasmani dengan bahasa sendiri.', completed: false },
  { id: 2, text: 'Mengidentifikasi manfaat kebugaran jasmani dalam kehidupan sehari-hari.', completed: false },
  { id: 3, text: 'Menganalisis hubungan antara kebugaran jasmani dan kesehatan.', completed: false },
  { id: 4, text: 'Mengidentifikasi 9 komponen-komponen kebugaran jasmani.', completed: false },
  { id: 5, text: 'Memberikan contoh aktivitas latihan untuk setiap komponen kebugaran jasmani.', completed: false },
  { id: 6, text: 'Melakukan refleksi terhadap kondisi kebugaran diri sendiri secara jujur.', completed: false },
  { id: 7, text: 'Menunjukkan sikap disiplin, tanggung jawab, kerja sama, dan semangat dalam pembelajaran.', completed: false }
];

export const FITNESS_COMPONENTS: FitnessComponent[] = [
  {
    id: 'kekuatan',
    name: 'Kekuatan',
    englishName: 'Strength',
    definition: 'Kemampuan otot atau sekelompok otot untuk mengatasi, menahan, atau melawan suatu beban maksimal.',
    activities: ['Push Up', 'Plank', 'Pull Up', 'Latihan beban ringan terawasi'],
    lifeExample: 'Mengangkat galon air, memindahkan meja belajar, atau membawa ransel buku sekolah yang berat tanpa cedera.',
    icon: 'BicepsFlexed',
    color: 'blue',
    gradient: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'daya-tahan',
    name: 'Daya Tahan',
    englishName: 'Endurance',
    definition: 'Kemampuan organ tubuh (terutama jantung, paru-paru, dan otot) untuk melakukan aktivitas fisik secara terus-menerus dalam waktu relatif lama tanpa mengalami kelelahan berlebih.',
    activities: ['Jogging (Lari santai)', 'Bersepeda jarak menengah', 'Berenang', 'Lari 12 menit (Cooper Test)'],
    lifeExample: 'Mampu berjalan kaki cukup jauh ke sekolah atau bermain sepak bola/basket hingga babak akhir tanpa kehabisan napas.',
    icon: 'HeartPulse',
    color: 'emerald',
    gradient: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'kecepatan',
    name: 'Kecepatan',
    englishName: 'Speed',
    definition: 'Kemampuan tubuh untuk melakukan gerakan-gerakan yang berkesinambungan dalam bentuk yang sama dalam waktu yang sesingkat-singkatnya.',
    activities: ['Sprint 50/100 meter', 'Lari cepat akselerasi pendek', 'Skipping cepat'],
    lifeExample: 'Berlari kencang mengejar bola terobosan di lapangan atau bergegas menyambut shuttlecock di bulutangkis.',
    icon: 'Zap',
    color: 'amber',
    gradient: 'from-amber-500 to-orange-600'
  },
  {
    id: 'kelentukan',
    name: 'Kelentukan',
    englishName: 'Flexibility',
    definition: 'Kemampuan persendian dan otot-otot di sekitarnya untuk bergerak secara leluasa dan maksimal dalam ruang gerak sendi (ROM) tanpa menimbulkan rasa sakit atau cedera.',
    activities: ['Peregangan statis & dinamis', 'Senam lantai (kayang, cium lutut)', 'Gerakan yoga dasar'],
    lifeExample: 'Membungkuk meraih benda yang jatuh di lantai atau menjangkau rak tinggi tanpa otot punggung kaku/tertarik.',
    icon: 'Smile',
    color: 'rose',
    gradient: 'from-rose-500 to-pink-600'
  },
  {
    id: 'kelincahan',
    name: 'Kelincahan',
    englishName: 'Agility',
    definition: 'Kemampuan seseorang untuk mengubah arah dan posisi tubuh atau bagian tubuh dengan cepat, tepat, dan terkontrol tanpa kehilangan keseimbangan.',
    activities: ['Shuttle Run (Lari bolak-balik)', 'Zig-zag Run melewati cone', 'Lari angka delapan (Figure 8)'],
    lifeExample: 'Menggiring bola berkelit dari hadangan lawan saat bermain futsal atau basket.',
    icon: 'Repeat',
    color: 'violet',
    gradient: 'from-violet-500 to-purple-600'
  },
  {
    id: 'keseimbangan',
    name: 'Keseimbangan',
    englishName: 'Balance',
    definition: 'Kemampuan seseorang mengendalikan organ saraf dan otot untuk mempertahankan posisi tubuh, baik dalam keadaan diam (statis) maupun saat bergerak (dinamis).',
    activities: ['Berdiri satu kaki (Sikap Kapal Terbang)', 'Berjalan di atas balok titian', 'Latihan Bosu Ball'],
    lifeExample: 'Tidak mudah jatuh saat terpeleset di jalan licin atau tetap stabil berdiri di dalam kendaraan umum yang bergerak.',
    icon: 'Scale',
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'koordinasi',
    name: 'Koordinasi',
    englishName: 'Coordination',
    definition: 'Kemampuan mengintegrasikan beberapa sistem gerak tubuh yang berbeda (mata, tangan, kaki) menjadi satu pola gerakan yang efisien, harmonis, dan tepat sasaran.',
    activities: ['Melempar dan menangkap bola tenis ke dinding', 'Menendang dan mengontrol bola', 'Juggling bola'],
    lifeExample: 'Memukul bola kasti tepat waktu menggunakan tongkat pemukul atau memadukan ayunan raket saat menerima servis.',
    icon: 'Sparkles',
    color: 'yellow',
    gradient: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'daya-ledak',
    name: 'Daya Ledak (Power)',
    englishName: 'Explosive Power',
    definition: 'Kemampuan otot untuk mengerahkan kekuatan maksimal dalam waktu yang sangat singkat (gabungan antara kekuatan dan kecepatan).',
    activities: ['Vertical Jump (Loncat tegak)', 'Standing Broad Jump (Lompat jauh tanpa awalan)', 'Medicine ball throw'],
    lifeExample: 'Melompat tinggi untuk melakukan smash bola voli atau menyundul bola sepak di udara.',
    icon: 'Flame',
    color: 'orange',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'reaksi',
    name: 'Kecepatan Reaksi',
    englishName: 'Reaction Time',
    definition: 'Kemampuan tubuh untuk bertindak atau merespons secepat mungkin setelah menerima suatu rangsangan (stimulus), baik berupa bunyi, visual, maupun sentuhan.',
    activities: ['Menangkap penggaris jatuh', 'Lari segera saat mendengar tiupan peluit', 'Merespons aba-aba lampu/suara'],
    lifeExample: 'Menghindar seketika saat ada bola liar yang meluncur ke arah wajah atau mengerem sepeda dengan sigap ketika ada rintangan mendadak.',
    icon: 'Timer',
    color: 'indigo',
    gradient: 'from-indigo-500 to-sky-600'
  }
];

export const MATCH_ITEMS: MatchingItem[] = [
  {
    id: 'm1',
    activity: 'Push Up',
    correctComponent: 'Kekuatan',
    explanation: 'Push Up berfokus pada kekuatan otot lengan, dada, dan bahu untuk mendorong dan menahan beban tubuh.'
  },
  {
    id: 'm2',
    activity: 'Sit Up',
    correctComponent: 'Kekuatan dan daya tahan otot',
    explanation: 'Sit Up melatih kekuatan serta daya tahan kontraksi otot perut (rectus abdominis) secara berulang.'
  },
  {
    id: 'm3',
    activity: 'Back Up',
    correctComponent: 'Kekuatan dan daya tahan otot',
    explanation: 'Back Up melatih kelompok otot punggung bawah dan tulang belakang untuk menahan postur tubuh.'
  },
  {
    id: 'm4',
    activity: 'Naik Turun Tangga',
    correctComponent: 'Daya tahan dan kekuatan otot tungkai',
    explanation: 'Gerakan naik turun tangga menguji kerja kardiorespirasi (jantung-paru) sekaligus menguatkan otot paha dan betis.'
  },
  {
    id: 'm5',
    activity: 'Lari Bolak-Balik (Shuttle Run)',
    correctComponent: 'Kelincahan',
    explanation: 'Shuttle Run melatih kecepatan mengubah arah gerak tubuh secara mendadak dengan tetap stabil.'
  },
  {
    id: 'm6',
    activity: 'Jongkok Bangun (Squat Thrust)',
    correctComponent: 'Kekuatan dan daya tahan otot tungkai',
    explanation: 'Jongkok bangun membebani otot quadriceps, hamstring, dan gluteus untuk berkontraksi secara dinamis.'
  },
  {
    id: 'm7',
    activity: 'Sprint 50 Meter',
    correctComponent: 'Kecepatan',
    explanation: 'Sprint jarak pendek menuntut pengerahan kecepatan lari maksimal dalam interval waktu sesingkat mungkin.'
  },
  {
    id: 'm8',
    activity: 'Peregangan Cium Lutut',
    correctComponent: 'Kelentukan',
    explanation: 'Peregangan statis ini mengukur luas ruang gerak sendi panggul dan elastisitas otot hamstring.'
  },
  {
    id: 'm9',
    activity: 'Berdiri Satu Kaki (Sikap Kapal Terbang)',
    correctComponent: 'Keseimbangan',
    explanation: 'Mempertahankan posisi satu kaki dengan badan condong ke depan melatih keseimbangan statis tubuh.'
  }
];

export const INITIAL_WORKOUT_POS: WorkoutPos[] = [
  {
    id: 1,
    title: 'POS 1 – PUSH UP',
    component: 'Kekuatan (Strength)',
    targetMuscle: 'Otot dada, bahu (deltoid), dan trisep',
    description: 'Posisikan tubuh telungkup lurus, tangan selebar bahu. Turunkan dada mendekati lantai lalu dorong kembali ke posisi awal dengan terkontrol.',
    repetitions: '',
    difficulty: '',
    feeling: '',
    notes: ''
  },
  {
    id: 2,
    title: 'POS 2 – SIT UP',
    component: 'Kekuatan & Daya Tahan Otot Perut',
    targetMuscle: 'Otot perut (abdominals) dan flexor panggul',
    description: 'Berbaring telentang dengan lutut ditekuk, tangan di samping telinga atau silang di dada. Angkat tubuh bagian atas hingga mendekati lutut lalu turunkan kembali.',
    repetitions: '',
    difficulty: '',
    feeling: '',
    notes: ''
  },
  {
    id: 3,
    title: 'POS 3 – BACK UP',
    component: 'Kekuatan & Daya Tahan Otot Punggung',
    targetMuscle: 'Otot punggung bawah (erector spinae) dan bokong',
    description: 'Telungkup dengan tangan di belakang kepala atau samping badan. Angkat dada dan kepala ke atas secara perlahan lalu kembali ke posisi rileks.',
    repetitions: '',
    difficulty: '',
    feeling: '',
    notes: ''
  },
  {
    id: 4,
    title: 'POS 4 – NAIK TURUN TANGGA',
    component: 'Daya Tahan Kardiorespirasi & Kekuatan Tungkai',
    targetMuscle: 'Jantung-paru, otot paha (quadriceps), dan betis',
    description: 'Langkahkan kaki kanan naik, disusul kaki kiri, lalu turunkan kaki kanan dan kiri secara ritmis dan konsisten selama waktu tertentu.',
    repetitions: '',
    difficulty: '',
    feeling: '',
    notes: ''
  },
  {
    id: 5,
    title: 'POS 5 – LARI BOLAK-BALIK (SHUTTLE RUN)',
    component: 'Kelincahan (Agility)',
    targetMuscle: 'Otot tungkai, sendi pergelangan kaki, dan koordinasi saraf',
    description: 'Berlari cepat antara dua titik berjarak 5 meter sebanyak 4-6 kali, menyentuh garis batas atau memindahkan balok kecil dengan lincah.',
    repetitions: '',
    difficulty: '',
    feeling: '',
    notes: ''
  },
  {
    id: 6,
    title: 'POS 6 – JONGKOK BANGUN (SQUAT)',
    component: 'Kekuatan & Daya Tahan Tungkai',
    targetMuscle: 'Otot paha depan, paha belakang, dan otot pinggul',
    description: 'Berdiri tegak dengan kaki selebar bahu. Turunkan pinggul seperti hendak duduk hingga paha sejajar lantai, lalu dorong tumit untuk kembali berdiri tegak.',
    repetitions: '',
    difficulty: '',
    feeling: '',
    notes: ''
  }
];

export const INITIAL_LKM: LKMData = {
  kegiatan1: {
    q1Kekuatan: 'Push Up dan Sit Up, karena menuntut kontraksi otot melawan gravitasi tubuh.',
    q2DayaTahan: 'Naik Turun Tangga dan Lari berulang, karena memacu kerja jantung dan paru-paru secara terus-menerus.',
    q3Kelincahan: 'Lari bolak-balik (shuttle run) karena tubuh harus berputar arah secara cepat.',
    q4AlasanBugar: 'Agar memiliki stamina prima saat belajar di sekolah, tidak mudah terserang penyakit, dan mampu beraktivitas tanpa cepat lelah.'
  },
  kegiatan2: {
    q1Faktor: 'Kurang melakukan aktivitas fisik (kurang olahraga), kebiasaan tidur larut malam (begadang), jarang sarapan bergizi, dan kurang konsumsi air putih.',
    q2HubunganFisik: 'Aktivitas fisik teratur merangsang adaptasi fisiologis jantung, paru-paru, dan otot, sehingga kapasitas kebugaran jasmani terus meningkat.',
    q3KebiasaanSehat: 'Berolahraga aerobik minimal 3 kali seminggu, tidur 7-8 jam per hari, makan makanan bernutrisi seimbang, dan mengurangi waktu menatap layar gadget.'
  },
  kegiatan3: [
    {
      aktivitas: 'Push Up',
      komponen: 'Kekuatan Otot (Strength)',
      alasan: 'Mendorong beban tubuh ke atas menggunakan kontraksi otot dada, bahu, dan lengan.'
    },
    {
      aktivitas: 'Lari Bolak-Balik (Shuttle Run)',
      komponen: 'Kelincahan (Agility)',
      alasan: 'Mengubah arah gerak tubuh secara cepat dari satu titik ke titik lain.'
    },
    {
      aktivitas: 'Peregangan Cium Lutut',
      komponen: 'Kelentukan (Flexibility)',
      alasan: 'Meregangkan serabut otot paha belakang (hamstring) dan ruang gerak sendi panggul.'
    },
    {
      aktivitas: 'Berdiri Satu Kaki',
      komponen: 'Keseimbangan (Balance)',
      alasan: 'Menjaga pusat gravitasi tubuh agar tidak goyah atau terjatuh saat bertumpu pada satu titik kaki.'
    },
    {
      aktivitas: 'Sprint 50 Meter',
      komponen: 'Kecepatan (Speed)',
      alasan: 'Menempuh jarak lintasan lurus dalam tempo waktu sesingkat-singkatnya.'
    }
  ],
  kegiatan4: [
    {
      hari: 'Senin',
      aktivitas: 'Jogging santai di lapangan sekolah & peregangan',
      durasi: '25 menit',
      target: 'Denyut nadi meningkat teratur, badan terasa segar'
    },
    {
      hari: 'Rabu',
      aktivitas: 'Latihan beban tubuh: Push Up, Sit Up, dan Squat',
      durasi: '20 menit',
      target: 'Mampu menyelesaikan masing-masing 15 repetisi'
    },
    {
      hari: 'Jumat',
      aktivitas: 'Bermain bulutangkis santai bersama teman',
      durasi: '30 menit',
      target: 'Melatih kelincahan kaki dan koordinasi mata-tangan'
    }
  ]
};

export const INITIAL_SELF_REFLECTION: StudentSelfReflection = {
  q1PengetahuanBaru: 'Saya memahami bahwa seseorang yang bertubuh besar belum tentu memiliki kebugaran jantung yang baik, dan kebugaran mencakup 9 komponen yang saling melengkapi.',
  q2KomponenDipahami: 'Kekuatan, Daya Tahan, dan Kelincahan melalui simulasi sirkuit dan permainan cocokkan komponen.',
  q3AktivitasMenantang: 'Pos 5 Lari bolak-balik (shuttle run) karena menuntut percepatan dan pengereman kaki yang lincah.',
  q4KondisiBugar: 'Baik',
  q4Alasan: 'Saya merasa bugar dan bersemangat mengikuti aktivitas, meskipun sedikit terengah-engah saat lari cepat.',
  q5KebiasaanDitingkatkan: 'Tidur tepat waktu sebelum pukul 22.00 dan selalu sarapan pagi sebelum berangkat sekolah.',
  q6TargetPribadi: 'Rutin jogging 2-3 kali seminggu serta mampu melakukan push up 20 kali secara sempurna.',
  skalaPemahaman: 5
};

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Kemampuan seseorang untuk melakukan aktivitas fisik sehari-hari secara efektif dan efisien tanpa mengalami kelelahan yang berlebihan serta masih memiliki cadangan energi untuk melakukan aktivitas lainnya disebut...',
    options: [
      { key: 'A', text: 'Keterampilan gerak olahraga' },
      { key: 'B', text: 'Kebugaran jasmani' },
      { key: 'C', text: 'Kesehatan lingkungan' },
      { key: 'D', text: 'Prestasi olahraga atlet' }
    ],
    correctAnswer: 'B',
    explanation: 'Definisi baku kebugaran jasmani (physical fitness) adalah kapasitas tubuh menyelesaikan tugas harian tanpa kelelahan berarti serta menyisakan energi cadangan untuk keperluan darurat atau rekreasi.'
  },
  {
    id: 2,
    question: 'Aktivitas lari bolak-balik (shuttle run) sejauh 5 meter yang dilakukan berulang kali terutama bertujuan untuk mengukur dan melatih komponen...',
    options: [
      { key: 'A', text: 'Kelentukan (Flexibility)' },
      { key: 'B', text: 'Kelincahan (Agility)' },
      { key: 'C', text: 'Keseimbangan (Balance)' },
      { key: 'D', text: 'Daya ledak (Power)' }
    ],
    correctAnswer: 'B',
    explanation: 'Lari bolak-balik (shuttle run) menuntut kemampuan mengubah arah tubuh secara cepat dan tepat, yang merupakan esensi dari komponen kelincahan (agility).'
  },
  {
    id: 3,
    question: 'Siswa yang memiliki kebugaran jasmani yang baik saat mengikuti kegiatan belajar mengajar di sekolah umumnya menunjukkan ciri-ciri...',
    options: [
      { key: 'A', text: 'Cepat mengantuk di kelas setelah jam istirahat' },
      { key: 'B', text: 'Fokus dan konsentrasi belajar lebih terjaga serta tidak mudah lelah' },
      { key: 'C', text: 'Menghindari semua kegiatan yang memerlukan kerja kelompok' },
      { key: 'D', text: 'Hanya aktif saat jam istirahat dan pasif di kelas' }
    ],
    correctAnswer: 'B',
    explanation: 'Sirkulasi darah yang lancar dan suplai oksigen yang optimal ke otak pada orang yang bugar meningkatkan konsentrasi, daya ingat, dan stamina belajar.'
  },
  {
    id: 4,
    question: 'Latihan Push Up dan Plank secara teratur terutama bermanfaat untuk meningkatkan komponen kebugaran jasmani yaitu...',
    options: [
      { key: 'A', text: 'Kekuatan dan daya tahan otot lengan, bahu, dan core tubuh' },
      { key: 'B', text: 'Kelincahan dan kecepatan kaki' },
      { key: 'C', text: 'Kelentukan sendi pergelangan kaki' },
      { key: 'D', text: 'Kecepatan reaksi pendengaran' }
    ],
    correctAnswer: 'A',
    explanation: 'Push Up membebani otot dada, trisep, dan deltoid, sedangkan plank mengunci otot perut (core) dan bahu untuk membangun kekuatan statis serta daya tahan otot.'
  },
  {
    id: 5,
    question: 'Kemampuan persendian beserta jaringan otot sekitarnya untuk melakukan gerakan dalam ruang gerak sendi yang seluas-luasnya tanpa cedera disebut...',
    options: [
      { key: 'A', text: 'Kekuatan (Strength)' },
      { key: 'B', text: 'Kelentukan (Flexibility)' },
      { key: 'C', text: 'Kecepatan (Speed)' },
      { key: 'D', text: 'Keseimbangan (Balance)' }
    ],
    correctAnswer: 'B',
    explanation: 'Kelentukan atau fleksibilitas adalah kemampuan sendi untuk bergerak leluasa sesuai ruang gerak anatomisnya (Range of Motion).'
  },
  {
    id: 6,
    question: 'Andi rajin berolahraga futsal 3 kali seminggu, namun ia memiliki kebiasaan sering tidur larut malam (pukul 02.00) dan jarang sarapan pagi. Dampak kebiasaan Andi terhadap kesehatannya adalah...',
    options: [
      { key: 'A', text: 'Kesehatannya tetap prima 100% karena tertolong oleh olahraga rutin' },
      { key: 'B', text: 'Tidak optimal karena kebugaran harus diimbangi dengan istirahat cukup dan nutrisi seimbang' },
      { key: 'C', text: 'Ototnya akan tumbuh lebih cepat daripada orang yang cukup tidur' },
      { key: 'D', text: 'Daya tahan tubuhnya akan semakin kebal dari penyakit menular' }
    ],
    correctAnswer: 'B',
    explanation: 'Olahraga hanyalah salah satu pilar gaya hidup sehat. Tanpa tidur cukup (fase regenerasi sel) dan gizi seimbang, tubuh akan mengalami stres metabolik dan penurunan imunitas.'
  },
  {
    id: 7,
    question: 'Contoh aktivitas olahraga yang paling efektif untuk melatih dan menguji daya tahan kardiorespirasi (jantung dan paru-paru) adalah...',
    options: [
      { key: 'A', text: 'Lompat tinggi satu kali' },
      { key: 'B', text: 'Jogging santai secara berkesinambungan selama 20-30 menit' },
      { key: 'C', text: 'Mengangkat barbel berat sebanyak 2 repetisi' },
      { key: 'D', text: 'Peregangan leher statis selama 10 detik' }
    ],
    correctAnswer: 'B',
    explanation: 'Aktivitas aerobik berdurasi relatif panjang seperti jogging kontinu menuntut kapasitas sistem jantung-paru menghirup dan mendistribusikan oksigen secara efisien.'
  },
  {
    id: 8,
    question: 'Seorang penjaga gawang sepak bola yang sigap meloncat menepis bola tembakan keras dari penyerang lawan sangat mengandalkan komponen kebugaran...',
    options: [
      { key: 'A', text: 'Kelentukan statis saja' },
      { key: 'B', text: 'Kecepatan reaksi dan daya ledak (power)' },
      { key: 'C', text: 'Daya tahan aerobik 12 menit' },
      { key: 'D', text: 'Keseimbangan statis satu kaki' }
    ],
    correctAnswer: 'B',
    explanation: 'Kiper membutuhkan kecepatan reaksi kilat untuk merespons arah datangnya bola serta daya ledak otot tungkai untuk mendorong lompatan penyelamatan yang eksplosif.'
  },
  {
    id: 9,
    question: 'Kemampuan seseorang untuk mempertahankan posisi tubuh tetap stabil, baik saat berada dalam kondisi diam maupun saat sedang bergerak disebut...',
    options: [
      { key: 'A', text: 'Keseimbangan (Balance)' },
      { key: 'B', text: 'Koordinasi (Coordination)' },
      { key: 'C', text: 'Daya Tahan (Endurance)' },
      { key: 'D', text: 'Kecepatan (Speed)' }
    ],
    correctAnswer: 'A',
    explanation: 'Keseimbangan terbagi menjadi keseimbangan statis (misal berdiri satu kaki) dan dinamis (misal berjalan di atas balok titian atau skateboard).'
  },
  {
    id: 10,
    question: 'Pernyataan berikut ini yang BENAR mengenai hubungan antara ukuran bentuk tubuh seseorang dengan tingkat kebugaran jasmaninya adalah...',
    options: [
      { key: 'A', text: 'Orang yang bertubuh kurus pasti memiliki kebugaran jasmani yang paling buruk' },
      { key: 'B', text: 'Orang yang bertubuh kekar/besar otomatis memiliki daya tahan jantung yang paling prima' },
      { key: 'C', text: 'Ukuran tubuh tidak menjamin tingkat kebugaran; kebugaran ditentukan oleh fungsi fisiologis organ dan latihan rutin' },
      { key: 'D', text: 'Hanya atlet profesional berbadan tinggi yang bisa bugar' }
    ],
    correctAnswer: 'C',
    explanation: 'Kebugaran jasmani dinilai dari fungsi organ (jantung, paru, otot, fleksibilitas) dan efisiensi kerja tubuh, bukan sekadar ukuran fisik atau berat badan luar.'
  },
  {
    id: 11,
    question: 'Aktivitas melempar bola tenis ke dinding dengan tangan kanan kemudian menangkapnya kembali menggunakan tangan kiri secara berulang merupakan bentuk latihan untuk melatih komponen...',
    options: [
      { key: 'A', text: 'Koordinasi mata dan tangan' },
      { key: 'B', text: 'Daya tahan otot paha' },
      { key: 'C', text: 'Kelentukan sendi panggul' },
      { key: 'D', text: 'Kecepatan lari sprint' }
    ],
    correctAnswer: 'A',
    explanation: 'Latihan tersebut menyinkronkan persepsi visual (mata) dengan respon motorik kedua tangan, yang merupakan bentuk latihan koordinasi motorik.'
  },
  {
    id: 12,
    question: 'Sebelum melakukan aktivitas latihan kebugaran berintensitas sedang hingga berat di lapangan sekolah, peserta didik diwajibkan melakukan pemanasan (warming-up) dengan tujuan...',
    options: [
      { key: 'A', text: 'Menghabiskan tenaga agar saat latihan inti tidak terlalu lelah' },
      { key: 'B', text: 'Menaikkan suhu tubuh, melumasi sendi, dan mencegah terjadinya cedera otot' },
      { key: 'C', text: 'Menurunkan detak jantung sedalam mungkin' },
      { key: 'D', text: 'Menggantikan fungsi pendinginan (cooling down)' }
    ],
    correctAnswer: 'B',
    explanation: 'Pemanasan meningkatkan aliran darah ke otot, meningkatkan kelenturan jaringan elastis tubuh, dan mempersiapkan sistem saraf-jantung menghadapi beban gerak.'
  },
  {
    id: 13,
    question: 'Daya ledak (muscular power) merupakan hasil perpaduan harmonis antara dua komponen kebugaran jasmani, yaitu...',
    options: [
      { key: 'A', text: 'Kekuatan dan Kecepatan' },
      { key: 'B', text: 'Kelentukan dan Keseimbangan' },
      { key: 'C', text: 'Daya Tahan dan Kelincahan' },
      { key: 'D', text: 'Koordinasi dan Waktu Reaksi' }
    ],
    correctAnswer: 'A',
    explanation: 'Secara rumus biomekanika, Daya Ledak (Power) = Gaya (Kekuatan) × Kecepatan. Otot mengerahkan tenaga besar dalam tempo sepersekian detik.'
  },
  {
    id: 14,
    question: 'Manfaat kebugaran jasmani dari aspek sosial dan mental bagi seorang peserta didik di lingkungan SMA Negeri 1 Tejakula antara lain adalah...',
    options: [
      { key: 'A', text: 'Menumbuhkan rasa percaya diri, disiplin, sportif, dan kemampuan bekerja sama dalam tim' },
      { key: 'B', text: 'Merasa lebih unggul sehingga meremehkan teman yang kurang aktif' },
      { key: 'C', text: 'Mengabaikan pelajaran teori lain demi berolahraga seharian penuh' },
      { key: 'D', text: 'Menghindari interaksi sosial karena fokus berlatih sendiri' }
    ],
    correctAnswer: 'A',
    explanation: 'Melalui aktivitas kebugaran dan PJOK, siswa mengembangkan nilai-nilai karakter luhur: sportivitas, disiplin waktu, regulasi emosi, dan solidaritas sosial.'
  },
  {
    id: 15,
    question: 'Setelah menyelesaikan sesi latihan kebugaran jasmani yang berat, peserta didik dianjurkan melakukan pendinginan (cooling down) agar...',
    options: [
      { key: 'A', text: 'Asam laktat terurai bertahap, denyut nadi kembali normal, dan mencegah pusing/kram' },
      { key: 'B', text: 'Otot langsung kaku dan mengeras seketika' },
      { key: 'C', text: 'Suhu tubuh tetap berada pada titik terpanas' },
      { key: 'D', text: 'Keringat tidak keluar lagi sama sekali' }
    ],
    correctAnswer: 'A',
    explanation: 'Pendinginan mengembalikan peredaran darah secara bertahap ke kondisi istirahat (homeostasis), mencegah darah terkumpul mendadak di ekstremitas bawah (venous pooling).'
  }
];

export const ESSAY_QUESTIONS: EssayQuestion[] = [
  {
    id: 1,
    question: 'Jelaskan pengertian kebugaran jasmani dengan menggunakan kalimatmu sendiri, serta berikan contoh nyata dalam kehidupan sehari-harimu sebagai peserta didik kelas X!',
    rubric: 'Menjelaskan konsep energi cadangan, kemampuan fisik beraktivitas tanpa kelelahan berlebih, dan contoh aktivitas realistis siswa.',
    modelAnswer: 'Kebugaran jasmani adalah kesanggupan tubuh untuk beraktivitas sehari-hari (seperti berjalan/bersepeda ke sekolah, mengikuti pelajaran, piket kelas, dan bermain) secara efektif dan efisien tanpa kelelahan berlebihan, serta masih menyimpan tenaga cadangan untuk belajar di malam hari atau keadaan mendesak.',
    studentAnswer: ''
  },
  {
    id: 2,
    question: 'Mengapa kebugaran jasmani dan kesehatan tidak bisa dipisahkan, namun kesehatan tidak semata-mata dipengaruhi oleh aktivitas fisik saja? Analisis faktor-faktor pendukung lainnya!',
    rubric: 'Menghubungkan olahraga teratur dengan fungsi organ, serta menyebutkan faktor gizi/makanan bergizi, istirahat/tidur teratur, asupan air minum, dan kesehatan mental/manajemen stres.',
    modelAnswer: 'Kebugaran jasmani menguatkan jantung, paru, dan otot. Namun kesehatan bersifat holistik (menyeluruh). Jika seseorang rajin olahraga tetapi kurang tidur, makan tidak sehat, dehidrasi, atau stres berat, tubuhnya rentan terserang penyakit. Oleh karena itu, olahraga harus beriringan dengan gizi seimbang, tidur 7-8 jam, dan kebersihan diri.',
    studentAnswer: ''
  },
  {
    id: 3,
    question: 'Sebutkan minimal 4 komponen kebugaran jasmani yang berhubungan dengan keterampilan gerak (skill-related fitness) dan berikan masing-masing 1 contoh bentuk latihan untuk meningkatkannya!',
    rubric: 'Menyebutkan 4 komponen keterampilan (Kecepatan, Kelincahan, Keseimbangan, Koordinasi, Daya Ledak, Waktu Reaksi) beserta contoh latihannya.',
    modelAnswer: '1) Kelincahan (Agility): Latihan lari zig-zag atau shuttle run. 2) Kecepatan (Speed): Latihan lari sprint 50 meter. 3) Keseimbangan (Balance): Latihan berdiri satu kaki di atas balok titian. 4) Koordinasi (Coordination): Latihan lempar tangkap bola tenis ke dinding.',
    studentAnswer: ''
  },
  {
    id: 4,
    question: 'Dalam studi kasus: "Dua orang siswa sama-sama pintar secara akademik, namun salah satu siswa selalu mengeluh lemas dan cepat letih saat jam olahraga di lapangan". Analisislah apa penyebab kondisi tersebut dan berikan solusi nyata untuk memperbaikinya!',
    rubric: 'Menganalisis kurangnya adaptasi kardiorespirasi/kebiasaan sedentari (jarang bergerak) dan memberikan rekomendasi latihan bertahap serta perbaikan pola hidup.',
    modelAnswer: 'Penyebabnya adalah tingkat kebugaran jasmani (terutama daya tahan kardiorespirasi dan kekuatan otot) siswa tersebut rendah akibat gaya hidup pasif (sedentary lifestyle), kurang berjemur/bergerak, atau pola tidur buruk. Solusinya: Mulai melakukan aktivitas fisik ringan bertahap seperti jalan cepat 20 menit tiap pagi, perbanyak minum air putih, tidur teratur, dan membiasakan peregangan aktif.',
    studentAnswer: ''
  },
  {
    id: 5,
    question: 'Rancanglah sebuah rencana aktivitas fisik sederhana dan realistis selama 1 minggu yang dapat kamu lakukan di rumah secara konsisten untuk menjaga kebugaran jasmani!',
    rubric: 'Menyusun jadwal mingguan dengan prinsip FITT sederhana (Frekuensi, Intensitas, Waktu, Tipe) yang aman dilakukan di rumah.',
    modelAnswer: 'Senin: Pemanasan + Jogging 20 menit + Pendinginan. Rabu: Latihan push up, sit up, dan plank (3 set × 10 repetisi). Jumat: Bersepeda santai keliling desa 30 menit. Minggu: Senam pagi atau bermain bulutangkis bersama keluarga/teman selama 45 menit.',
    studentAnswer: ''
  }
];

export const INITIAL_CLASS_RECORDS: StudentSubmissionRecord[] = [
  {
    id: 'sub-1',
    studentId: 'sub-1',
    studentName: 'I Gede Aditya Wibawa',
    nama: 'I Gede Aditya Wibawa',
    kelas: 'X-1',
    noAbsen: '08',
    tanggal: '2026-09-06',
    quizScore: 93,
    nilaiEvaluasi: 93,
    skorEvaluasi: 14,
    totalSoal: 15,
    fitnessCategory: '🌟 Sangat Baik',
    kategori: '🌟 Sangat Baik',
    isSubmitted: true,
    status: 'Sudah Selesai',
    lkmStatus: 'Selesai',
    lkmCompleted: true,
    refleksiCompleted: true,
    suaraGuruCompleted: true,
    kepuasanRating: 5,
    suaraAnonim: false,
    saranGuru: 'Pembelajaran sangat seru! Penjelasan materi dan animasinya sangat jelas.',
    personalTarget: 'Rutin jogging 3 kali seminggu setiap pagi.',
    targetPribadi: 'Rutin jogging 3 kali seminggu setiap pagi.'
  },
  {
    id: 'sub-2',
    studentId: 'sub-2',
    studentName: 'Ni Kadek Sintya Dewi',
    nama: 'Ni Kadek Sintya Dewi',
    kelas: 'X-1',
    noAbsen: '19',
    tanggal: '2026-09-06',
    quizScore: 87,
    nilaiEvaluasi: 87,
    skorEvaluasi: 13,
    totalSoal: 15,
    fitnessCategory: '👍 Baik',
    kategori: '👍 Baik',
    isSubmitted: true,
    status: 'Sudah Selesai',
    lkmStatus: 'Selesai',
    lkmCompleted: true,
    refleksiCompleted: true,
    suaraGuruCompleted: true,
    kepuasanRating: 5,
    suaraAnonim: false,
    saranGuru: 'Mohon tambahkan lebih banyak video praktik sirkuit latihan di lapangan.',
    personalTarget: 'Mampu melakukan push up dan plank 1 menit tanpa henti.',
    targetPribadi: 'Mampu melakukan push up dan plank 1 menit tanpa henti.'
  },
  {
    id: 'sub-3',
    studentId: 'sub-3',
    studentName: 'I Putu Bagus Aryanta',
    nama: 'I Putu Bagus Aryanta',
    kelas: 'X-2',
    noAbsen: '04',
    tanggal: '2026-09-05',
    quizScore: 80,
    nilaiEvaluasi: 80,
    skorEvaluasi: 12,
    totalSoal: 15,
    fitnessCategory: '👍 Baik',
    kategori: '👍 Baik',
    isSubmitted: true,
    status: 'Sudah Selesai',
    lkmStatus: 'Selesai',
    lkmCompleted: true,
    refleksiCompleted: true,
    suaraGuruCompleted: true,
    kepuasanRating: 4,
    suaraAnonim: true,
    saranGuru: 'Game cocokkan komponen sangat membantu menghafal materi!',
    personalTarget: 'Mengurangi begadang dan rajin sarapan sebelum sekolah.',
    targetPribadi: 'Mengurangi begadang dan rajin sarapan sebelum sekolah.'
  },
  {
    id: 'sub-4',
    studentId: 'sub-4',
    studentName: 'Ni Wayan Manik Mas',
    nama: 'Ni Wayan Manik Mas',
    kelas: 'X-2',
    noAbsen: '23',
    tanggal: '2026-09-05',
    quizScore: 73,
    nilaiEvaluasi: 73,
    skorEvaluasi: 11,
    totalSoal: 15,
    fitnessCategory: '📚 Cukup',
    kategori: '📚 Cukup',
    isSubmitted: true,
    status: 'Sudah Selesai',
    lkmStatus: 'Selesai',
    lkmCompleted: true,
    refleksiCompleted: true,
    suaraGuruCompleted: true,
    kepuasanRating: 4,
    suaraAnonim: false,
    saranGuru: 'Bagus sekali websitenya, ringan dibuka lewat handphone.',
    personalTarget: 'Berlatih kelentukan dengan peregangan rutin tiap bangun tidur.',
    targetPribadi: 'Berlatih kelentukan dengan peregangan rutin tiap bangun tidur.'
  },
  {
    id: 'sub-5',
    studentId: 'sub-5',
    studentName: 'I Komang Dharma Putra',
    nama: 'I Komang Dharma Putra',
    kelas: 'X-1',
    noAbsen: '15',
    tanggal: '2026-09-06',
    quizScore: 100,
    nilaiEvaluasi: 100,
    skorEvaluasi: 15,
    totalSoal: 15,
    fitnessCategory: '🌟 Sangat Baik',
    kategori: '🌟 Sangat Baik',
    isSubmitted: true,
    status: 'Sudah Selesai',
    lkmStatus: 'Selesai',
    lkmCompleted: true,
    refleksiCompleted: true,
    suaraGuruCompleted: true,
    kepuasanRating: 5,
    suaraAnonim: false,
    saranGuru: 'Pak Guru mengajar dengan sangat ramah dan memotivasi siswa.',
    personalTarget: 'Menjaga rekor shuttle run di bawah 11 detik.',
    targetPribadi: 'Menjaga rekor shuttle run di bawah 11 detik.'
  },
  {
    id: 'sub-6',
    studentId: 'sub-6',
    studentName: 'Ni Nyoman Ayu Lestari',
    nama: 'Ni Nyoman Ayu Lestari',
    kelas: 'X-3',
    noAbsen: '27',
    tanggal: '2026-09-04',
    quizScore: 67,
    nilaiEvaluasi: 67,
    skorEvaluasi: 10,
    totalSoal: 15,
    fitnessCategory: '💪 Perlu Berlatih',
    kategori: '💪 Perlu Berlatih',
    isSubmitted: false,
    status: 'Sedang Mengerjakan',
    lkmStatus: 'Proses',
    lkmCompleted: false,
    refleksiCompleted: false,
    suaraGuruCompleted: false,
    kepuasanRating: 3,
    suaraAnonim: false,
    saranGuru: 'Masih agak bingung membedakan daya tahan dan daya ledak.',
    personalTarget: 'Membaca ulang materi komponen kebugaran.',
    targetPribadi: 'Membaca ulang materi komponen kebugaran.'
  }
];

export const INITIAL_FEEDBACK_LIST: StudentFeedbackItem[] = [
  {
    id: 'fb-1',
    studentName: 'I Gede Aditya Wibawa',
    kelas: 'X-1',
    isAnonymous: false,
    funMaterial: 'Aktivitas Praktik Sirkuit 6 Pos dan Game Cocokkan Komponen',
    difficultPart: 'Menghafal perbedaan reaksi dan kelincahan',
    atmosphere: '🎉 Sangat Menyenangkan',
    suggestedActivity: 'Permainan estafet kebugaran berkelompok di lapangan',
    messageToTeacher: 'Terima kasih Pak Guru! Pembelajarannya sangat seru dan tidak membosankan.',
    timestamp: '06/09/2026, 09:30'
  },
  {
    id: 'fb-2',
    studentName: 'Ni Kadek Sintya Dewi',
    kelas: 'X-1',
    isAnonymous: false,
    funMaterial: 'Infografis interaktif manfaat kebugaran bagi otak dan tubuh',
    difficultPart: 'Latihan Push Up repetisi tinggi',
    atmosphere: '🎉 Sangat Menyenangkan',
    suggestedActivity: 'Senam irama aerobik bersama diiringi musik kekinian',
    messageToTeacher: 'Bapak mengajarnya sangat sabar dan memotivasi kami untuk aktif bergerak.',
    timestamp: '06/09/2026, 09:45'
  },
  {
    id: 'fb-3',
    studentName: 'Anonim',
    kelas: 'X-2',
    isAnonymous: true,
    funMaterial: 'Game Cocokkan Komponen & Kuis Interaktif',
    difficultPart: 'Memahami studi kasus hubungan tidur dan olahraga',
    atmosphere: '😊 Menyenangkan',
    suggestedActivity: 'Latihan fleksibilitas yoga / stretching outdoor',
    messageToTeacher: 'Semoga minggu depan ada waktu lebih banyak untuk praktik game di lapangan.',
    timestamp: '05/09/2026, 11:15'
  }
];

export const INITIAL_TEACHER_REFLECTION: TeacherReflection = {
  q1SeluruhSiswaAktif: 'Ya, seluruh peserta didik menunjukkan antusiasme tinggi baik saat menyimak materi interaktif maupun saat beraktivitas di pos-pos sirkuit latihan lapangan.',
  q2MateriMudah: 'Pengertian kebugaran jasmani, konsep energi cadangan, dan komponen kekuatan otot melalui aktivitas push up dan sit up.',
  q3MateriPerluPenguatan: 'Perbedaan daya ledak (power) dengan kekuatan statis, serta teknik lari bolak-balik (shuttle run) yang memerlukan perlambatan dan percepatan tiba-tiba.',
  q4AlokasiWaktu: 'Alokasi waktu 2 x 45 menit mencukupi dengan baik berkat panduan stopwatch digital dan LKPD interaktif yang terstruktur.',
  q5PerbaikanBerikutnya: 'Menambah variasi stasiun permainan estafet kelincahan beregu dan memberikan demonstrasi koreksi postur tubuh yang lebih intensif.',
  catatanTindakLanjut: 'Memberikan program penguatan mandiri melalui rencana aktivitas mingguan yang telah dibuat siswa di LKM.',
  catatanRemedialPengayaan: 'Remedial: bimbingan konsep komponen kebugaran untuk siswa dengan nilai < 75. Pengayaan: penyusunan program latihan sirkuit mandiri 2 minggu.',
  updatedAt: new Date().toISOString().split('T')[0]
};
