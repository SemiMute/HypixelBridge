const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");

async function translate(a,b,text){
    if(a.length != 2){
        let translated = "Invalid Format, use ISO language codes"
        return translated
    }
    if(b.length != 2){
        let translated = "Invalid Format, use ISO language codes"
        return translated
    }
    try{
        const { data } = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=${a}&tl=${b}&dt=t&q=${text}`)
        let translated = data[0][0][0]
        return translated
    }
    catch{
        let translated = "Error"
        return translated
    }    
    
}

class TranslateCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'translate'
    this.aliases = ["trans"]
    this.description = 'Translates shit'
  }

  async onCommand(username, message) {
    let args = message.split(" ")
    message = message.replace(args[0], "")
    message = message.replace(args[1], "")
    message = message.replace(args[2], "")
    translate(args[1],args[2],message).then(translated=>{
        this.send(`/gc ${translated}`)
      })
  }
}

module.exports = TranslateCommand
