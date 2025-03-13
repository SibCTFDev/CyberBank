const Jimp = require('jimp');
const width: number = 256;
const height: number = 256;

class Image {

    static generate(content: string, uid: number): string {

        const imagePath = `some/path/image_${uid}${(new Date()).getTime()}.png`;

        this.genNoiseImage(imagePath);
        this.encodeImage(imagePath, content);

        return imagePath;
    }

    private static async genNoiseImage(imagePath: string): Promise<void> {
        const outputPath = "generated.png"

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
                text: "", // В функции generateNoiseImageWithTextAndGear передается первый параметр text и вместо пустой строки он и должен был быть; скорее всего текст, который должен быть сокрыт
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

    private static async encodeImage(inputImagePath: string, secretData: string): Promise<void> {
        const outputImagePath = "generated.png"
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
}

export default Image;