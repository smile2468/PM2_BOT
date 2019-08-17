const Discord = require('discord.js');
const numbers = ["0⃣", "1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣", "🔟"];
module.exports = async (compressed) => {
    const message = compressed.raw;
    const embed = new Discord.RichEmbed();
    let pages = [];
    compressed.pm2.list((items) => {
        embed.setColor("#7289DA")
            .setTitle("PM2 LIST");
        const chunked = compressed.modules.chunkArray(items, 5);
        chunked.forEach((chunk) => {
            let string = "";
            chunk.forEach((item) => {
                // string += `${get_status_emoji(item.pm2_env.status)} | #${item.pm_id} ${item.name} |\n`
                string += `PM2 ID: **${item.pm_id}**\nStatus: **${item.pm2_env.status.toString().toUpperCase()}** ${get_status_emoji(item.pm2_env.status)}\nName: **${item.name}**\n\n`
                // embed.addField(`PM2 ID: #${item.pm_id}`, `Status: **${item.pm2_env.status.toString().toUpperCase()}** ${get_status_emoji(item.pm2_env.status)}\nName: ${item.name}`);
            });
            pages.push(string);
        })
        embed.setDescription(pages[0]);
        message.channel.send(embed);
    })
}

function get_status_emoji(status) {
    switch (status) {
        case 'online':
            return '💚'
        case 'stopped':
            return '💛'
        case 'errored':
            return '❤'
        default:
            return '❓'
    }
}