const Discord = require('discord.js');

class Bot {
    constructer (options) {
        this.client = new Discord.Client({ disableEveryone: true });
        this.options = options;
    }

    
}
