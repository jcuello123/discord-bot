module.exports = {
    name:'bototo',
    description: 'Bototo quotes',
    execute(message, args){
        message.channel.send(getRandomBototo());
    }
};

getRandomBototo = () => {
    const quotes = ['Needs longer legs :joy:', 'Needs a new bike'];
    return quotes[(Math.floor(Math.random() * quotes.length))];
}