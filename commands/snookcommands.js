const fs = require('fs');

let commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

module.exports = {
    name:'snookcommands',
    description: 'All commands',
    execute(message, args){
        commandFiles = commandFiles.map(command => {
           return '!' + command.split('.js');
        });
        message.channel.send(commandFiles);
    }
};