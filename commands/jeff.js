module.exports = {
    name:'jeff',
    description: 'Jeff facts',
    execute(message, args){
        message.channel.send(getRandomJeff());
    }
};

getRandomJeff = () => {
    const quotes = ['Prob afk :sweat_smile:', 'Has the smallest snook in here', 'El jefe', 'He got 2 booties :yum:'];
    return quotes[(Math.floor(Math.random() * quotes.length))];
}