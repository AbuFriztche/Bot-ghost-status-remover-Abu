/*
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆

  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  

DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/

require('dotenv').config();
const express = require('express');
const path = require('path');
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// 🌐 Express Sunucu Ayarları
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'index.html');
  res.sendFile(filePath);
});

app.listen(PORT, () => {
  console.log(`\x1b[36m[ SERVER ]\x1b[0m \x1b[32mWeb Sunucu Aktif: http://localhost:${PORT} ✅\x1b[0m`);
});

// 🟢 Bot Durumları
const statusMessages = ["Sunucuları İzliyor", "Kontroller Yapıyor"];
const statusTypes = ['dnd', 'idle'];
let currentStatusIndex = 0;
let currentTypeIndex = 0;

async function login() {
  try {
    await client.login(process.env.TOKEN);
    console.log(`\x1b[36m[ LOGIN ]\x1b[0m \x1b[32mBot Giriş Yaptı: ${client.user.tag} ✅\x1b[0m`);
    console.log(`\x1b[36m[ INFO ]\x1b[0m \x1b[35mBot ID: ${client.user.id}\x1b[0m`);
    console.log(`\x1b[36m[ INFO ]\x1b[0m \x1b[34m${client.guilds.cache.size} Sunucuya Bağlı\x1b[0m`);
  } catch (error) {
    console.error('\x1b[31m[ ERROR ]\x1b[0m Giriş Başarısız:', error);
    process.exit(1);
  }
}

// 🔄 Bot Durum Güncelleme
function updateStatus() {
  if (!client.user) return;
  
  const currentStatus = statusMessages[currentStatusIndex];
  const currentType = statusTypes[currentTypeIndex];

  client.user.setPresence({
    activities: [{ name: currentStatus, type: ActivityType.Custom }],
    status: currentType,
  });

  console.log(`\x1b[33m[ STATUS ]\x1b[0m Yeni Durum: ${currentStatus} (${currentType})`);
  
  currentStatusIndex = (currentStatusIndex + 1) % statusMessages.length;
  currentTypeIndex = (currentTypeIndex + 1) % statusTypes.length;
}

// 🔴 Botun Uykuya Girmesini Engellemek İçin Ping
function heartbeat() {
  setInterval(() => {
    console.log(`\x1b[35m[ HEARTBEAT ]\x1b[0m Bot Aktif: ${new Date().toLocaleTimeString()}`);
  }, 30000);
}

// 🚀 Bot Hazır Olunca Çalışacak Kodlar
client.once('ready', () => {
  console.log(`\x1b[36m[ INFO ]\x1b[0m \x1b[34mPing: ${client.ws.ping} ms\x1b[0m`);
  updateStatus();
  setInterval(updateStatus, 10000);
  heartbeat();
});

// 🔑 Giriş Yap
login();

/*
☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆

  _________ ___ ___ ._______   _________    
 /   _____//   |   \|   \   \ /   /  _  \   
 \_____  \/    ~    \   |\   Y   /  /_\  \  
 /        \    Y    /   | \     /    |    \ 
/_______  /\___|_  /|___|  \___/\____|__  / 
        \/       \/                     \/  

DISCORD :  https://discord.com/invite/xQF9f9yUEM                   
YouTube : https://www.youtube.com/@GlaceYT                         

☆.。.:*・°☆.。.:*・°☆.。.:*・°☆.。.:*・°☆
*/
