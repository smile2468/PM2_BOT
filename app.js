const Discord = require('discord.js');
const commands = require('./commands');
const settings = require('./settings.js');
const pm2 = require('pm2');
const modules = require('./modules');

function handleError(err) {
    if (err) {
        console.log(err);
        process.exit(2);
    }
}

class PM2Manager {
    constructor() {
        pm2.connect((err) => {
            handleError(err);
        });
        this.processList = null;
    }

    list(cb) {
        pm2.list((err, list) => {
            handleError(err);
            this.processList = list;
            cb(list);
        });
    }
};
const pm2manager = new PM2Manager();

class CommandMessage {
    constructor(raw) {
        this.raw = raw;
        this.args = raw.content.slice(settings.bot.prefix.length).trim().split(/ +/g);
        this.command = this.args.shift().toLowerCase();
        this.pm2 = pm2manager;
        this.modules = modules;
    }

    run() {
        const item = searchCommands(this.command);
        if (item) {
            item.execute(this).catch((e) => {
                handleError(e);
            });
        }
    }
};

class Bot {
    constructor(options) {
        this.client = new Discord.Client({ disableEveryone: true });
        this.options = options;
    }
    init() {
        this.client.login(this.options.bot.token);
        this.client.on('ready', () => {
            console.log(`Im Ready! Logged in as ${this.client.user.tag}`)
        });
        this.client.on('message', (message) => {
            if (message.content.startsWith(this.options.bot.prefix)) {
                const cmd = new CommandMessage(message);
                cmd.run();
            }
        });
    }
};

const Client = new Bot(settings);

Client.init();

function searchCommands(cmd) {
    const array = Object.entries(commands).map(el => {
        return {
            name: el[0],
            aliases: el[1].aliases,
            item: el[1]
        }
    })
    for (const item of array) {
        if (item.aliases.includes(cmd) || item.name === cmd) {
            return item.item;
        }
    }
    return null;
};