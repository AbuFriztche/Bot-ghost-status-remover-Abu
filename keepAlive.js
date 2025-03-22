const express = require('keepAlive');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot is alive!');
});

app.listen(port, () => {
    console.log(`[ KEEP-ALIVE ] Server running on port ${port}`);
});

// Kendini belirli aralıklarla pingleyerek Render'ı uykuya geçmekten korur
setInterval(() => {
    require('http').get(`http://localhost:${port}`);
    console.log('[ KEEP-ALIVE ] Ping sent to prevent sleeping...');
}, 5 * 60 * 1000); // 5 Dakika
