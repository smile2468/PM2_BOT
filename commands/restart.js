const Discord = require('discord.js')
// const numbers = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣', '🔟']
module.exports = async (compressed) => {
  const message = compressed.raw
  if (compressed.args.length === 0) return message.channel.send(':negative_squared_cross_mark: 프로세스 번호가 필요합니다')
  compressed.pm2.list((list) => {
    if (isNaN(Number(compressed.args[0])) === false) {
      if (!list[compressed.args[0]]) return message.channel.send(':negative_squared_cross_mark: 프로세스가 존재하지 않습니다')
      require('child_process').execSync(`sudo pm2 restart ${compressed.args[0]}`)
      setTimeout(() => {
        const embed = new Discord.RichEmbed()
        compressed.pm2.list((list) => {
          embed.setColor('#7289DA')
            .setTitle('PM2 STOP')
          let string = ''
          list.forEach((item) => {
          // string += `${get_status_emoji(item.pm2_env.status)} | #${item.pm_id} ${item.name} |\n`
            string += `[**${item.pm_id}**] **${item.name}** Status: **${item.pm2_env.status.toString().toUpperCase()}** ${get_status_emoji(item.pm2_env.status)}\n`
          // embed.addField(`PM2 ID: #${item.pm_id}`, `Status: **${item.pm2_env.status.toString().toUpperCase()}** ${get_status_emoji(item.pm2_env.status)}\nName: ${item.name}`);
          })
          embed.setDescription(string)
          message.channel.send(embed)
        })
      }, 500)
    } else {
      message.channel.send(':negative_squared_cross_mark: 프로세스 번호가 숫자가 아닙니다')
    }
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
