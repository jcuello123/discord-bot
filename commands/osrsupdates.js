const cheerio = require('cheerio');
const axios = require("axios");
const HOUR = 3600000;
const fs = require("fs");
const path = require("path");
let updates = readFile('updates.txt');
let called = false;

module.exports = { 
    name:'osrsupdates', 
    description: 'OSRS Updates',
    execute(message, args){ 
        getUpdates(message, "user");

        if (!called){
            called = true;
            setInterval(getUpdates, HOUR);
        }
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
            overWriteFile(newUpdates, 'updates.txt');
            message.channel.send("---------------------------------------------------------------------------------------------------------------");
            message.channel.send("NEW OSRS UPDATES:");
            message.channel.send(newUpdates);
            message.channel.send("---------------------------------------------------------------------------------------------------------------");
        }
        else if (caller === "user") {
            message.channel.send(`No osrs updates today <:Sadge:771734682274234419>`);
        }

        let currentDate = new Date();
        let cDay = currentDate.getDate();
        let cMonth = currentDate.getMonth() + 1;
        let cYear = currentDate.getFullYear();
        let date = `${cMonth}/${cDay}/${cYear}`;
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        let dateAndTime = `Latest update: ${date} at ${time}`;
        overWriteFile(dateAndTime, 'latest.txt');
    } 
    catch(error){
        console.log(error);    
    }
}

function readFile(file){
    try {
        const filePath = path.join(__dirname, file);
        const data = fs.readFileSync(filePath, 'utf8')
        return data;
    } catch (err) {
        console.error(err)
    }
}

function overWriteFile(data, file){
    const filePath = path.join(__dirname, file);
    fs.writeFile(filePath, data, function (err) {
        if (err){ 
            return console.log(err);
        }
        if (file === 'updates.txt'){
            updates = data;
        }
    });
}
