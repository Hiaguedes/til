// O OCP - Open/Closed Principle e um principio que diz que uma classe deve estar aberta para extensao, mas fechada para modificacao.
// Ou seja, devemos ser capazes de adicionar novas funcionalidades a uma classe sem modificar seu codigo fonte.


// se voce tem muitos tipos de if, voce tem um cheiro de codigo, e provavelmente esta violando o OCP

// pra isso posso usar strategys
class ReportProcessor {
    process(report: string): string {
        // exemplo de violacao do OCP, pois a cada novo tipo de relatorio, preciso modificar esse metodo
        if (report === "PDF") {
            return "Processing PDF report...";
        } else if (report === "CSV") {
            return "Processing CSV report...";
        }
        throw new Error(`Report type not supported: type ${report} unknown`);
    }
}

const processor = new ReportProcessor();
console.log(processor.process("PDF"));
console.log(processor.process("CSV"));