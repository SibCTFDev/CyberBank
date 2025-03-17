import Jimp from "jimp"
import Const from "./strings";


class Image {
    public SIZE: number = 256;

    async generate(content: string, uid: number): Promise<string> {
        const imagePath: string = `/app/src/static/images/image_${uid}${(new Date()).getTime()}.png`;

        await this.generateRandomImage(imagePath);
        await this.encodeImage(imagePath, content);

        return imagePath;
    }

    async generateRandomImage(imagePath: string) {
        try {
            const image = new Jimp(this.SIZE, this.SIZE, (err) => {
                if (err) throw new Error(Const.JIMP_ERROR);
            });

            for (let y = 0; y < this.SIZE; y++) {
                for (let x = 0; x < this.SIZE; x++) {
                    image.setPixelColor(Image.getRandomColor(), x, y);
                };
            };

            // TODO add product image up of the noize
            // const frontImage = (await Jimp.read('./src/static/images/gear.png')).resize(150, 150);
            // image.composite(
            //     frontImage, 
            //     (this.SIZE - 150)/2,
            //     (this.SIZE - 150)/2,    
            // )

            await image.writeAsync(imagePath);
        } catch (err) {
            console.error(Const.IMAGE_CREATE_ERROR, err);
        }
    }

    async encodeImage(imagePath: string, secretData: string): Promise<void> {
        const image = await Jimp.read(imagePath);

        let secretBits = secretData
            .split('')
            .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
            .join('') + '00000000';

        let index = 0;

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, (_x, _y, idx) => {
            for (let c = 0; c < 3; c++) {
                if (index < secretBits.length) {
                    let value = image.bitmap.data[idx + c];
                    value = (value & 0b11111110) | parseInt(secretBits[index]);
                    image.bitmap.data[idx + c] = value;
                    index++;
                };
            };
        });

        await image.writeAsync(imagePath);
    }
    
    static getRandomColor(): number {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const a = Math.floor(Math.random() * 256);

        return Jimp.rgbaToInt(r, g, b, a);
    }
}

export default Image;