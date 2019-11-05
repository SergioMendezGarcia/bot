exports.run = (client, canal, cooldown) => {

    var cool_redes = false;
    for(let i=0; i<cooldown.length;i++){
        if (cooldown[i] == 'redes') {
            cool_redes = true;
            }
        }
    if(!cool_redes){
        client.action(canal, 'Sigueme en mis redes sociales para no perderte novedades sobre el stream. Twitter: https://cutt.ly/UegGywg Instagram: https://cutt.ly/aegGy3h');
        cooldown.push('redes');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'redes') {
                    cooldown.splice(i, 1);
                    }
                }
        }, 30000);
    }
    
}