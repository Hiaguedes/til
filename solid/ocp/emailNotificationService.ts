// class EmailNotificationService {
//     sendEmail(provider: string, to: string, subject: string, body: string): void {
//         // Logic to send email
//         if (provider === "SMTP") {
//             const server = process.env.SMTP_SERVER;
//             const userName = process.env.SMTP_USERNAME;
//             const password = process.env.SMTP_PASSWORD;
//             console.log(`Sending email via SMTP to ${to} with subject: ${subject}`);

//             if (!server || !userName || !password) {
//                 throw new Error("SMTP configuration is missing");
//             }
//         } else if (provider === "SES") {
//             const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
//             const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
//             const region = process.env.AWS_REGION;
//             console.log(`Sending email via AWS SES to ${to} with subject: ${subject}`);

//             if (!accessKeyId || !secretAccessKey || !region) {
//                 throw new Error("AWS SES configuration is missing");
//             }
//         } else if (provider === 'SendBridge') {
//             const apiKey = process.env.SENDBRIDGE_API_KEY;
//             console.log(`Sending email via SendBridge to ${to} with subject: ${subject}`);

//             if (!apiKey) {
//                 throw new Error("SendBridge configuration is missing");
//             }
//         } else {
//             throw new Error("Unsupported email provider");
//         }
//     }
// }

interface EmailProvider {
    sendEmail(to: string, subject: string, body: string): void;
}

class SMTPProvider implements EmailProvider {
    constructor(
        private server: string,
        private userName: string,
        private password: string
    ) { }

    sendEmail(to: string, subject: string, body: string): void {

        console.log(`Sending email via SMTP to ${to} with subject: ${subject}: ${body}`);

        if (!this.server || !this.userName || !this.password) {
            throw new Error("SMTP configuration is missing");
        }
        // Logic to send email via SMTP
    }
}

class SESProvider implements EmailProvider {
    constructor(
        private accessKeyId: string,
        private secretAccessKey: string,
        private region: string
    ) { }
    sendEmail(to: string, subject: string, body: string): void {
        console.log(`Sending email via AWS SES to ${to} with subject: ${subject}: ${body}`);
        if (!this.accessKeyId || !this.secretAccessKey || !this.region) {
            throw new Error("AWS SES configuration is missing");
        }
        // Logic to send email via AWS SES
    }
}

class SendBridgeProvider implements EmailProvider {
    constructor(private apiKey: string) { }
    sendEmail(to: string, subject: string, body: string): void {
        console.log(`Sending email via SendBridge to ${to} with subject: ${subject}: ${body}`);
        if (!this.apiKey) {
            throw new Error("SendBridge configuration is missing");
        }
        // Logic to send email via SendBridge
    }
}

class EmailNotificationService {
    private provider: EmailProvider;
    constructor(provider: EmailProvider) {
        this.provider = provider;
    }
    sendEmail(to: string, subject: string, body: string): void {
        this.provider.sendEmail(to, subject, body);
    }
}

// Usage example:
// const smtpProvider = new SMTPProvider(
//     process.env.SMTP_SERVER || '',
//     process.env.SMTP_USERNAME || '',
//     process.env.SMTP_PASSWORD || ''
// );
// const emailService = new EmailNotificationService(smtpProvider);
// emailService.sendEmail('test@send.com', 'Test Subject', 'Test Body');


// uso de factory pra lidar com especificidades de cada um dos emails providers
abstract class EmailNotificationCreator {
    abstract createNotification(): EmailProvider

    sendEmail(to: string, subject: string, body: string): void {
        const notification = this.createNotification()

        notification.sendEmail(to, subject, body)
    }
}

class SMTPNotificationCreator extends EmailNotificationCreator {
    createNotification(): EmailProvider {
        const server = process.env.SMTP_SERVER;
        const userName = process.env.SMTP_USERNAME;
        const password = process.env.SMTP_PASSWORD;

        if (!server || !userName || !password) {
            throw new Error("SMTP configuration is missing");
        }

        return new SMTPProvider(server, userName, password)
    }
}

class SESNotificationCreator extends EmailNotificationCreator {
    createNotification(): EmailProvider {
        const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
        const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
        const region = process.env.AWS_REGION;

        if (!accessKeyId || !secretAccessKey || !region) {
            throw new Error("SMTP configuration is missing");
        }

        return new SESProvider(accessKeyId, secretAccessKey, region)
    }
}

class SendBridgeNotificationCreator extends EmailNotificationCreator {
    createNotification(): EmailProvider {
        const apiKey = process.env.SENDBRIDGE_API_KEY;

        if (!apiKey) {
            throw new Error("SendBridge configuration is missing");
        }

        return new SendBridgeProvider(apiKey)
    }
}

// exemplo de uso
const smtpCreator = new SMTPNotificationCreator()
smtpCreator.sendEmail("test@joh.com", 'Email Subject', 'Hello!')

// se precisar mudar alguma chave ou alguma forma de integracao eu mudo apenas nos meus creators

// mudou a chave da aws muda apenas no SESNotificationCreator e nao na implementacao


