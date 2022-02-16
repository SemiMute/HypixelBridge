const CommunicationBridge = require('../contracts/CommunicationBridge')
const CommandHandler = require('./CommandHandler')
const StateHandler = require('./handlers/StateHandler')
const ErrorHandler = require('./handlers/ErrorHandler')
const ChatHandler = require('./handlers/ChatHandler')
const mineflayer = require('mineflayer')

class MinecraftManager extends CommunicationBridge {
  constructor(app) {
    super()

    this.app = app

    this.stateHandler = new StateHandler(this)
    this.errorHandler = new ErrorHandler(this)
    this.chatHandler = new ChatHandler(this, new CommandHandler(this))
  }

  connect() {
    this.bot = this.createBotConnection()

    this.errorHandler.registerEvents(this.bot)
    this.stateHandler.registerEvents(this.bot)
    this.chatHandler.registerEvents(this.bot)
  }

  createBotConnection() {
    return mineflayer.createBot({
      host: this.app.config.server.host,
      port: this.app.config.server.port,
      username: this.app.config.minecraft.username,
      password: this.app.config.minecraft.password,
      version: "1.8.9",
      auth: this.app.config.minecraft.accountType,
    })
  }


  onBroadcast({ username, message, replyingTo }) {
    if(message.length >= 250){
      return;
    }
    function makeid(length) {
      var result           = [];
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * 
   charactersLength)));
     }
     return result.join('');
  }
    this.app.log.broadcast(`[${makeid(7)}] <${username}> ${message}`, 'Minecraft')

    if (this.bot.player !== undefined) {
      this.bot.chat(`/gc ${replyingTo ? `[${makeid(7)}] ${username} replying to ${replyingTo}:` : `[${makeid(7)}] <${username}>`} ${message}`)
    }
  }
}

module.exports = MinecraftManager
