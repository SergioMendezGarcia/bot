exports.run = (client, canal, viewer, cooldown, message) => {

    var cool_ficha = false;
    for(let i=0; i<cooldown.length;i++){
        if (cooldown[i] == 'ficha') {
            cool_ficha = true;
            }
        }
    if(!cool_ficha){
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
        cooldown.push('ficha');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'ficha') {
                    cooldown.splice(i, 1);
                    }
                }
        }, 30000);
    }
    
}