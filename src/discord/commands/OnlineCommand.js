const DiscordCommand = require('../../contracts/DiscordCommand')

class GuildList extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'online'
    this.aliases = ['online', 'on']
    this.description = 'Checks G Online'
  }

  onCommand() {
    this.sendMinecraftMessage(`/g online`)
  }
}

module.exports = GuildList