exports.run = (client, canal, cooldown, flashes) => {

    var cool_flash = false;
    for(let i=0; i<cooldown.length;i++){
        if (cooldown[i] == 'flash') {
            cool_flash = true;
            }
        }
    if(!cool_flash){
        flashes++;
        if(flash < 2){
        client.action(canal, `Dalvenger se ha estampado contra ${flashes} muro este stream.`);
        }else{
            client.action(canal, `Dalvenger se ha estampado contra ${flashes} muros este stream.`);
        }
        cooldown.push('flash');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'flash') {
                    cooldown.splice(i, 1);
                    }
                }
        }, 30000);
    }
    
}