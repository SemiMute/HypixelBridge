const DiscordCommand = require('../../contracts/DiscordCommand')

class SetrankCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'setrank'
    this.description = `Sets provided user to provded rank`
  }

  onCommand(message) {
    let args = this.getArgs(message)
    let user = args.shift()
    let rank = args.shift()
    console.log(user, rank)
    this.sendMinecraftMessage(`/g setrank ${user ? user : ''} ${rank ? rank: ''}`)
  }
}

module.exports = SetrankCommand
