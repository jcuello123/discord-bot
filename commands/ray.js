module.exports = {
    name:'ray',
    description: 'Ray quotes',
    execute(message, args){
        message.channel.send(getRandomRay());
    }
};

getRandomRay = () => {
    const quotes = ['Snook too big.. Please try again later', 'Shalalalalalala', 
    'Ray is prob wearing a white shirt and black gym shorts right now', 'Ray is prob hungry right now'];

    return quotes[(Math.floor(Math.random() * quotes.length))];
}