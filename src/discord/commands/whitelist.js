const Application = require('../../Application')
const DiscordCommand = require('../../contracts/DiscordCommand')
const Hypixel = require(`hypixel-api-reborn`); //npm package for hypixel api
const hypixel = new Hypixel.Client('8b07f7c4-690f-4cbe-8c36-a0af15e9bbf7'); // api key for hypixel
const { Utils } = require('hypixel-api-reborn');
const db = require(`../../../db`)
const moment = require(`moment`)
const keyv = require(`keyv`);
const ms = require('ms');
const pms = require(`pretty-ms`)

class WhitelistCommand extends DiscordCommand {
  constructor(discord) {
    super(discord)

    this.name = 'whitelist'
    this.aliases = ['w']
    this.description = 'Whitelist add/remove a user to the fragbot'
    this.requires = 'owner'
  }
  async onCommand(message) {
    if(message.author.id !== "216749228087705610"){
        return message.channel.send(`You are not permitted to manipulate any whitelisting`)
    }
    let whitelist = await db.get(`wl`) || [];
    let args = this.getArgs(message)
    let user = args[1]
    if(!args.length){
        return message.channel.send({
            embed: {
                title: "Fragbot Error!",
                description: "Invalid Arguments!"
            }
        })
    }

    let sub = args[0].toLowerCase()
    if(sub == "clear"){
        message.channel.send({
            embed: {
                title: `Weebchan Fragbot DB Cleared!`,
                description: `Cleared the entire fragbot whitelist database! Poof!`
            }
        })
        await db.delete(`wl`)
        return;
    }
    if(sub == "list"){
        let prompt1 = whitelist.map(c=> `:white_small_square: **${c.Username}** | ${c.Expires - Date.now() < 0 ? `Access Expired!` : `${pms(c.Expires - Date.now())} left`} | Added: ${moment.utc(c.DateAdded).format(`L`)}`).join(`\n`) || "No Users Whitelisted"
        return message.channel.send({
            embed: {
                title: "Fragbot Access List",
                description: `${prompt1}`
            }
        })
    }
    if(sub == "check"){
        let uuid = await hypixel.getPlayer(args[1]).then(player => player.uuid).catch()
        let nign = await Utils.toIGN(uuid);
        let check = whitelist.find(c=>c.UUID == uuid)
        let time = check.Expires - Date.now() 
        let times = pms(time, {verbose: true})

        if(time < 0){
            times = `Access Expired`
        }

        if(check)
        message.channel.send({
            embed: {
                title: `Viewing whitelist information for ${nign}`,
                description: `
                **UUID:** ${check.UUID}

                **Expires in:** ${times}
                **Date Added:** ${moment.utc(check.DateAdded).format(`L`)}
                `
            }
        })
    }

    if(!user){
        return message.channel.send({
            embed: {
                title: "Fragbot Error!",
                description: "Invalid User!"
            }
        })
    }
    if(sub == "add"){
        try {
            let uuid = await hypixel.getPlayer(args[1]).then(player => player.uuid).catch()
            let nign = await Utils.toIGN(uuid);
            let check = whitelist.find(c=>c.UUID == uuid)
            if(check){
                if(Date.now() < check.Expires){
                    return message.channel.send({
                        embed: {
                            title: "Already Whitelisted!",
                            description: `This user is already whitelisted for another **${pms(check.Expires - Date.now())}**
    
                            Add more time to their timer by doing !whitelist addtime ${nign} (time)`
    
                        }
                    })
                } else {
                    whitelist = whitelist.filter(c=>c.UUID !== uuid)
                }
            }
            let time = args[2]
            if(!time){
                return message.channel.send({
                    embed: {
                        title: "Invalid Time",
                        description: "Please specify how long you would like this player to be whitelisted for"

                    }
                })
            }
            if(isNaN(ms(time))){
                return message.channel.send({
                    embed: {
                        title: "Invalid Time Format",
                        description: "Please use a proper time format (either MS or otherwise)"
                    }
                })
            }
			let times = ms(ms(time), { long: true })
            whitelist.push({
                Username: nign,
                UUID: uuid,
                DateAdded: Date.now(),
                Expires: Date.now() + ms(args[2]),
            })
            message.channel.send({
                embed: {
                    title: "Whitelist Successs!",
                    description: `Successfully given ${nign} (${uuid}) whitelist access for ${times}`
                }
            })
            db.set(`wl`, whitelist)
        } catch (err){
            if(err == "Error: [hypixel-api-reborn] Player does not exist."){
                return message.channel.send({
                    embed: {
                        title: "Fragbot Error!",
                        description: "That player doesn't exist!",
                    }
                })
            } else {
                console.log(err.stack)
            }
        }
    }
    if(sub == "remove"){
        let uuid = await hypixel.getPlayer(args[1]).then(player => player.uuid).catch()
        let nign = await Utils.toIGN(uuid);
        if(whitelist){
            whitelist = whitelist.filter(c=>c.UUID !== uuid)
            db.set(`wl`, whitelist)
            message.channel.send({
                embed: {
                    title: "Weebchan FragBot",
                    description: `Successfully removed ${nign} has been removed from the whitelist!`
                }
            })
        }
    }


    }
}

module.exports = WhitelistCommand