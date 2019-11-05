exports.run = (client, canal, opcion1, opcion2, votantes) => {

        var totalvotos = opcion1.length + opcion2.length;
        console.log(totalvotos);
        var votos1 = opcion1.length/totalvotos*100;
        console.log(votos1);
        var votos2 = opcion2.length/totalvotos*100;
        console.log(votos2);
        if (votos1 == votos2){
            client.action(canal, `La votación ha concluido en empate.`);
        }else if(votos1 > votos2){
            client.action(canal, `La opcion 1 ha ganado con un ${Math.round(votos1)}%.`);
        }else{
            client.action(canal, `La opcion 2 ha ganado con un ${Math.round(votos2)}%.`);
        }
        for(let i=0; i<opcion1.length;i++){
            opcion1.pop();
        }
        for(let i=0; i<opcion2.length;i++){
            opcion2.pop();
        }
        for(let i=0; i<=votantes.length;i++){
            votantes.pop();
        }
    
}