// o cosnumer e um processo que consome mensagens de uma fila e que fica rodando, a cada mensagem nova 
// do producer ele consome a mensagem e processa

import * as amqplib from 'amqplib';

export async function createRabbitMQConnection(url: string): Promise<amqplib.Connection> {
    return amqplib.connect(url);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function producer() {
    try {
        const connection = await createRabbitMQConnection('amqp://localhost');
        console.log('Conectado ao RabbitMQ');

        const channel = await connection.createChannel();

        const queue = 'task_queue';
        const message = 'Chat com rabbitmq';

        await channel.assertQueue(queue); // se nao existir, cria a fila
        channel.sendToQueue(queue, Buffer.from(message));

        console.log(`Mensagem enviada para a fila ${message}`);

        // Lembre-se de fechar a conexao quando nao for mais necessaria

        setTimeout(async () => {
            // await channel.close();
            await connection.close();
            process.exit(0);
        }, 500);

    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
    }
}

producer();