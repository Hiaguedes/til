class FileUploadService {
    private static instance: FileUploadService;

    private constructor() {
        // Private constructor to prevent instantiation
    }

    public static getInstance(): FileUploadService {
        if (!FileUploadService.instance) {
            FileUploadService.instance = new FileUploadService();
        }
        return FileUploadService.instance;
    } // singleton instance

    private compressFile(file: File): Promise<File> {
        return new Promise((resolve, reject) => {
            // Simulate file compression logic
            setTimeout(() => {
                if (file.size > 0) {
                    const compressedFile = new File([file], `compressed_${file.name}`, { type: file.type });
                    resolve(compressedFile);
                } else {
                    reject(new Error('File compression failed: file is empty.'));
                }
            }, 1000);
        });
    }

    public uploadFile(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate file upload logic
            setTimeout(() => {
                if (file.size > 0) {
                    resolve(`File ${file.name} uploaded successfully.`);
                } else {
                    reject(new Error('File upload failed: file is empty.'));
                }
            }, 1000);
        });
    }
}