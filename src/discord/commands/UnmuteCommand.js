const DiscordCommand = require('../../contracts/DiscordCommand')

class UnMuteCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'unmute'
    this.aliases = ['um']
    this.description = 'Unutes the given user for a given amount of time'
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()

    this.sendMinecraftMessage(`/g unmute ${user}`)
  }
}

module.exports = UnMuteCommand