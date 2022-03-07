const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
let rank
function numberWithCommas(x) {
    x = x.toString().split(".")[0]
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
}
async function getStatsFromUsername(name) {
    const { data } = await axios.get('https://api.altpapier.dev/v1/profiles/' + name + '?key=IPke2LEKG1ShqOlY8KIM7Uv8oA05p6Ek')
    let nw = data.data[0].networth.total_networth
    let farming = data.data[0].skills.farming.level
    let mining = data.data[0].skills.mining.level
    let combat = data.data[0].skills.combat.level
    let foraging = data.data[0].skills.foraging.level
    let fishing = data.data[0].skills.fishing.level
    let enchant = data.data[0].skills.enchanting.level
    let alch = data.data[0].skills.alchemy.level
    let taming = data.data[0].skills.taming.level
    let sa = round((farming + mining + combat + foraging + fishing + enchant + alch + taming) / 8, 1)
    if (sa > 42 && nw > 1300000000) {
        rank = "champ"
        return rank
    }
    else if (sa > 35 && nw > 500000000) {
        rank = "vet"
        return rank
    }
    else if (sa > 32 && nw > 250000000) {
        rank = "adv"
        return rank
    }
    else {
        rank = "ini"
        return rank
    }
}

class ClaimCommand extends MinecraftCommand {
    constructor(minecraft) {
        super(minecraft)

        this.name = 'claim'
        this.description = "Claims ranks"
    }
    async onCommand(username, message) {
        getStatsFromUsername(username).then(rank => {
            if (rank == "champ") {
                this.send(`/g setrank ${username} Champion`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Champion! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            if (rank == "vet") {
                this.send(`/g setrank ${username} Veteran`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s Your rank has been set to Veteran! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            if (rank == "adv") {
                this.send(`/g setrank ${username} Adventurer`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Adventurer! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
            if (rank == "ini") {
                this.send(`/g setrank ${username} Initiate`)
                setTimeout(() => {
                    this.send(`/gc ${username}'s rank has been set to Initiate! If this is wrong, make sure you're on your main profile, and APIs are on!`)
                }, 1000);
            }
        })
    }
}
module.exports = ClaimCommand