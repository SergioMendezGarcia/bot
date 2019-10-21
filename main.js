const tmi = require('tmi.js');

const options = {
    options: {
        debug : true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'bot_de_pruebas',
        password: 'oauth:op72s0b1xb8ud2q20vvp411fn6hga1'
    },
    channels: ['chechubot'],
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
    client.action('chechubot', 'Hola, el bot_de_pruebas se ha conectado al chat correctamente');
});

client.on('chat', (channel, user, message, self) => {
    if (message === '!test') {
        client.action('chechubot', 'Esto es un comando de prueba');
    }

    if (message === '!roll') {
        var dado = Math.floor(Math.random()* 10);
        //`@${user['display-name']}`
    client.action('chechubot', `@${user['display-name']} te ha salido un ${dado}`);
    }
});