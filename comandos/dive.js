exports.run = (client, canal, cooldown, dives) => {

    var cool_dive = false;
    for(let i=0; i<cooldown.length;i++){
        if (cooldown[i] == 'dive') {
            cool_dive = true;
            }
        }
    if(!cool_dive){
        dives++;
            if(dive < 2){
            client.action(canal, `Dalvenger se ha estampado ${dives} vez este stream.`);
            }else{
                client.action(canal, `Dalvenger se ha estampado ${dives} veces este stream.`);
            }
        cooldown.push('dive');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'dive') {
                    cooldown.splice(i, 1);
                    }
                }
        }, 30000);
    }
    
}