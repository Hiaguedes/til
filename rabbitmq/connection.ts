import * as amqplib from 'amqplib';

export async function createRabbitMQConnection(url: string): Promise<amqplib.Connection> {
    return amqplib.connect(url);
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function connect() {
    try {
        const connection = await createRabbitMQConnection('amqp://localhost');
        console.log('Conectado ao RabbitMQ');

        const channel = await connection.createChannel();

        await sleep(30000)

        // Lembre-se de fechar a conexao quando nao for mais necessaria
        await channel.close();
        await connection.close();
    } catch (error) {
        console.error('Erro ao conectar ao RabbitMQ:', error);
    }
}

connect();