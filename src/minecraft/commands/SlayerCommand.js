const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
function numberWithCommas(x) {
  x = x.toString().split(".")[0]
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getSlayerFromUser(name){
    try{const { data } = await axios.get('https://api.altpapier.dev/v1/profiles/'+name+'?key=IPke2LEKG1ShqOlY8KIM7Uv8oA05p6Ek')
    let wslayerEXP = data.data[0].slayer.wolf.xp
    let zslayerEXP = data.data[0].slayer.zombie.xp
    let sslayerEXP = data.data[0].slayer.spider.xp
    let eslayerEXP = data.data[0].slayer.enderman.xp
    let slayerEXP = numberWithCommas(wslayerEXP+zslayerEXP+sslayerEXP+eslayerEXP)
    let wslayerLVL = data.data[0].slayer.wolf.level
    let zslayerLVL = data.data[0].slayer.zombie.level
    let sslayerLVL = data.data[0].slayer.spider.level
    let eslayerLVL = data.data[0].slayer.enderman.level
    let stats = "Total Slayer EXP: "+ slayerEXP + " Zombie level: " + zslayerLVL+", "+numberWithCommas(zslayerEXP)+"xp" + " Spider level: " + sslayerLVL+", "+numberWithCommas(sslayerEXP)+"xp" + " Wolf level: " + wslayerLVL+", "+numberWithCommas(wslayerEXP)+"xp" + " Enderman level: " + eslayerLVL+", "+numberWithCommas(eslayerEXP)+"xp"
    return stats
}
catch{
  return "Learn to type fucking bozo"
}
}

class SlayerCommand extends MinecraftCommand {
    constructor(minecraft) {
      super(minecraft)
  
      this.name = 'slayer'
      this.description = "Says users stats"
    }
  
    async onCommand(username, message) {
      let args = message.split(" ")
      if (message.endsWith("!slayer")){
        getSlayerFromUser(username).then(stats=>{
            this.send(`/gc ${username}'s Slayers: ${stats.replaceAll(";",",")}`)
      })
    }
      else {
        getSlayerFromUser(args[1]).then(stats=>{
            this.send(`/gc ${args[1]}'s Slayers: ${stats.replaceAll(";",",")}`)
          })
      }
    }
  }
  
  module.exports = SlayerCommand