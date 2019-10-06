module.exports = {
  list: {
    execute: require('../commands/list.js'),
    aliases: ['ㅣㅑㄴㅅ']
  },
  stop: {
    execute: require('../commands/stop.js'),
    aliases: ['ㄴ새ㅔ']
  },
  start: {
    execute: require('../commands/start.js'),
    aliases: ['ㄴㅅㅁㄳ']
  },
  restart: {
    execute: require('../commands/restart.js'),
    aliases: ['ㄴㅅㅁㄳ']
  }
}
