const Discord = require('discord.js');
const logger = require('./logger');
class Bot {
    constructor (options) {
        this.client = new Discord.Client({ disableEveryone: true });
        this.options = options;
    }
    init () {
        this.client.login(this.options.bot.token);
        this.client.on('message', (message) => {
            console.log(message);
        });
    }
}

const Client = new Bot(require('./settings.js'));

Client.init();