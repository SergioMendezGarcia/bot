exports.run = (client, canal, cooldown) => {

    var cool_playlist = false;
    for(let i=0; i<cooldown.length;i++){
        if(cooldown[i] == 'playlist'){
            cool_playlist = true;
        }
    }
    if(!cool_playlist){
        client.action(canal, 'https://open.spotify.com/user/deftonic89/playlist/0y2CsSrMdhrxpoyYX7u2rQ?si=TDWJ2bmSRPO8Tj52WTal7A');
        cooldown.push('playlist');
        setTimeout(() => {
            for(let i=0; i<cooldown.length;i++){
                if (cooldown[i] == 'playlist'){
                    cooldown.splice(i, 1);
                }
            }
        }, 30000);
    }
    
}