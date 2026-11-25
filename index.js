const mineflayer = require('mineflayer');

// Konfigurasi Bot
const botArgs = {
  host: 'minesive.com', // IP Server
  port: 25565,          // Port default Minecraft (ubah jika berbeda)
  username: 'NamaBotKamu', // Ganti dengan username bot (untuk server cracked/offline)
  version: false        // Otomatis mendeteksi versi server (atau isi spesifik seperti '1.20.1')
};

function createBot() {
  const bot = mineflayer.createBot(botArgs);

  // Fungsi bantuan untuk memberi jeda (delay)
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  bot.on('spawn', async () => {
    console.log('Bot berhasil masuk ke server!');

    try {
      // Tunggu 3 detik setelah masuk agar server memuat data
      await sleep(3000);
      bot.chat('/login kamu123');
      console.log('Mengirim perintah: /login');

      // Tunggu 3 detik sebelum masuk ke mode permainan
      await sleep(3000);
      bot.chat('/ecocpvp');
      console.log('Mengirim perintah: /ecocpvp');

      // Tunggu 4 detik untuk proses perpindahan world/server
      await sleep(4000);
      bot.chat('/afk');
      console.log('Mengirim perintah: /afk. Bot sekarang dalam mode diam.');

    } catch (err) {
      console.log('Terjadi kesalahan saat menjalankan perintah:', err);
    }
  });

  // Menampilkan pesan chat server di terminal (berguna untuk memantau status login)
  bot.on('messagestr', (message) => {
    console.log(`[Server]: ${message}`);
  });

  // Otomatis reconnect jika bot terputus (kicked/disconnect)
  bot.on('end', (reason) => {
    console.log(`Bot terputus (${reason}). Menyambungkan ulang dalam 10 detik...`);
    setTimeout(createBot, 10000);
  });

  bot.on('error', (err) => {
    console.log('Error:', err);
  });
}

// Jalankan bot
createBot();
