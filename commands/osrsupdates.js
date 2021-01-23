const cheerio = require('cheerio');
const axios = require("axios");

module.exports = { 
    name:'osrsupdates', 
    description: 'OSRS Updates',
    execute(message, args){ 
        getUpdates(message);
    }
};

getUpdates = async (message) => {
    try {
        const html = await axios.get("https://oldschool.runescape.com");
        const $ = await cheerio.load(html.data);

        $("article").each((i, a) => {
            const title = $(a).find("a").text().split("Read More")[0];
            const time = $(a).find("time").text();
            message.channel.send(`${title} (${time})`);
        });
    } 
    catch(error){
        console.log(error);    
    }
}
