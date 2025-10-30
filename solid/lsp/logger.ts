class Logger {
    log(message: string) {
        console.log(`LOG: ${message}`);
    }
}

class LimitedLogger extends Logger {
    private maxLength: number;

    constructor(maxLength: number) {
        super();
        this.maxLength = maxLength;
    }

    log(message: string) {
        // esse if quebra o contrato de liskov
        // if (message.length > this.maxLength) {
        //     throw new Error(`Message exceeds maximum length of ${this.maxLength} characters`);
        // }

        if (message.length <= this.maxLength) {
            super.log(message);
            return;
        }

        super.log(message.substring(0, this.maxLength) + '...'); // trunca a mensagem sem quebrar o contrato de liskov
    }
}

const limitedLogger = new LimitedLogger(5);
const simpleLogger = new Logger();

const testLoggers = (logger: Logger, message: string) => {
    logger.log(message);
}

testLoggers(simpleLogger, "Hello, World!");
testLoggers(limitedLogger, "Hello, World!");


testLoggers(simpleLogger, "Hi");
testLoggers(limitedLogger, "Hi");


