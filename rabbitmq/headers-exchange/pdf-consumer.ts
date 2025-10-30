import amqp from 'amqplib';

async function consume() {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();

    const exchange = 'amq.headers';
    const queue = 'pdf_queue';

    await channel.assertExchange(exchange, 'headers');
    await channel.assertQueue(queue);

    await channel.bindQueue(queue, exchange, '', {
        type: 'pdf',
        'x-match': 'all' // 'all' ou 'any', "any-with-x", "all-with-x"
        // se for all, todos os parametros devem bater
        // se for any, qualquer um dos parametros deve bater
        // se for all-with-x, todos os parametros devem bater, exceto os que comecam com x-
        // se for any-with-x, qualquer um dos parametros deve bater, exceto os que comecam com x-
    });

    channel.consume(queue, msg => {
        if (msg) {
            console.log('PDF recebido:', msg.content.toString());
            channel.ack(msg);
        }
    });
}

consume();