const Discord = require('discord.js')
const client = new Discord.Client()
const mysql = require('mysql')
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!')
  }
})

var conn = mysql.createConnection({
    host:"remotemysql.com",
    port:3306,
    user:"BvLpNL3FIp",
    password:"jgJQcFZTPS",
    database:"BvLpNL3FIp",
    
})

conn.connect(err =>{
    if (err) throw err
    console.log("Connected to database!")
})


client.on('message',msg=>{
  if (msg.content.startsWith('!synth')) {
    const arg = msg.content.split(' ')
    const args = arg.slice(1).join().replace(',',' ')
    // console.log(arg)
    // console.log(args)
    // msg.reply(args)
    conn.query(`SELECT * FROM Syntesis WHERE Name LIKE '${args}%'` ,(err,rows) => {
      if (err) throw err
        if (rows.length>0) {
        const embed = new Discord.RichEmbed()
          .setTitle('About item')
          .setDescription(rows[0].Name)
          .setThumbnail('https://img.xdcdn.net/ro/moniqi/item_40055.png')
          .setColor(0x00ae86)
          .addField('Quantity', rows[0].Desc )
          .addField('Material', rows[0].Material)
          .addField('Zeny', rows[0].Zeny)

          // console.log(rows)\
        msg.reply("Here it is")
        msg.channel.send({ embed });
      }
        else{
          msg.reply("error occured")
        }
      
    })
  }
})

client.on('message', message => {
  if (message.content.startsWith('!kick')) {
    const member = message.mentions.members.first()

    if (!member) {
      return message.reply(
        `Who are you trying to kick? You must mention a user.`
      )
    }

    if (!member.kickable) {
      return message.reply(`I can't kick this user. Sorry!`)
    }

    return member
      .kick()
      .then(() => message.reply(`${member.user.tag} was kicked.`))
      .catch(error => message.reply(`Sorry, an error occured.`))
  }
})

client.login('NjI1OTAzODMyNTAwNjY2Mzk4.XYmU9g.YrhhBUiSipxl9tdNsUmK4OkP-gE')

