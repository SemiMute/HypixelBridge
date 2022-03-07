const DiscordCommand = require('../../contracts/DiscordCommand')
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
class StatsCommand extends DiscordCommand {
    constructor(discord) {
      super(discord)

      this.name = 'stats'
      this.aliases = ['skills']
      this.description = `Checks user's stats`
    }

    onCommand(message) {
        let args = this.getArgs(message)
        let user = args.shift()
        getStatsFromUsername(user).then(stats=>{
        this.sendMinecraftMessage(`/gc ${user}'s stats: ${stats.replaceAll(";",",")}`)
        message.channel.send({
            embed: {
              description: `${user}'s stats: ${stats.replaceAll(";","\n")}`,
              color: '47F049'
            }
          })
        })
    }
  }

  module.exports = StatsCommand
