// ============================================================
//  birthdayData.js  —  EDIT FILE INI UNTUK GANTI ISI WEBSITE
// ============================================================

export const birthdayData = {
  // ---------- Identitas ----------
  name: 'Afzaal',
  fullName: 'Afzaal Isnaufal',
  from: 'Cleosa',
  birthdayDate: '2026-10-03',

  // ⚠️ GANTI! Format: YYYY-MM-DD (tanggal pertama kali kalian chat)
  firstChatDate: '2026-04-04',

  // ---------- Opening ----------
  entrance: {
    whisper: 'psst... someone left you a message.',
    hint: 'kayaknya ini buat kamu deh.',
    beforeTitle: 'Before we let you in...',
    beforeText: 'Aku mau tanya satu hal dulu.',
    question: 'First Contact?',
    button: 'Boleh masuk? ♡',
    wrong: 'Hmm... kayaknya kamu lupa awal mula kita. 🐈',
    right: 'Nahhh, kamu inget. ♡',
    empty: 'Isi tanggalnya dulu ya. 🐈',
  },

  // ---------- Chapters ----------
  chapters: [
    { id: 'note', no: '01', title: 'A little note' },
    { id: 'happy', no: '02', title: 'Things that make Afzaal happy' },
    { id: 'wishes', no: '03', title: 'Your birthday wishes' },
    { id: 'date', no: '04', title: 'Tomorrow, just us' },
    { id: 'memories', no: '05', title: 'Our little memories' },
    { id: 'heart', no: '06', title: 'From my heart' },
    { id: 'birthday', no: '07', title: 'Happy birthday' },
  ],

  // ---------- 01 A Little Note ----------
  note: {
    lines: [
      'I wanted to make something a little different for your birthday.',
      'So, I made this little corner of the internet filled with a few things about you, about us, and a little message from me.',
      'I hope you enjoy every little part of it. ♡',
    ],
    signature: 'With love, Cleosa',
  },

  // ---------- 02 Things That Make Afzaal Happy ----------
  happyCards: [
    {
      id: 'Me',
      no: '01',
      emoji: '🫶🏻',
      title: 'Me :P',
      photo: '/images/memories/us.jpg',
      joke: 'maybe?',
      lines: [
        'Pasti kamu happy kan kalo ketemu aku.',
        'HEHEHEH maaf pede, bercanda aja. Aku kan kalah sama persib',
      ],
      easterEgg: '😭😭😭',
    },
    {
      id: 'game',
      no: '02',
      emoji: '🎮',
      title: 'Valorant & Games',
      photo: '/images/memories/game.jpg',
      lines: [
        'Kalau ada waktu senggang, pelariannya pasti ke game.',
        'Entah Valorant atau game lainnya, yang penting main dulu.',
      ],
      joke: '"Lagi apa?" "Main valo."',
      jokeBy: '— famous last words.',
      easterEgg: 'Valorant lagi? 😭',
    },
    {
      id: 'persib',
      no: '02',
      emoji: '💙',
      title: 'Persib',
      photo: '/images/memories/persib.jpg',
      lines: [
        'He always chooses Persib over me.',
        'I have accepted my fate. 😔',
        'Kalau Persib main, ya sudah... aku cuma bisa menunggu.',
      ],
      easterEgg: 'iya iya aku tau kamu suka Persib.',
    },
    {
      id: 'food',
      no: '03',
      emoji: '🍜',
      title: 'Kuliner',
      photo: '/images/food/food.jpg',
      lines: [
        'Hunting makanan, nyobain tempat baru, cari makanan enak ke mana-mana...',
        'Tapi menurutku, hunting-nya lebih seru bareng aku kan? Hehe. ♡',
      ],
    },
  ],


  // YAY ---------- 03 Wishes ----------
  wishes: {
    lines: [
      'Kalau 3 hal tadi masih belum cukup bikin kamu happy di hari ulang tahun kamu...',
      'coba bilang 4 hal yang kamu mau.',
      'Nanti aku usahain buat ngabulin satu-satu.',
      'Kalau bisa yaa...',
      'jangan minta yang aneh-aneh. 🤨',
    ],
    // Label untuk setiap input wish (ganti kalau mau)
    labels: [
      'Wish 1',
      'Wish 2',
      'Wish 3',
      'Wish 4♡',
    ],
    count: 4,
    button: 'KIRIM WISH AKU ♡',
    success: 'Oke... aku terima 4 permintaan kamu. 👀',
    storageKey: 'afzaal-birthday-wishes',
  },

  // ---------- 04 Itinerary ----------
  date: {
    title: 'Tomorrow, just us ♡',
    dateLabel: '03 October 2026',
    dressCode: 'Dress code: maroon (kesukaan kamu)',
    outfit: {
      heading: 'Outfit check',
      note: 'Atasan: maroon (wajib). Bawahan: bebas, asal jangan aneh-aneh.',
      pickLabel: 'pilih bawahannya:',
      bottoms: [
        { key: 'jeans', label: 'Jeans', color: '#4a6fa5', reply: 'Casual vibes! Maroon + jeans combo yang timeless. 👖' },
        { key: 'cargo', label: 'Cargo', color: '#4a5a4a', reply: 'Keren! Cargo bikin look kamu makin asik. 🖤' },
        { key: 'chino', label: 'Chino', color: '#c2b28f', reply: 'Rapi dan cakep! Chino emang ga pernah salah. ✨' },
        { key: 'hitam', label: 'Celana hitam', color: '#222222', reply: 'Klasik. Maroon dan hitam itu pasangan serasi. 🖤' },
        { key: 'short', label: 'Short pants', color: '#8a6a58', reply: 'Santai banget. Cocok buat jalan-jalan chill. 🤎' },
        { key: 'bebas', label: 'Bebas, kamu pilih aja 🤨', color: '#cccccc', reply: 'Yeee terserah kamu deh, pokoknya harus cakep! 👀' },
      ],
    },
    stops: [
      { id: 's1', time: '06:00', title: 'The mission begins', emoji: '🌤️', text: ['Bangun pagi, siap-siap, terus izin Mama.'] },
      { id: 's2', time: '07:30', title: 'Come pick me up', emoji: '🚗', text: ['Estimasi kamu sampai dan jemput aku.', 'tapi kalo aku ngantuk undur dikit ya hehe ♡'] },
      { id: 's3', time: '08:00-ish', title: 'First stop: sarapan', emoji: '🥐', text: ['Sarapan dulu biar ga masuk ugd.'] },
      { id: 's4', time: '10:00-ish', title: 'Second stop: café cantik', emoji: '☕', text: ['For celebrate ur birthday sayangg!'] },
      {
        id: 's5', time: '13:00-ish', title: 'Third stop: you decide', emoji: '🎲',
        text: ['Mau makan lagi? Mau jalan-jalan? Mau main? Atau....', 'Bebas. Yang penting sama aku. ♡'],
        options: [
          { key: 'eat', label: 'EAT', reply: 'Anak pecinta kuliner. Tentu saja. 🍜' },
          { key: 'play', label: 'PLAY', reply: 'Oke, tapi jangan sampai lupa waktu ya. 🎮' },
          { key: 'explore', label: 'EXPLORE', reply: 'Siap, kita nyasar bareng-bareng. 🗺️' },
        ],
      },
      { id: 's6', time: '17:00-ish', title: 'Fourth stop: rumah', emoji: '🏠', text: ['Pulang ke rumah akuuu! ngobrol ngobrol sm my keluarga yaa'] },
      { id: 's7', time: 'Night', title: 'The last stop', emoji: '🌙', sub: 'Sleep Call', text: ['Kalo bisa nginep aja sih hehehehe.'] },
    ],
  },

  // ---------- 05 Memories ----------
  // category: 'dates' | 'silly' | 'food' | 'favorites'  (boleh lebih dari satu)
  // Taruh foto di public/images/memories/ lalu ganti nama file di sini
  memories: [
    { id: 'm1', src: '/images/memories/01.jpg', caption: 'first meet', categories: ['dates', 'favorites'], rotate: -3 },
    { id: 'm2', src: '/images/memories/02.jpg', caption: 'canggung bgt jujur', categories: ['silly', 'dates'], rotate: 2 },
    { id: 'm3', src: '/images/memories/03.jpg', caption: 'jadian niii', categories: ['favorites', 'dates'], rotate: -1.5 },
    { id: 'm4', src: '/images/memories/04.jpg', caption: 'kamunya gemes', categories: ['favorites', 'silly', 'dates'], rotate: 3 },
    { id: 'm5', src: '/images/memories/05.jpg', caption: 'kulineran lagi yuk', categories: ['dates', 'food'], rotate: -2.5 },
    { id: 'm6', src: '/images/memories/06.jpg', caption: 'couple ootd', categories: ['dates'], rotate: 1.5 },
    { id: 'm7', src: '/images/memories/07.jpg', caption: 'ikea date', categories: ['dates', 'favorites'], rotate: -2 },
    { id: 'm8', src: '/images/memories/08.jpg', caption: 'ganteng bangett', categories: ['favorites'], rotate: 2.5 },
    { id: 'm8', src: '/images/memories/09.jpg', caption: 'gas burtok lagi', categories: ['silly', 'food'], rotate: 3 },
    { id: 'm8', src: '/images/memories/10.jpg', caption: 'seru bgt, next dufan', categories: ['date', 'favorites'], rotate: -1 },
  ],

  // ---------- 06 Letter (EDIT, ini draft!) ----------
  letter: {
    to: 'Untuk Afzaal,',
    paragraphs: [
      'Selamat ulang tahun, sayang. Akhirnya kamu jadi om om 22 tahun.',
      'Aku ga jago ngomong yang panjang-panjang, jadi aku tulis di sini. Makasih ya sayang udah jadi orang yang sabar ngadepin aku, yang tetap ada dan selalu treat aku dengan baik walaupun aku kadang suka marah-marah dan manja.',
      'Semoga di umur 22 tahun ini menjadi tahun yang membuat kamu bahagia (apalagi ada aku hehe), makin dewasa, kurangi ovt ke akunya, tetep jadi afzaal yang baik dan semoga kamu dapetin pekerjaan yang bisa balance sama kehidupan kamu ya, jujur aku sedih liat kamu overwork sampe kecapean... tapi sehat selalu ya sayangku',
      'Aku ga janji bisa jadi sempurna. Tapi aku bakal terus ada, nemenin kamu, dan jadi tempat pulang yang nyaman (semoga kamu jadiin aku rumah ya).',
      'Semoga umur baru ini baik ke kamu. Semoga kamu selalu sehat dan bahagia, dan semoga mimpi-mimpi kamu pelan-pelan jadi nyata. Aku beruntung banget punya kamu di hidup aku. Inget yaa aku cuma sayang kamu, jangan mikir aneh-aneh lagi! LOVE U SAYANG',
    ],
    closing: 'Always yours,',
    signature: 'Cleosa Zelda A',
  },

  // ---------- 07 Finale ----------
  finale: {
    eyebrow: 'One last thing...',
    title: 'Happy Birthday, Afzaal! 🎂',
    instruction: 'Sekarang tutup mata... buat wish kamu.',
    button: 'BLOW THE CANDLES ♡',
    afterLines: [
      'Semoga semua hal baik yang kamu inginkan bisa perlahan datang ke kamu.',
      'Dan semoga di antara semua hal baik itu...',
      'aku masih jadi salah satunya.',
      'Happy birthday, birthday boy.',
      'I love you. ♡',
    ],
    signature: '— Cleosa',
  },

  // ---------- Notifikasi (ntfy.sh) ----------
  // Cara setup:
  //   1. Install app "ntfy" di HP kamu (Android/iOS) dari ntfy.sh
  //   2. Buka app → Subscribe to topic → ketik topic kamu di bawah
  //   3. Set enabled: true
  // Setelah itu kamu bakal dapet notif tiap kali Afzaal kirim wish atau pilih outfit!
  notification: {
    ntfyTopic: '',   // ← isi dengan nama unik, contoh: 'cleosa-afzaal-secret-2026'
    enabled: false,  // ← ganti jadi true kalau ntfyTopic sudah diisi
  },

  // ---------- Easter eggs ----------
  secrets: [
    { id: 'star1', message: 'Ternyata kamu nemu bintang kecilnya. Aku sayang kamu. ✨' },
    { id: 'heart1', message: 'Psst, jangan bilang siapa-siapa: kamu orang favorit aku. ♡' },
  ],
  // ---------- Komentar kucing yang ngintip tiap ganti chapter ----------
  catTips: {
    note: 'psst, baca pelan-pelan ya.',
    happy: 'kartunya bisa dibalik lho.',
    wishes: 'jangan minta yang aneh-aneh. 🤨',
    date: 'dress code: maroon!',
    memories: 'itu foto kita. aku simpan semua.',
    heart: 'ada surat buat kamu.',
    birthday: 'sebentar lagi...',
  },

  // ---------- Musik (opsional): taruh file di public/music/song.mp3 ----------
  music: { src: '/music/song.mp3', label: 'musik' },
}
