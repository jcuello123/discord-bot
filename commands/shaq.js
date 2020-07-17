module.exports = {
    name:'shaq',
    description: 'Shaq facts',
    execute(message, args){
        message.channel.send(getRandomShaq());
    }
};

getRandomShaq = () => {
    const quotes = ['What that is? Hot dog water?', 'Bet you cant whoop me tho', 
    'MMMMMMmmmmmmm', 'Foo af'];

    return quotes[(Math.floor(Math.random() * quotes.length))];
}