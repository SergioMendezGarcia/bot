exports.run = (client, canal, cooldown, cannons) => {

    var cool_cannon = false;
    for(let i=0; i<cooldown.length;i++){
        if (cooldown[i] == 'cannon') {
            cool_cannon = true;
            }
        }
    if(!cool_cannon){
        cannons++;
            if(cannon < 2){
            client.action(canal, `Se ha salvado ${cannons} gordete este stream.`);
            }else{
                client.action(canal, `Se han salvado ${cannons} gerdetes este stream.`);
            }
        cooldown.push('cannon');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'cannon') {
                    cooldown.splice(i, 1);
                    }
                }
        }, 30000);
    } 
    
}