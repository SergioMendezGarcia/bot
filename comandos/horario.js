exports.run = (client, canal, cooldown) => {

    var cool_horario = false;
    for(let i=0; i<cooldown.length;i++){
        if (cooldown[i] == 'horario') {
            cool_horario = true;
            }
        }
    if(!cool_horario){
        client.action(canal, 'Hago stream de lunes a jueves de 8 de la tarde a 12 de la noche, y sábados de 6 de la tarde a 6 de la mañana hora peninsular española. Si eres de latam y quieres comprobar que hora es aquí, utiliza el comando !hora');
        cooldown.push('horario');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'horario') {
                    cooldown.splice(i, 1);
                    }
                }
        }, 30000);
    }
    
}