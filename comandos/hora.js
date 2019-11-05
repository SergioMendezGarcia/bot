exports.run = (client, canal, viewer, cooldown) => {

    var cool_hora = false;
    for(let i=0; i<cooldown.length;i++){
        if(cooldown[i] == 'hora'){
            cool_hora = true;
        }
    }
    if(!cool_hora){
        if (d.getMinutes() < 10 ) {
        minutos = '0' + d.getMinutes().toString();
        // console.log(minutos);
        }else {
            minutos = d.getMinutes();
        }
        if (d.getHours() <= 12) {
            client.action(canal, `@${viewer} en españita son las ${d.getHours()}:${minutos} AM`);
        }else {
            client.action(canal, `@${viewer} en españita son las ${d.getHours()}:${minutos}`);
        }
        cooldown.push('hora');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'hora'){
                    cooldown.splice(i, 1);
                }
            }
        }, 30000);
    }
    
}