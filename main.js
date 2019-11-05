const tmi = require('tmi.js');
const roll = require('./comandos/roll.js');
const cannon = require('./comandos/cannon.js');
const dive = require('./comandos/dive.js');
const flash = require('./comandos/flash.js');
const ficha = require('./comandos/ficha.js');
const hora = require('./comandos/hora.js');
const horario = require('./comandos/horario.js');
const playlist = require('./comandos/playlist.js');
const redes = require('./comandos/redes.js');
const poll = require('./comandos/poll.js');
const resultado = require('./comandos/resultado.js');
var dives = 0;
var cannons = 0;
var flashes = 0;
var opcion1 = [];
var opcion2 = [];
var votantes = [];
var cooldown = [];
var saludos = [];
const canal = 'chechubot';

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
    channels: [canal],
};

const client = new tmi.client(options);

client.connect();

client.on('connected', (address, port) => {
    // client.action(canal, 'Hola, el bot_de_pruebas se ha conectado al chat correctamente');
    client.action(canal, 'Sigueme en mis redes sociales para no perderte novedades sobre el stream. Twitter: https://cutt.ly/UegGywg Instagram: https://cutt.ly/aegGy3h');
    setInterval(() => {
        client.action(canal, 'Sigueme en mis redes sociales para no perderte novedades sobre el stream. Twitter: https://cutt.ly/UegGywg Instagram: https://cutt.ly/aegGy3h');
    }, 2700000);
});

// client.on('follow')

client.on('chat', (channel, user, message, self) => {
    //User =? broadcaster
    //
    // console.log(user);
    // if (viewer.toLowerCase() === canal) {
    //     console.log('es streamer');
    // }else{
    //     console.log(viewer.toLowerCase() + canal);
    // }
    
    if (self) return;

    let viewer = user['display-name'];
    let d = new Date();

    //Cuando la gente pone un mensaje por primera vez se les saluda
    for(let i=0;i<saludos.length;i++){
        if(saludos[i] == viewer){
            var primerMensaje = false;
        }else{
            var primerMensaje = true;
        }
    }
    if(primerMensaje){
        client.action(canal, `Hola ${viewer} :)`);
        saludos.push(viewer);
    }

    //cmd handler
    // const args = message.slice(prefix.length).trim().split(/ +/g);
    // const cmd = args.shift().toLowerCase();
    // let commandFile = require(`./comandos/${cmd}.js`);

    //Lista de comandos

    if (message === '!roll'){
        roll.run(client, canal, viewer, cooldown);
    }

    if (message === '!cannon') {
        cannon.run(client, canal, cooldown, cannons);
    }
    
    if (message === '!dive') {
        dive.run(client, canal, cooldown, dives);
    }

    if (message === '!flash') {
        flash.run(client, canal, cooldown, flashes);
    }

    if (message === '!redes') {
        redes.run(client, canal, cooldown);
    }

    if (message === '!horario') {
        horario.run(client, canal, cooldown);
    }

    if (message === '!hora') {
        hora.run(client, canal, viewer, cooldown);
    }

    if (message === '!playlist') {
        playlist.run(client, canal, cooldown);
    }

    if ( message.includes('!ficha') ) {
        ficha.run(client, canal, viewer, cooldown, message);
    }

    if ( message.includes('!vote') ) {
        poll.run(message, opcion1, opcion2, viewer, votantes);
    }

    if( (message.includes('!startvote') && user['mod'] === true) || (message.includes('!startvote') && viewer.toLowerCase() === canal) ){
        segundos = message.replace('!startvote ', '');
        tiempo = segundos * 1000;
        if (segundos < 60) {
            client.action(canal, `Acaba de empezar una votación, usa "!vote 1" o "!vote 2" para participar, la votación se cierra en ${segundos} segundos.`);
        }else{
            client.action(canal, `Acaba de empezar una votación, usa "!vote 1" o "!vote 2" para participar, la votación se cierra en ${(segundos/60).toFixed(2)} minutos.`);
        }
        setTimeout(() => {
            resultado.run(client, canal, opcion1, opcion2, votantes);
        }, tiempo);
    }




    //ARREGLAR Y FUSIONAR CON EL ADD
    if ((message === '!subdive' && user['mod'] === true) || message === '!subdive' && viewer.toLowerCase() === canal) {
        dive--;
    }

    if ((message === '!subcannon' && user['mod'] === true) || message === '!subcannon' && viewer.toLowerCase() === canal) {
        cannon--;
    }

    if ((message === '!subflash' && user['mod'] === true) || message === '!subflash' && viewer.toLowerCase() === canal) {
        flash--;
    }

    if ((message === '!showdive' && user['mod'] === true) || message === '!showdive' && viewer.toLowerCase() === canal) {
        client.action(canal, `Dalvenger se ha estampado ${dive} veces este stream.`);
    }

    if ((message === '!showcannon' && user['mod'] === true) || message === '!showcannon' && viewer.toLowerCase() === canal) {
        client.action(canal, `Se han salvado ${cannon} gerdetes este stream.`);
    }

    if ((message === '!showflash' && user['mod'] === true) || message === '!showflash' && viewer.toLowerCase() === canal) {
        client.action(canal, `Dalvenger se ha estampado contra ${flash} muros este stream.`);
    }




    //Baneo de enlaces
    //
    // if (user['mod'] === false) {
    //     if(message.includes('www.' || message.includes('.com') || message.includes('.net') || message.includes('.es'))){
    //         client.timeout(canal, viewer, 120, 'Se ha detectado un enlace no permitido');
    //         client.action(canal, `@${viewer} No está permitido poner enlaces en el chat, un moderador debe revisarlo primero, puedes ver que moderadores hay con /mod`);
    //     }
    // }

    //Baneo de spam
    if (user['mod'] === false || viewer.toLowerCase() !== canal) {
        if(message.includes('⣿') || message.includes('█') || message.includes('▒') || message.includes('░') || message.includes('▀')){
            client.timeout(canal, viewer, 300, 'Spam no permitido');
            client.action(canal, `@${viewer} Por favor no spamees`);
        }
    }

});