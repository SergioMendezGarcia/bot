const tmi = require('tmi.js');
var dive = 0;
var cannon = 0;
var flash = 0;
var opcion1 = 0;
var opcion2 = 0;
var votantes = [];
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
    client.action(canal, 'Hola, el bot_de_pruebas se ha conectado al chat correctamente');
});

client.on('chat', (channel, user, message, self) => {
    if (self) return;

    let viewer = user['display-name'];
    let d = new Date();
    //User =? broadcaster
    /*console.log(user);
    if (viewer.toLowerCase() === canal) {
        console.log('es streamer');
    }else{
        console.log(viewer.toLowerCase() + canal);
    }*/


    if (message.includes('!vote')) {
        var vote = false;
        for(let i=0; i<votantes.length;i++){
            if (votantes[i] == viewer) {
                vote = true;
                }
            }
        if (!vote) {
            switch (message) {
                case '!vote1':
                    opcion1++;
                    console.log(opcion1);
                    console.log('voto efectuado por ' + viewer);
                    votantes.push(viewer);
                    break;
                case '!vote2':
                    opcion2++;
                    console.log(opcion2);
                    console.log('voto efectuado por ' + viewer);
                    votantes.push(viewer);
                    break;
                default:
                    console.log(viewer + ' voto erroneo');
                    break;
            }
        }else {
            console.log(viewer + ' ya ha votado');
        }
    }

    if ((message === '!resultado' && user['mod'] === true) || message === '!resultado' && viewer.toLowerCase() === canal) {
        var totalvotos = opcion1 + opcion2;
        console.log(totalvotos);
        var votos1 = opcion1/totalvotos*100;
        console.log(votos1);
        var votos2 = opcion2/totalvotos*100;
        console.log(votos2);
        if (votos1 == votos2){
            client.action(canal, `La votación ha concluido en empate.`);
        }else if(votos1 > votos2){
            client.action(canal, `La opcion 1 ha ganado con un ${Math.round(votos1)}%.`);
        }else{
            client.action(canal, `La opcion 2 ha ganado con un ${Math.round(votos2)}%.`);
        }

    }

    if ((message === '!reset' && user['mod'] === true) || message === '!reset' && viewer.toLowerCase() === canal) {
        opcion1 = 0;
        opcion2 = 0;
        for(let i=0; i<votantes.length;i++){
            votantes.pop();
            }
    }



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



    if ( message.includes('!ficha') ) {
        var ficha = Math.floor(Math.random()* 100)+1;
        function mensaje(msg) {
            // console.log(msg);
            var target = msg.replace('!ficha ', '');
            // console.log(msg.replace('!ficha', ''));
            // console.log (target);
            return target;
        }
        if (ficha < 40) {
            client.action(canal, `${viewer} es un ${ficha}% compatible con ${mensaje(message)}, F`);
        }else if (ficha >= 40 && ficha < 50) {
            client.action(canal, `${viewer} es un ${ficha}% compatible con ${mensaje(message)}, F de Friendzone`);
        }else if (ficha >= 50 && ficha <= 75) {
            client.action(canal, `${viewer} es un ${ficha}% compatible con ${mensaje(message)}, OJOO`);
        }else if (ficha > 75 && ficha <100 ) {
            client.action(canal, `${viewer} es un ${ficha}% compatible con ${mensaje(message)}, GANAMOS?`);
        }else if (ficha == 100) {
            client.action(canal, `${viewer} es un ${ficha}% compatible con ${mensaje(message)}, Pog Tenemos boda gente`);
        }
    }




    if (message === '!dive') {
        dive++;
        if(dive < 2){
            client.action(canal, `Dalvenger se ha estampado ${dive} vez este stream.`);
        }else{
            client.action(canal, `Dalvenger se ha estampado ${dive} veces este stream.`);
        }
    }

    if (message === '!cannon' || message === '!gordetes') {
        cannon++;
        if(cannon < 2){
            client.action(canal, `Se ha salvado ${cannon} gordete este stream.`);
        }else{
            client.action(canal, `Se han salvado ${cannon} gerdetes este stream.`);
        }
    }

    if (message === '!flash') {
        flash++;
        if(flash < 2){
            client.action(canal, `Dalvenger se ha estampado contra ${flash} muro este stream.`);
        }else{
            client.action(canal, `Dalvenger se ha estampado contra ${flash} muros este stream.`);
        }
    }

    if (message === '!redes') {
        client.action(canal, 'Sigueme en mis redes sociales para no perderte novedades sobre el stream. Twitter: https://cutt.ly/UegGywg Instagram: https://cutt.ly/aegGy3h');
    }

    if (message === '!horario') {
        client.action(canal, 'Hago stream de lunes a jueves de 8 de la tarde a 12 de la noche, y sábados de 6 de la tarde a 6 de la mañana hora peninsular española. Si eres de latam y quieres comprobar que hora es aquí, utiliza el comando !hora');
    }

    if (message === '!hora') {
            if (d.getMinutes() < 10 ) {
                minutos = '0' + d.getMinutes().toString();
                // console.log(minutos);
            }
        if (d.getHours() <= 12) {
            client.action(canal, `@${viewer} en españita son las ${d.getHours()}:${minutos} AM`);
        }else {
            client.action(canal, `@${viewer} en españita son las ${d.getHours()}:${minutos}`);
        }
    }

    if (message === '!roll') {
        var dado = Math.floor(Math.random()* 6)+1;
        //`@${user['display-name']}`
        if ( dado < 3 ) {
            client.action(`${canal}`, `@${viewer} te ha salido un ${dado}, suerte la próxima KEKW`);
        }
        if ( dado >= 3 ) {
            client.action(`${canal}`, `@${viewer} te ha salido un ${dado}, Pog `);
        }
    }

    if (user['mod'] === false) {
        if(message.includes('www.' || message.includes('.com') || message.includes('.net') || message.includes('.es'))){
            client.timeout(canal, viewer, 300, 'Se ha detectado un enlace no permitido');
            client.action(canal, `@${viewer} No está permitido poner enlaces en el chat, un moderador debe revisarlo primero, puedes ver que moderadores hay con /mod`);
        }
    }

    if (user['mod'] === false) {
        if(message.includes('COME') || message.includes('BEBE AGUA') || message.includes('BEBE') || message.includes('AGUA')){
            client.timeout(canal, viewer, 5, 'Too much hydrated');
            client.action(canal, `@${viewer} Estar bien hidratado y alimentado es bien, pero espamear en mayúsculas no`);
        }
    }

});