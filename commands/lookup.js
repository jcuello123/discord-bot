const hiscores = require("osrs-json-hiscores");

module.exports = {
  name: "lookup",
  description: "Look up a player on OSRS",
  execute(message, args) {
    if (args.length === 1) getAllSkills(message, args);
    else if (args.length === 2) getSpecificSkill(message, args);
  },
};

function getAllSkills(message, args) {
  const player = args[0].toString();

  hiscores
    .getStats(player)
    .then((res) =>
      message.channel.send(JSON.stringify(res.main.skills).split(","))
    )
    .catch((error) => {
      console.log(error);
      message.channel.send(
        "There was an error retrieving that player's hiscores. Make sure its spelled correctly."
      );
    });
}

function getSpecificSkill(message, args) {
  const skill = args[0].toString();
  const player = args[1].toString();

  hiscores
    .getStats(player)
    .then((res) => message.channel.send(`${skill}: ` + JSON.stringify(res.main.skills[skill])))
    .catch((error) => {
      console.log(error);
      message.channel.send(
        "There was an error retrieving that player's hiscores. Make sure its spelled correctly."
      );
    });
}
