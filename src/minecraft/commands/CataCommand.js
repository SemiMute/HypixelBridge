const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
function numberWithCommas(x) {
  x = x.toString().split(".")[0]
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

async function getDungeonFromUser(name) {
  try {
    const { data } = await axios.get('https://api.altpapier.dev/v1/profiles/' + name + '?key=IPke2LEKG1ShqOlY8KIM7Uv8oA05p6Ek')
    let secrets = data.data[0].dungeons.secrets_found
    let lvl = data.data[0].dungeons.catacombs.skill.level
    let h = data.data[0].dungeons.classes.healer.level
    let m = data.data[0].dungeons.classes.mage.level
    let b = data.data[0].dungeons.classes.berserk.level
    let a = data.data[0].dungeons.classes.archer.level
    let t = data.data[0].dungeons.classes.tank.level

    let stats = "Cata: " + lvl + ", Healer: " + h + ", Mage: " + m + ", Berserk: " + b + ", Archer: " + a + ", Tank: " + t + ", Secrets: " + numberWithCommas(secrets)
    return stats

  }
  catch {
    return "Learn to type bozo"
  }
}
class CatacombsCommand extends MinecraftCommand {
    constructor(minecraft) {
      super(minecraft)
  
      this.name = 'cata'
      this.description = "Says users dungeon stats"
    }
  
    async onCommand(username, message) {
      let args = message.split(" ")
      if (message.endsWith("!cata")){
        getDungeonFromUser(username).then(stats=>{
            this.send(`/gc ${username}'s Cata Stats: ${stats.replaceAll(";",",")}`)
      })
    }
      else {
          getDungeonFromUser(args[1]).then(stats=>{
            this.send(`/gc ${args[1]}'s Cata Stats: ${stats.replaceAll(";",",")}`)
          })
        
      }
    }
  }
  
  module.exports = CatacombsCommand