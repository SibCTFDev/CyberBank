//TODO
class Image {
    static generate(content: string, uid: number) : string {
        
        const imagePath = `some/path/image_${uid}${(new Date()).getTime()}.png`;

        this.genNoiseImage(imagePath);
        this.encodeImage(imagePath, content);

        return imagePath;
    }

    private static genNoiseImage(imagePath: string) : void {
        console.log(imagePath);
    }

    private static encodeImage(imagePath: string, content: string) : void {
        console.log(imagePath+content);
    }
}

export default Image;