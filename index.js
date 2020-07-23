require("dotenv").config();
const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config.json");

const bot = new Discord.Client();
bot.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  bot.commands.set(command.name, command);
}

bot.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (
    command === "leave" ||
    command === "skip" ||
    command === "play" ||
    command === "fs" ||
    command === "join"
  ) {
    return;
  }

  if (!bot.commands.has(command))
    return message.reply("No such command, dingus.");
  else {
    try {
      bot.commands.get(command).execute(message, args);
    } catch (error) {
      console.log(error);
      message.reply(
        "There was an error trying to execute that command. Check your code Jeff.."
      );
    }
  }
});

//detect when someone joins/leaves a channel
// bot.on("voiceStateUpdate", function (oldState, newState) {
//   if (
//     newState.channel !== null &&
//     newState.member.displayName === "ysowasted" &&
//     (newState.channel.name === "Los Frijoles" ||
//       newState.channel.name === "Los Tontons")
//   ) {
//     console.log(`${newState.member.displayName} has joined`);
//   } else if (
//     newState.channel === null &&
//     newState.member.displayName === "ysowasted"
//   ) {
//     console.log(`${newState.member.displayName} has left`);
//   }
// });

bot.login(process.env.BOT_TOKEN);
