const Jimp = require('jimp');
const fs = require('fs');

async function generateNoiseImageWithTextAndGear(text, width = 256, height = 256, outputPath = 'generated.png') {
    const image = new Jimp(width, height);

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            const color = Jimp.rgbaToInt(r, g, b, 255);
            image.setPixelColor(color, x, y);
        }
    }

    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    image.print(
        font,
        0, 0,
        {
            text: text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_RIGHT,
            alignmentY: Jimp.VERTICAL_ALIGN_BOTTOM
        },
        width - 10,
        height - 10
    );

    const gear = await Jimp.read('gear.png');
    const gearSize = 150;
    gear.resize(gearSize, gearSize);
    const gearX = (width - gearSize) / 2;
    const gearY = (height - gearSize) / 2;
    image.composite(gear, gearX, gearY);

    await image.writeAsync(outputPath);
    console.log(`🎨 Изображение ${outputPath} создано с текстом и шестерёнкой!`);
}

async function encodeImage(inputImagePath, outputImagePath, secretData) {
    const image = await Jimp.read(inputImagePath);

    let secretBits = secretData
        .split('')
        .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('') + '00000000';

    let index = 0;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        for (let c = 0; c < 3; c++) {
            if (index < secretBits.length) {
                let value = image.bitmap.data[idx + c];
                value = (value & 0b11111110) | parseInt(secretBits[index]);
                image.bitmap.data[idx + c] = value;
                index++;
            }
        }
    });

    await image.writeAsync(outputImagePath);
    console.log(`✅ Данные скрыты в ${outputImagePath}!`);
}

async function decodeImage(imagePath) {
    const image = await Jimp.read(imagePath);
    let secretBits = '';

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        for (let c = 0; c < 3; c++) {
            secretBits += (image.bitmap.data[idx + c] & 1).toString();
        }
    });

    let secretData = '';
    for (let i = 0; i < secretBits.length; i += 8) {
        const byte = secretBits.substr(i, 8);
        if (byte === '00000000') break;
        secretData += String.fromCharCode(parseInt(byte, 2));
    }

    return secretData;
}

// Запуск
(async () => {
    const imagePath = 'generated.png';
    await generateNoiseImageWithTextAndGear('CyberHlamTecnologis', 256, 256, imagePath);
    await encodeImage(imagePath, 'output.png', 'flag{Hello, Daniil!}');
    const secret = await decodeImage('output.png');
    console.log('🔓 Расшифрованные данные:', secret);
})();
