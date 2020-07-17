module.exports = {
    name:'joel',
    description: 'Joel facts',
    execute(message, args){
        message.channel.send(getRandomQuote());
    }
};

getRandomQuote = () => {
    const quotes = ['Joel has been abducted by aliens :thinking:', 'Yes Brandon', 
    'Joel secretly has other friends in another discord :thinking:', 'Joel forgot about us :pensive:'];

    return quotes[(Math.floor(Math.random() * quotes.length))];
}