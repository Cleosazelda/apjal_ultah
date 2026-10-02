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
    question: 'Kapan pertama kali kita chat?',
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
      'Hari ini semuanya tentang kamu.',
      'Aku pengen bikin sesuatu yang sedikit berbeda buat ulang tahun kamu.',
      'Jadi aku bikin satu tempat kecil di internet yang isinya beberapa hal tentang kamu, tentang kita, dan sedikit pesan dari aku.',
      'Semoga kamu menikmati setiap bagian kecilnya. ♡',
    ],
    signature: 'With love, Cleosa',
  },

  // ---------- 02 Things That Make Afzaal Happy ----------
  happyCards: [
    {
      id: 'game',
      no: '01',
      emoji: '🎮',
      title: 'Valorant & Games',
      photo: '/images/memories/game.jpg',
      lines: [
        'Kalau ada waktu senggang, pelariannya pasti ke game.',
        'Entah Valorant atau game lainnya, yang penting main dulu.',
      ],
      joke: '"Aku cuma main sebentar kok."',
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

  // ---------- 03 Wishes ----------
  wishes: {
    lines: [
      'Kalau 3 hal tadi masih belum cukup bikin kamu happy di hari ulang tahun kamu...',
      'coba bilang 4 hal yang kamu mau.',
      'Nanti aku usahain buat ngabulin satu-satu.',
      'Kalau bisa yaa...',
      'jangan minta yang aneh-aneh. 🤨',
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
    dressCode: 'Dress code: maroon ❤️',
    outfit: {
      heading: 'Outfit check',
      note: 'Atasan: maroon (wajib). Bawahan: bebas, asal jangan aneh-aneh.',
      pickLabel: 'pilih bawahannya:',
      bottoms: [
        { key: 'cream', label: 'Cream', color: '#e9ddd2', reply: 'Cream + maroon? Cakep. Aman. ✨' },
        { key: 'charcoal', label: 'Hitam', color: '#3a3033', reply: 'Klasik. Maroon dan hitam nggak pernah salah. 🖤' },
        { key: 'brown', label: 'Coklat', color: '#8a6a58', reply: 'Warm tone semua, kita jadi satu palet. 🤎' },
        { key: 'persib', label: 'Biru', color: '#3f5f9a', reply: 'Biru Persib?? Berani ya... tapi boleh deh. 💙' },
      ],
    },
    stops: [
      { id: 's1', time: '06:00', title: 'The mission begins', emoji: '🌤️', text: ['Bangun pagi, siap-siap, terus izin Mama.'] },
      { id: 's2', time: '07:30', title: 'Come pick me up', emoji: '🚗', text: ['Estimasi kamu sampai dan jemput aku.', 'Jangan telat. Aku tunggu. ♡'] },
      { id: 's3', time: '08:00-ish', title: 'First stop: sarapan', emoji: '🥐', text: ['Kita mulai hari dengan makan dulu.'] },
      { id: 's4', time: '10:00-ish', title: 'Second stop: café cantik', emoji: '☕', text: ['Cari tempat yang cantik, cozy, dan tentunya enak buat foto-foto.'] },
      {
        id: 's5', time: '13:00-ish', title: 'Third stop: you decide', emoji: '🎲',
        text: ['Mau makan lagi? Mau jalan-jalan? Mau main?', 'Bebas. Yang penting sama aku. ♡'],
        options: [
          { key: 'eat', label: 'EAT', reply: 'Anak pecinta kuliner. Tentu saja. 🍜' },
          { key: 'play', label: 'PLAY', reply: 'Oke, tapi jangan sampai lupa waktu ya. 🎮' },
          { key: 'explore', label: 'EXPLORE', reply: 'Siap, kita nyasar bareng-bareng. 🗺️' },
        ],
      },
      { id: 's6', time: '17:00-ish', title: 'Fourth stop: rumah', emoji: '🏠', text: ['Setelah seharian jalan, waktunya pulang ke rumah aku.'] },
      { id: 's7', time: 'Night', title: 'The last stop', emoji: '🌙', sub: 'Sleep Call', text: ['Walaupun date-nya selesai... kamu tetap belum bisa kabur dari aku.'] },
    ],
  },

  // ---------- 05 Memories ----------
  // category: 'dates' | 'silly' | 'food' | 'favorites'  (boleh lebih dari satu)
  // Taruh foto di public/images/memories/ lalu ganti nama file di sini
  memories: [
    { id: 'm1', src: '/images/memories/01.jpg', caption: 'first date vibes', categories: ['dates', 'favorites'], rotate: -3 },
    { id: 'm2', src: '/images/memories/02.jpg', caption: 'muka kamu pas aku foto diam-diam', categories: ['silly'], rotate: 2 },
    { id: 'm3', src: '/images/memories/03.jpg', caption: 'hunting makanan lagi', categories: ['food', 'dates'], rotate: -1.5 },
    { id: 'm4', src: '/images/memories/04.jpg', caption: 'favorit aku', categories: ['favorites'], rotate: 3 },
    { id: 'm5', src: '/images/memories/05.jpg', caption: 'random tapi lucu', categories: ['silly'], rotate: -2.5 },
    { id: 'm6', src: '/images/memories/06.jpg', caption: 'enak banget ini', categories: ['food'], rotate: 1.5 },
    { id: 'm7', src: '/images/memories/07.jpg', caption: 'just us', categories: ['dates', 'favorites'], rotate: -2 },
    { id: 'm8', src: '/images/memories/08.jpg', caption: 'kamu lagi ngantuk', categories: ['silly'], rotate: 2.5 },
  ],

  // ---------- 06 Letter (EDIT, ini draft!) ----------
  letter: {
    to: 'Untuk Afzaal,',
    paragraphs: [
      'Selamat ulang tahun, sayang. Akhirnya sampai juga di hari ini.',
      'Aku nggak pandai ngomong yang panjang-panjang, jadi aku tulis di sini. Terima kasih sudah jadi orang yang sabar ngadepin aku, yang tetap ada walaupun aku kadang rewel dan manja.',
      'Aku suka cara kamu ketawa pas lagi main game, cara kamu semangat banget pas Persib menang, dan cara kamu diam-diam perhatian tanpa pernah bilang. [GANTI: tambahkan hal-hal spesifik tentang dia]',
      'Aku nggak janji bisa jadi sempurna. Tapi aku janji akan terus ada, nemenin kamu, dan jadi tempat pulang yang nyaman.',
      'Semoga umur baru ini baik ke kamu. Semoga kamu selalu sehat dan bahagia, dan semoga mimpi-mimpi kamu pelan-pelan jadi nyata.',
    ],
    closing: 'Always yours,',
    signature: 'Cleosa',
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
