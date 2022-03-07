const MinecraftCommand = require('../../contracts/MinecraftCommand')
const axios = require("axios");
function numberWithCommas(x) {
  try {
    x = x.toString().split(".")[0]
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  catch {
    return "API Off"
  }
}

async function getNetworthFromUsername(name) {
  let total
  let ret
  let armor
  let wardrobe
  let inventory
  let ec
  let storage
  let pets
  let acc
  let sack;
  let storageec
  let purse
  try {
    const { data } = await axios.get("https://api.altpapier.dev/v1/profiles/" + name + "?key=IPke2LEKG1ShqOlY8KIM7Uv8oA05p6Ek")
    try {
      total = data.data[0].networth.total_networth
    }
    catch {
      ret = "Error at total"
      return ret
    }
    try {
      try{
        purse = data.data[0].networth.purse
      }
      catch{
        purse = 0
      }
      try{
        armor = data.data[0].networth.types.armor.total
      }
      catch{
        armor = 0
      }
      try{
        wardrobe = data.data[0].networth.types.wardrobe_inventory.total
      }
      catch{
        wardrobe = 0
      }
      try{
        inventory = data.data[0].networth.types.inventory.total
      }
      catch{
        inventory = 0
      }
      try{
        ec = data.data[0].networth.types.enderchest.total
      }
      catch{
        ec = 0
      }
      try{
        storage = data.data[0].networth.types.storage.total
      }
      catch{
        storage = 0
      }
      try{
        pets = data.data[0].networth.types.pets.total
      }
      catch{
        pets = 0
      }
      try{
        acc = data.data[0].networth.types.talismans.total
      }
      catch{
        acc = 0
      }
      try{
        sack = data.data[0].networth.types.sacks.total
      }
      catch{
        sack = 0
      }
    
      try{
        pv = data.data[0].networth.types.personal_vault
      }
      catch{
        pv = 0
      }
    }
    catch {
      ret = "Error at items"
      return ret
    }
    storageec = ec + storage
    ret = "'s networth is: Total: $" + numberWithCommas(total) + ", Purse: $" + numberWithCommas(purse) + ", Armor: $" + numberWithCommas(armor) + ", Wardrobe: $" + numberWithCommas(wardrobe) + ", Inv: $" + numberWithCommas(inventory) + ", Storage: $" + numberWithCommas(storageec) + ", Pets: $" + numberWithCommas(pets) + ", Talis: $" + numberWithCommas(acc) + ", Sacks: $" + numberWithCommas(sack)
    return ret
  }
  catch (error) {
    e = error.message
    if(e.includes("status code 500")){
      return "is an Invalid Username"
    }
    if(e.includes("status code 404")){
      return "has no Skyblock Profiles"
    }
    else{
      return error
    }
  }
}
class NetworthCommand extends MinecraftCommand {
  constructor(minecraft) {
    super(minecraft)

    this.name = 'networth'
    this.aliases = ['nw']
    this.description = "Says users networth"
  }

  async onCommand(username, message) {
    let args = message.split(" ")
    if (message.endsWith("!nw")) {
      getNetworthFromUsername(username).then(nw => {
        this.send(`/gc ${username} ${nw}`)
      })
    }
    else {
      getNetworthFromUsername(args[1]).then(nw => {
        this.send(`/gc ${args[1]} ${nw}`)
      })
    }
  }
}

module.exports = NetworthCommand