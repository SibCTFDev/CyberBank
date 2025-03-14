import Jimp from "jimp"
import fs from "fs"

const width: number = 256;
const height: number = 256;

class Image {
    static generate(content: string, uid: number): string {
        const imagePath: string = `/app/src/static/images/image_${uid}${(new Date()).getTime()}.png`;

        this.generateRandomImage(imagePath)
        const nazvanie = setInterval(() => {
            if (fs.existsSync(imagePath)) {
                this.encodeImage(imagePath, content);
                // this.decodeImage(imagePath)
                clearInterval(nazvanie)
            }
        }, 3000);


        return imagePath;
    }

    static getRandomColor(): number {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.floor(Math.random() * 256);

        return Jimp.rgbaToInt(r, g, b, a);
    }

    static async generateRandomImage(saveImagePath: string) {
        try {
            const image = new Jimp(width, height, (err) => {
                if (err) {
                    throw new Error('Error creating image');
                }
            });

            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    image.setPixelColor(Image.getRandomColor(), x, y);
                }
            }

            await image.writeAsync(saveImagePath);
        } catch (err) {
            console.error('Error generating random image:', err);
        }
    }

    private static async encodeImage(inputImagePath: string, secretData: string): Promise<void> {
        const image = await Jimp.read(inputImagePath);

        let secretBits = secretData
            .split('')
            .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('') + '00000000';

        let index = 0;

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (idx) => {
            for (let c = 0; c < 3; c++) {
                if (index < secretBits.length) {
                    let value = image.bitmap.data[idx + c];
                    value = (value & 0b11111110) | parseInt(secretBits[index]);
                    image.bitmap.data[idx + c] = value;
                    index++;
                }
            }
        });

        await image.writeAsync(inputImagePath);
        console.log(`✅ Данные скрыты в ${inputImagePath}!`);
    }

    // DEBUG DECODE IMAGE
    // private static async decodeImage(imagePath: string) {
    //     const image = await Jimp.read(imagePath);
    //     let secretBits = '';

    //     image.scan(0, 0, image.bitmap.width, image.bitmap.height, (idx) => {
    //         for (let c = 0; c < 3; c++) {
    //             secretBits += (image.bitmap.data[idx + c] & 1).toString();
    //         }
    //     });

    //     let secretData = '';
    //     for (let i = 0; i < secretBits.length; i += 8) {
    //         const byte = secretBits.substr(i, 8);
    //         if (byte === '00000000') break;
    //         secretData += String.fromCharCode(parseInt(byte, 2));
    //     }

    //     console.log("!!!!!!!!")
    //     console.log(secretData)
    // }
}

export default Image;