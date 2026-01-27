// download-icons.js
const fs = require('fs');
const https = require('https');
const path = require('path');

// URL твоєї іконки (червона з літерою К)
const iconUrl = "https://ui-avatars.com/api/?name=K&background=EA4335&color=fff&size=512&font-size=0.7&bold=true&length=1";

const publicDir = path.join(__dirname, 'public');

// Перевіряємо, чи є папка public, якщо ні - створюємо
if (!fs.existsSync(publicDir)){
    fs.mkdirSync(publicDir);
    console.log('Папку public створено.');
}

const download = (url, filename) => {
    const filePath = path.join(publicDir, filename);
    const file = fs.createWriteStream(filePath);
    
    https.get(url, function(response) {
        response.pipe(file);
        file.on('finish', function() {
            file.close(() => {
                console.log(`✅ Файл ${filename} успішно створено в папці public!`);
            });
        });
    }).on('error', function(err) {
        fs.unlink(filePath); 
        console.error(`Помилка при завантаженні ${filename}:`, err.message);
    });
};

console.log("Починаю завантаження іконок...");
download(iconUrl, 'icon-512.png');
// Для 192 ми використовуємо ту ж саму, вона просто стиснеться
download(iconUrl, 'icon-192.png');