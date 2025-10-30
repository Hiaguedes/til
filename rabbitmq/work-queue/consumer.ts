import * as amqp from "amqplib";

async function worker() {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queue = "work_queue";
    await channel.assertQueue(queue);

    //prefetch = 1
    //round robin
    channel.prefetch(1); // um por vez, se abro mais consumidores, cada um pega uma tarefa

    console.log(`[*] Worker aguardando tarefas. Para sair pressione CTRL+C`);

    channel.consume(
        queue,
        (msg) => {
            if (msg !== null) {
                const content = msg.content.toString();
                console.log(`[x] Recebido: ${content}`);

                const dots = content.split(".").length - 1;
                const timeToProcess = dots * 1000; // pro final ficar bem lento

                // async
                setTimeout(() => {
                    console.log(`[x] Tarefa concluída`);
                    channel.ack(msg); // ack manual, aqui informo pro rabbit mq que a mensagem foi processada
                }, timeToProcess); // 1 , 10 segundos
            }
        },
        { noAck: false } // prefetch so funciona com ack manual (noAck: false
    );
}

worker();