const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();

console.log(process.env.DISCORD_API);
client.once('ready', () =>{
    console.log('Start af');
    
})
client.on('guildMemberUpdate', (oldMember, newMember) => {
    
    // if(newMember.nickname && oldMember.nickname !== newMember.nickname) {
    //     if(newMember.nickname === 'somethink') {
    //         newMember.setNickname('NickName')
    //     }
    // }
    if(newMember.user.id == 279828346240630786)
    {
        newMember.setNickname("NegativeTalent");
    }
    else if(newMember.user.id == 413398657791164416)
    {
        newMember.setNickname("Protagonist");
    }
    
//     if(newMember.user.id != 279828346240630786) return; 
//     newMember.setNickname("NegativeTalent");
 });
client.login(process.env.DISCORD_API);
