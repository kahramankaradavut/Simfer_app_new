export class photoData {
    file: File;
    filePath: string;
    webviewPath: string;

    constructor(file: File, filePath: string, webviewPath: string) {
        this.file = file;
        this.filePath = filePath;
        this.webviewPath = webviewPath;
    }
}