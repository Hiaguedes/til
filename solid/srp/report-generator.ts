class FileProcessorNotSRP {

    private constructor() { }

    public processFile(file: File): Promise<string> {
        const jsonReport = JSON.stringify({
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified
        }) // uma simulacao de relatorio em JSON, forte acoplamento
        // essa classe pode escalar pra diferentes areas da empresa

        return new Promise((resolve, reject) => {
            // Simulate file processing logic
            setTimeout(() => {
                if (file) {
                    resolve(jsonReport);
                } else {
                    reject('No file provided');
                }
            }, 1000);
        });
    }
}

// -----------------

class CSVFileReader {
    read(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate CSV reading logic
            setTimeout(() => {
                if (file.size > 0) {
                    resolve(JSON.stringify({
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        lastModified: file.lastModified
                    }));
                } else {
                    reject(new Error("CSV file is empty"));
                }
            }, 1000);
        });
    }
}

class JSONExporter {
    export(data: any): Promise<string> {
        return new Promise((resolve, reject) => {
            // Simulate JSON exporting logic
            setTimeout(() => {
                if (data) {
                    resolve(`Data exported to JSON successfully with file ${data}.`);
                } else {
                    reject(new Error("No data to export"));
                }
            }, 1000);
        });
    }
}

class ReportService { // classe orquestradora, ele faz tudo mas nao sabe de tudo, ele so sabe como usar as outras classes (orquestrar)

    constructor(
        private csvReader: CSVFileReader, // deveria ser uma interface, mas como o exemplo é pequeno, vamos deixar assim
        private jsonExporter: JSONExporter, // idem
    ) { }

    public async generateReport(file: File): Promise<string> {
        try {
            const csvData = await this.csvReader.read(file);
            const report = await this.jsonExporter.export(csvData);
            return `Report generated successfully: ${report}`;
        } catch (error) {
            throw new Error(`Report generation failed: ${error}`);
        }
    }
}

const reportService = new ReportService(new CSVFileReader(), new JSONExporter());
reportService.generateReport(new File(["content"], "report.csv", { type: "text/csv" }))
    .then(result => console.log(result))    