const DiscordCommand = require('../../contracts/DiscordCommand')

class OverrideCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'override'
    this.aliases = ['o']
    this.description = 'Executes commands as the minecraft bot'
    this.requires = 'owner'
  }

  onCommand(message) {
    let args = this.getArgs(message).join(' ')

    if (args.length == 0) {
      return message.channel.send(`No command specified`)
    }

    this.sendMinecraftMessage(`/${args}`)

    message.channel.send(`\`/${args}\` has been executed`)
  }
}

module.exports = OverrideCommand
