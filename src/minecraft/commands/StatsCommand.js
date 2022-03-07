const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
function numberWithCommas(x) {
  x = x.toString().split(".")[0]
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
async function getStatsFromUsername(name) {
  try {
    const { data } = await axios.get('https://api.altpapier.dev/v1/profiles/' + name + '?key=IPke2LEKG1ShqOlY8KIM7Uv8oA05p6Ek')
    let nw = numberWithCommas(data.data[0].networth.total_networth)
    let farming = data.data[0].skills.farming.level
    let mining = data.data[0].skills.mining.level
    let combat = data.data[0].skills.combat.level
    let foraging = data.data[0].skills.foraging.level
    let fishing = data.data[0].skills.fishing.level
    let enchant = data.data[0].skills.enchanting.level
    let alch = data.data[0].skills.alchemy.level
    let taming = data.data[0].skills.taming.level
    let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming) / 8, 1)
    let cata = numberWithCommas(data.data[0].dungeons.catacombs.skill.level)
    let wslayer = data.data[0].slayer.wolf.xp
    let zslayer = data.data[0].slayer.zombie.xp
    let sslayer = data.data[0].slayer.spider.xp
    let eslayer = data.data[0].slayer.enderman.xp
    let slayer = numberWithCommas(wslayer + zslayer + sslayer + eslayer)
    let stats = `Skill Avg: ${sa}; Slayer: ${slayer}; Cata: ${cata}; Networth: $${nw}`
    return stats
  }
  catch {
    return "Error"
  }
}




class StatsCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'stats'
    this.aliases = ['skills']
    this.description = "Says users stats"
  }

  async onCommand(username, message) {
    let args = message.split(" ")
    if (message.endsWith("!stats")) {
      getStatsFromUsername(username).then(stats => {
        this.send(`/gc ${username}'s stats: ${stats.replaceAll(";", ",")}`)
        this.minecraft.broadcastCleanEmbed({ message: `${username}'s stats: \n${stats.replaceAll(";", "\n")}`, color: "47F049" })
      })
    }
    else {
      getStatsFromUsername(args[1]).then(stats => {
        this.send(`/gc ${args[1]}'s stats: ${stats.replaceAll(";", ",")}`)
        this.minecraft.broadcastCleanEmbed({ message: `${args[1]}'s stats: \n${stats.replaceAll(";", "\n")}`, color: "47F049" })
      })
    }
  }
}

module.exports = StatsCommand