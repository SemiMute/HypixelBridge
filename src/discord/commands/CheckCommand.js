const DiscordCommand = require('../../contracts/DiscordCommand')

class CheckCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'check'
    this.aliases = ['ch']
    this.description = 'Checks a minecraft user\'s information'
  }

  onCommand(message) {
    let args = this.getArgs(message).join(' ')
    message.channel.send(`Such cool command, i wonder what it will do...`)
  }
}

module.exports = CheckCommand