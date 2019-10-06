const Discord = require('discord.js')
// const numbers = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟']
module.exports = async (compressed) => {
  const message = compressed.raw
  const embed = new Discord.RichEmbed()
  compressed.pm2.list((items) => {
    embed.setColor('#7289DA')
      .setTitle('PM2 LIST')
    let string = ''
    items.forEach((item) => {
      // string += `${get_status_emoji(item.pm2_env.status)} | #${item.pm_id} ${item.name} |\n`
      string += `[**${item.pm_id}**] **${item.name}** Status: **${item.pm2_env.status.toString().toUpperCase()}** ${get_status_emoji(item.pm2_env.status)}\n`
      // embed.addField(`PM2 ID: #${item.pm_id}`, `Status: **${item.pm2_env.status.toString().toUpperCase()}** ${get_status_emoji(item.pm2_env.status)}\nName: ${item.name}`);
    })
    embed.setDescription(string)
    message.channel.send(embed)
  })
}

function get_status_emoji (status) {
  switch (status) {
    case 'online':
      return '💚'
    case 'stopped':
      return '❤'
    case 'errored':
      return '💛'
    default:
      return '❓'
  }
}
