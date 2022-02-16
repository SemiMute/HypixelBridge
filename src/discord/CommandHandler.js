const fs = require('fs')
const { Collection } = require('discord.js-light')

class CommandHandler {
  constructor(discord) {
    this.discord = discord

    this.prefix = discord.app.config.discord.prefix

    this.commands = new Collection()
    let commandFiles = fs.readdirSync('./src/discord/commands').filter(file => file.endsWith('.js'))
    for (const file of commandFiles) {
      const command = new (require(`./commands/${file}`))(discord)
      this.commands.set(command.name, command)
    }
  }

  handle(message) {
    if(message.content.startsWith(`-`)){
      return;
    }
    if (!message.content.startsWith(this.prefix)) {
      return false
    }

    let args = message.content.slice(this.prefix.length).trim().split(/ +/)
    let commandName = args.shift().toLowerCase()

    let command = this.commands.get(commandName)
      || this.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) {
      return false
    }
    if(command.requres == "owner"){
      if(!this.isOwner(message.author)){
        return message.channel.send({
          embed: {
            description: "You do not have permission to do that. Requires OWNER permission.",
            color: 'DC143C'
          }
        })
      }
    }
    if(command.requires == "admin"){
      if(!this.isCommander(message.member)){
        return message.channel.send({
          embed: {
            description: "You do not have permission to do that. Requires ADMIN permission.",
            color: 'DC143C'
          }
        })
      }
    }

    this.discord.app.log.discord(`[${command.name}] ${message.content}`)
    command.onCommand(message)

    return true
  }

  isCommander(member) {
    return member.roles.cache.find(r => r.id == this.discord.app.config.discord.commandRole)
  }

  isOwner(member) {
    return member.id == this.discord.app.config.discord.ownerId
  }
}

module.exports = CommandHandler
