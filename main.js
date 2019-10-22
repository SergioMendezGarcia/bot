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
    if (self) return;
    let d = new Date();

    let viewer = user['display-name'];

    // if (message === '!dive') {
    //     dive++;
    //     if(dive < 2){
    //         client.action(`${channel}`, `Dalvenger se ha estampado ${dive} vez este stream.`);
    //     }else{
    //         client.action(`${channel}`, `Dalvenger se ha estampado ${dive} veces este stream.`);
    //     }
    // }

    if (message === '!redes') {
        client.action(channel, 'Sigueme en mis redes sociales para no perderte novedades sobre el stream. Twitter: https://cutt.ly/UegGywg Instagram: https://cutt.ly/aegGy3h');
    }

    if (message === '!horario') {
        client.action(channel, 'Hago stream de lunes a jueves de 8 de la tarde a 12 de la noche, y sábados de 6 de la tarde a 12+ Hora peninsular española. Si eres de latam y quieres comprobar que hora es aquí, utiliza el comando !hora');
    }

    if (message === '!hora') {
        if (d.getHours() <= 12) {
            client.action(channel, `@${viewer} en españa son las ${d.getHours()}:${d.getMinutes()} AM`);
        }else {
            client.action(channel, `@${viewer} en españa son las ${d.getHours()}:${d.getMinutes()}`);
        }
    }

    if (message === '!roll') {
        var dado = Math.floor(Math.random()* 6)+1;
        //`@${user['display-name']}`
        if ( dado < 3 ) {
            client.action(`${channel}`, `@${viewer} te ha salido un ${dado}, suerte la próxima KEKW`);
        }
        if ( dado >= 3 ) {
            client.action(`${channel}`, `@${viewer} te ha salido un ${dado}, Pog `);
        }
    }

    if (user['mod'] === false) {
        if(message.includes('www.' || message.includes('.com') || message.includes('.net') || message.includes('.es'))){
            client.timeout(channel, viewer, 300, 'Se ha detectado un enlace no permitido');
            client.action(channel, `@${viewer} No está permitido poner enlaces en el chat, un moderador debe revisarlo primero, puedes ver que moderadores hay con /mod`);
        }
    }

    if (user['mod'] === false) {
        if(message.includes('COME') || message.includes('BEBE AGUA') || message.includes('BEBE') || message.includes('AGUA')){
            client.timeout(channel, viewer, 5, 'Too much hydrated');
            client.action(channel, `@${viewer} Estar bien hidratado y alimentado es bien, pero espamear en mayúsculas no`);
        }
    }

});