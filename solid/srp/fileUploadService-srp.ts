class FileCompressor {
    compress(file: File): Promise<File> {
        return new Promise((resolve, reject) => {
            // Simulate file compression logic
            setTimeout(() => {
                if (file.size > 0) {
                    const compressedFile = new File([file], file.name, { type: file.type });
                    resolve(compressedFile);
                } else {
                    reject(new Error("File is empty"));
                }
            }, 1000);
        });
    }
}

class CloudUploader {
    upload(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate file upload logic
            setTimeout(() => {
                if (file.size > 0) {
                    resolve(`File ${file.name} uploaded successfully.`);
                } else {
                    reject(new Error("File is empty"));
                }
            }, 1000);
        });
    }
}

class FileUploadService { // classe orquestradora, ele faz tudo mas nao sabe de tudo, ele so sabe como usar as outras classes (orquestrar)

    constructor(
        private compressor: FileCompressor,
        private uploader: CloudUploader,
    ) { }

    public async uploadFile(file: File, destination: string): Promise<string> {
        try {
            const compressedFile = await this.compressor.compress(file);
            await this.uploader.upload(compressedFile);
            return `File ${file.name} uploaded successfully to ${destination}.`;
        } catch (error) {
            throw new Error(`File upload failed: ${error}`);
        }
    }
}