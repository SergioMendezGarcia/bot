exports.run = (client, canal, viewer, cooldown) => {

    var cool_roll = false;
    for(let i=0; i<cooldown.length;i++){
        if(cooldown[i] == 'roll'){
            cool_roll = true;
        }
    }
    if(!cool_roll){
        var dado = Math.floor(Math.random()* 6)+1;
        //`@${user['display-name']}`
        if ( dado < 3 ) {
            client.action(`${canal}`, `@${viewer} te ha salido un ${dado}, suerte la próxima KEKW`);
        }
        if ( dado >= 3 ) {
            client.action(`${canal}`, `@${viewer} te ha salido un ${dado}, Pog `);
        }
        cooldown.push('roll');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'roll'){
                    cooldown.splice(i, 1);
                }
            }
        }, 300000);
    }
}