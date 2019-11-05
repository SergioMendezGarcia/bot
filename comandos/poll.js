exports.run = (message, opcion1, opcion2, viewer, votantes) => {

    var votado = false;
    for(let i=0; i<votantes.length;i++){
        if (votantes[i] == viewer) {
            votado = true;
            }
        }
    if (!votado) {
        switch (message) {
            case '!vote 1':
                opcion1.push(viewer);
                console.log(opcion1);
                console.log('voto efectuado por ' + viewer);
                votantes.push(viewer);
                break;
            case '!vote 2':
                opcion2.push(viewer);
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