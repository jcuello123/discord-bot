const cheerio = require('cheerio');
const axios = require("axios");
const HOUR = 3600000;
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, 'updates.txt');
let updates = readFile();
let called = false;

module.exports = { 
    name:'osrsupdates', 
    description: 'OSRS Updates',
    execute(message, args){ 
        getUpdates(message, "user");
    }
};

async function getUpdates(message, caller) {
    try {
        let newUpdates = "";
        const html = await axios.get("https://oldschool.runescape.com");
        const $ = await cheerio.load(html.data);

        $("article").each((i, art) => {
            const title = $(art).find("a").text().split("Read More")[0];
            const time = $(art).find("time").text();
            newUpdates += `${title} (${time})`.trim() + "\n";
        });

        newUpdates = newUpdates.trimEnd();
        
        if (newUpdates !== updates){
            overWriteFile(newUpdates);
            message.channel.send("---------------------------------------------------------------------------------------------------------------");
            message.channel.send("NEW OSRS UPDATES:");
            message.channel.send(newUpdates);
            message.channel.send("---------------------------------------------------------------------------------------------------------------");
        }
        else if (caller === "user") {
            message.channel.send(`No osrs updates today <:Sadge:771734682274234419>`);
        }
    } 
    catch(error){
        console.log(error);    
    }

    if (!called){
        called = true;

        setInterval(() => {
            called = false;
            getUpdates(message, "bot");
        }, HOUR);
    }
}

function readFile(){
    try {
        const data = fs.readFileSync(filePath, 'utf8')
        return data;
    } catch (err) {
        console.error(err)
    }
}

function overWriteFile(data){
    fs.writeFile(filePath, data, function (err) {
        if (err) return console.log(err);
        updates = data;
    });
}