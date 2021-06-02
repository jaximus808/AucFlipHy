const fetch = require("node-fetch");
const Discord = require('discord.js');
const client = new Discord.Client();
require("dotenv").config();
client.on('guildCreate', guild => {
    console.log(guild.channels);
    if(guild.channels.cache.get('746093454081261663') === null)
    {
        return;
    }
    guild.channels.cache.get('746093454081261663').send("I'm watching you Rachel :)")
})

client.once('ready', () =>{
    console.log('Start af');
    
})


client.on('message', message =>{

    var sortedAuctionData = {};
    var sortedBinData = {};

    var flipObs = {};
    function handleDataOne(totalPages)
    {
        for(let i = 0; i < totalPages; i++)
        {
            fetch(`https://api.hypixel.net/skyblock/auctions?page=${i}`)
            .then(res =>res.json()).then((json) => {SortData(json, i,json.auctions.length ); })
        }

    }
    function SortData(list, page, len)
    {
        let unSortedData = list;
        for(let i = 0; i < len; i++)
        {
            if(unSortedData.auctions[i].starting_bid > 300000 && unSortedData.auctions[i].bin)
            {
                if(sortedBinData[unSortedData.auctions[i].item_name])
                {
                    if(sortedBinData[unSortedData.auctions[i].item_name].starting_bid > unSortedData.auctions[i].starting_bid && sortedBinData[unSortedData.auctions[i].item_name].starting_bid != 0 )
                    {
                        sortedBinData[unSortedData.auctions[i].item_name] = 
                        {
                            uuid : unSortedData.auctions[i].uuid,
                            auctioneer : unSortedData.auctions[i].auctioneer,
                            start: unSortedData.auctions[i].start,
                            end: unSortedData.auctions[i].end,
                            item_name: unSortedData.auctions[i].item_name,
                            category: unSortedData.auctions[i].category,
                            starting_bid: unSortedData.auctions[i].starting_bid,
                            bin: true
                        };
                    }
                    
                }
                else 
                {
                    sortedBinData[unSortedData.auctions[i].item_name] = 
                        {
                            uuid : unSortedData.auctions[i].uuid,
                            auctioneer : unSortedData.auctions[i].auctioneer,
                            start: unSortedData.auctions[i].start,
                            end: unSortedData.auctions[i].end,
                            item_name: unSortedData.auctions[i].item_name,
                            category: unSortedData.auctions[i].category,
                            starting_bid: unSortedData.auctions[i].starting_bid,
                            bin: true
                        };
                }
            }
            else if(unSortedData.auctions[i].starting_bid > 300000 )
            {
                if(sortedAuctionData[unSortedData.auctions[i].item_name] )
                {
                    if((sortedAuctionData[unSortedData.auctions[i].item_name].highest_value > unSortedData.auctions[i].highest_bid_amount && sortedAuctionData[unSortedData.auctions[i].item_name].highest_bid_amount != 0 ))
                    {
                        let highestBid = 0;
                        if( unSortedData.auctions[i].highest_bid_amount == 0) 
                        {
                            highestBid = unSortedData.auctions[i].starting_bid;
                        }
                        else
                        {
                            highestBid = unSortedData.auctions[i].highest_bid_amount;
                        }
                        sortedAuctionData[unSortedData.auctions[i].item_name] = 
                        {
                            uuid : unSortedData.auctions[i].uuid,
                            auctioneer : unSortedData.auctions[i].auctioneer,
                            start: unSortedData.auctions[i].start,
                            end: unSortedData.auctions[i].end,
                            item_name: unSortedData.auctions[i].item_name,
                            category: unSortedData.auctions[i].category,
                            starting_bid: unSortedData.auctions[i].starting_bid,
                            highest_bid_amount: unSortedData.auctions[i].highest_bid_amount,
                            highest_value: highestBid,
                            bin: false
                        };
                    }
                }
                else 
                {
                    let highestBid = 0;
                    if( unSortedData.auctions[i].highest_bid_amount == 0) 
                    {
                            highestBid = unSortedData.auctions[i].starting_bid;
                    }
                    else
                    {
                        highestBid = unSortedData.auctions[i].highest_bid_amount;
                    }
                    sortedAuctionData[unSortedData.auctions[i].item_name] = 
                    {
                        uuid : unSortedData.auctions[i].uuid,
                        auctioneer : unSortedData.auctions[i].auctioneer,
                        start: unSortedData.auctions[i].start,
                        end: unSortedData.auctions[i].end,
                        item_name: unSortedData.auctions[i].item_name,
                        category: unSortedData.auctions[i].category,
                        starting_bid: unSortedData.auctions[i].starting_bid,
                        highest_bid_amount: unSortedData.auctions[i].highest_bid_amount,
                        highest_value: highestBid,
                        bin: false
                    };
                }
            } 
            
        }
        if(page ==unSortedData.totalPages-1 ) 
        {
            FlipTime();
        }
    }
    function FlipTime()
    {
        console.log(sortedBinData);
        console.log(sortedAuctionData);
        console.log(`sorted Bin Data has ${Object.keys(sortedBinData).length} properties.`)
        console.log(`sorted Auction Data has ${Object.keys(sortedAuctionData).length} properties.`)
    }
    if(message.author.bot) return;
    let input = message.content;
    var stringArray = input.toLowerCase().split(' ');
    if(stringArray[0] == "-af")
    {
        if(stringArray.length == 1)
        {
            message.channel.send("Input more parameters")
            return;
        }
        
        //first fetch to get total pages
        fetch("https://api.hypixel.net/skyblock/auctions?page=0")
        .then(res =>res.json()).then((json) => {handleDataOne(json.totalPages); })
        
    }
})
client.login(process.env.DISCORD_API);