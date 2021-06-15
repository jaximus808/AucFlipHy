const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();

console.log(process.env.DISCORD_API);
client.once('ready', () =>{
    console.log('Start af');
    
})


// client.on('message', message =>{

//     var sortedAuctionData = {};
//     var sortedBinData = {};

//     var flipObs = {};
//     function handleDataOne(totalPages)
//     {
//         for(let i = 0; i < totalPages; i++)
//         {
//             fetch(`https://api.hypixel.net/skyblock/auctions?page=${i}`)
//             .then(res =>res.json()).then((json) => {SortData(json, i,json.auctions.length ); })
//         }

//     }
    
//     if(message.author.bot) return;
//     let input = message.content;
//     var stringArray = input.toLowerCase().split(' ');
//     if(stringArray[0] == "-af")
//     {
//         if(stringArray.length == 1)
//         {
//             message.channel.send("Input more parameters")
//             return;
//         }
        
//         //first fetch to get total pages
//         fetch("https://api.hypixel.net/skyblock/auctions?page=0")
//         .then(res =>res.json()).then((json) => {handleDataOne(json.totalPages); })
        
//     }
// })

client.on('guildMemberUpdate', (oldMember, newMember) => {
    
    // if(newMember.nickname && oldMember.nickname !== newMember.nickname) {
    //     if(newMember.nickname === 'somethink') {
    //         newMember.setNickname('NickName')
    //     }
    // }
    if(newMember.user.id == 413398657791164416)
    {
        newMember.setNickname("Protagonist");
    }
    if(newMember.user.id != 279828346240630786) return; 
    newMember.setNickname("NegativeTalent");
 });
client.login(process.env.DISCORD_API);
