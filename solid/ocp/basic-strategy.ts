interface Report {
    process(): string;
}

class PDFReport implements Report {
    process(): string {
        return "Processing PDF report...";
    }
}

class CSVReport implements Report {
    process(): string {
        return "Processing CSV report...";
    }
}

class ReportProcessor {
    // classe esta aberta para extensao (posso adicionar novos tipos de relatorios implementando a interface Report)
    // mas fechada para modificacao (nao preciso modificar o codigo dessa classe para adicionar novos tipos de relatorios)
    process(report: Report): string {
        return report.process();
    }
}

const processor = new ReportProcessor();
console.log(processor.process(new PDFReport()));
console.log(processor.process(new CSVReport()));