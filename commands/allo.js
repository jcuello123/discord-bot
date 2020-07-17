module.exports = {
    name:'allo',
    description: 'Allo',
    execute(message, args){
        message.reply(getRandomGreet());
    }
};

getRandomGreet = () => {
    const greets = ['Allo bonbon', 'Toton!', 'Oi', 'Que bola', 'Yo','Hey man','Sup'];
    return greets[Math.floor(Math.random() * greets.length + 1)];
}