const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

function generateNoiseImageWithTextAndGear(text, width = 256, height = 256, outputPath = 'generated.png') {
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Генерируем шум
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.random() * 256;     // Red
        data[i + 1] = Math.random() * 256; // Green
        data[i + 2] = Math.random() * 256; // Blue
        data[i + 3] = 255;                 // Alpha
    }
    ctx.putImageData(imageData, 0, 0);

    // Добавляем текст
    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText(text, width - 10, height - 10);

    // Загружаем изображение шестерёнки и вставляем его
    loadImage('gear.png').then(gear => {
        const gearSize = 150;
        const gearX = (width - gearSize) / 2;
        const gearY = (height - gearSize) / 2;
        ctx.drawImage(gear, gearX, gearY, gearSize, gearSize);
        
        // Сохраняем изображение
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputPath, buffer);
        console.log(`🎨 Изображение ${outputPath} создано с текстом и шестерёнкой!`);
    });
}

function encodeImage(inputImagePath, outputImagePath, secretData) {
    loadImage(inputImagePath).then(image => {
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        let secretBits = secretData.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join('') + '00000000';
        let index = 0;
        
        for (let i = 0; i < data.length; i += 4) {
            for (let channel = 0; channel < 3; channel++) {
                if (index < secretBits.length) {
                    data[i + channel] = (data[i + channel] & 0b11111110) | parseInt(secretBits[index]);
                    index++;
                }
            }
        }

        ctx.putImageData(imageData, 0, 0);
        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputImagePath, buffer);
        console.log(`✅ Данные скрыты в ${outputImagePath}!`);
    });
}

function decodeImage(imagePath) {
    return loadImage(imagePath).then(image => {
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, image.width, image.height);
        const data = imageData.data;

        let secretBits = '';
        for (let i = 0; i < data.length; i += 4) {
            for (let channel = 0; channel < 3; channel++) {
                secretBits += (data[i + channel] & 1).toString();
            }
        }

        let secretData = '';
        for (let i = 0; i < secretBits.length; i += 8) {
            let byte = secretBits.substr(i, 8);
            if (byte === '00000000') break;
            secretData += String.fromCharCode(parseInt(byte, 2));
        }

        return secretData;
    });
}

// Пример использования:
const imagePath = 'generated.png';
generateNoiseImageWithTextAndGear('CyberHlamTecnologis', 256, 256, imagePath);
setTimeout(() => {
    encodeImage(imagePath, 'output.png', 'flag{Hello, Daniil!}');
    setTimeout(() => {
        decodeImage('output.png').then(secret => console.log('🔓 Расшифрованные данные:', secret));
    }, 2000);
}, 2000);
