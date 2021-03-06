const cheerio = require("cheerio");
const axios = require("axios");
const HOUR = 3600000;
const fs = require("fs");
const path = require("path");
let called = false;

module.exports = {
  name: "osrsupdates",
  description: "OSRS Updates",
  execute(message, args) {
    getUpdates(message, "user");

    if (!called) {
      called = true;
      setInterval(() => {
        getUpdates(message, "BOT");
      }, HOUR);
    }
  },
};

async function getUpdates(message, caller) {
  try {
    if (caller === "BOT") {
      let currentDate = new Date();
      let cDay = currentDate.getDate();
      let cMonth = currentDate.getMonth() + 1;
      let cYear = currentDate.getFullYear();
      let date = `${cMonth}/${cDay}/${cYear}`;
      let hours = currentDate.getHours();
      let mins = currentDate.getMinutes();
      let time = hours + ":" + mins + ":" + currentDate.getSeconds();
      let dateAndTime = `Latest bot call: ${date} at ${time}. (hours is +4 ahead of normal time)`;
      console.log(dateAndTime);
    }
    let updates = readFile("updates.txt");
    let newUpdates = "";
    const html = await axios.get("https://oldschool.runescape.com");
    const $ = await cheerio.load(html.data);

    $("article").each((i, art) => {
      const title = $(art).find("a").text().split("Read More")[0];
      const time = $(art).find("time").text();
      newUpdates += `${title} (${time})`.trim() + "\n";
    });

    newUpdates = newUpdates.trimEnd();

    if (newUpdates !== updates) {
      overWriteFile(newUpdates, "updates.txt");
      message.channel.send(
        "---------------------------------------------------------------------------------------------------------------"
      );
      message.channel.send("NEW OSRS UPDATES:");
      message.channel.send(newUpdates);
      message.channel.send(
        "---------------------------------------------------------------------------------------------------------------"
      );
    } else if (caller === "user") {
      message.channel.send(`No osrs updates today <:Sadge:771734682274234419>`);
    }
  } catch (error) {
    console.log(error);
  }
}

function readFile(file) {
  try {
    const filePath = path.join(__dirname, file);
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

function overWriteFile(data, file) {
  try {
    const filePath = path.join(__dirname, file);

    fs.writeFile(filePath, data, function (err) {
      if (err) {
        return console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}
