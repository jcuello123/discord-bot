module.exports = {
    name:'willy',
    description: 'Willy facts',
    execute(message, args){
        message.channel.send(getRandomWilly());
    }
};

getRandomWilly = () => {
    const quotes = ['Leeeeeet me get a 3 pack new ports 100', 'Level 22 Skeleton', 
    'Pu. Pee you. Cu. Tee you. Ru. Are UUUUUU'];

    return quotes[(Math.floor(Math.random() * quotes.length))];
}