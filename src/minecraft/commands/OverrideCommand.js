const MinecraftCommand = require('../../contracts/MinecraftCommand')

class OverrideCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'override'
    this.aliases = ['o']
    this.description = 'Executes commands as the minecraft bot'
  }

  onCommand(username, message) { 
      if (username.includes("Azael_Nyaa")){
            message = message.split(" ")
            message.shift()
            message = message.join(" ")
    
        this.send(`/${message}`)
      }
  }
}

module.exports = OverrideCommand
