module.exports = {
    name:'pyramid',
    description: 'Make a pyramid of any size out of emojis',
    execute(message, args){
        if (args[0].toString() == 'usage') return message.channel.send('!pyramid [emoji] [size]');

        emojiPyramid(message, args);
    }
};

//Makes a pyramid of any size in chat of desired emoji
emojiPyramid = (message,args) => {
    const emoji = args[0].toString();
    const length = parseInt(args[1]);

    //length / 2 = amount of odd numbers from 1 to length. 
    //floor it to ignore '1' in the odd numbers since the last row doesnt need to be multiplied
    //multiplied by 6 because its the perfect amount of spaces to place the emojis evenly
    let spaces = Math.floor(length / 2) * 6;

    for (let i = 1; i <= length; i++){
        let emojis = '.';
        if (i % 2 != 0){
            for (let j = 0; j < spaces; j++){
                emojis += ' ';
            }
            //-6 every row because as the pyramid gets larger, we need less spaces
            spaces -= 6;
            for (let j = i; j > 0; j--){
                emojis += emoji;
            }
            message.channel.send(emojis);
        }
    }
}