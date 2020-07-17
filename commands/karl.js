module.exports = {
    name:'karl',
    description: 'Karl facts',
    execute(message, args){
        message.channel.send(getRandomQuote());
    }
};

getRandomQuote = () => {
    const quotes = ['Never gets on :cry:', ':cow:'];

    return quotes[(Math.floor(Math.random() * quotes.length))];
}
