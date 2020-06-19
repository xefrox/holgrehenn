//DISCORD

const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const mysql = require("mysql");
const fs = require("fs");
const stringSimilarity = require('string-similarity');
const http = require("http");
const express = require("express");
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "Ping Received");
  response.sendStatus(200);
});
app.listen(3000);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);


client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

var conn = mysql.createConnection({
  host:"remotemysql.com",
  port:3306,
  user:"BvLpNL3FIp",
  password:"jgJQcFZTPS",
  database:"BvLpNL3FIp",
});

conn.connect(err => {
  if (err) throw err;
  console.log("Connected to database!");
});

//testing detect embed pokecord
// channel OCHANOKO #command  = 545944796695363605
// channel OCHANOKO #Pokemon  = 590587483826159626
// channel Xefrox #bot-command= 627055699876380673

client.on("message",msg=> {
  if(msg.embeds[0]!=null && msg.channel.id == 590587483826159626){
      const emb = msg.embeds[0].image.url.slice(20,-4)
      var myRe = /^(?:Base stats for |Level \d+ )([^"]*?)(?: #\d+\.|$| - ID: \d+)/;
      var pokeName = myRe.exec(msg.embeds[0].title);
      console.log(msg.embeds[0]);
      conn.query(`INSERT INTO Pokemon(imgName,pokemonName) VALUES ('${emb}','${pokeName[1]}')`,(err)=>
                {
        if (err){
          
        }
        else{
          msg.channel.send(pokeName[1]+" berhasil di update")
        }
      })
      // msg.channel.send(emb)
      // console.log(msg.embeds[0].image.url)
    
  }
})

// client.on('message',mssg=>{
//   if(
//     mssg.content.startsWith("nile") 
//   ){
//     mssg.channel.send("proses perbandingan nile's bracelet dgn "+mssg);
//     var similarity = stringSimilarity.compareTwoStrings("nile's bracelet", mssg.content); 
//     mssg.channel.send(similarity);
//   }
// });

client.on('message', msg => {
  if (msg.content.startsWith("!update") && msg.channel.id == 590587483826159626) {
      conn.query(`SELECT COUNT(*) as namesCount FROM Pokemon`,(err,rows)=>
                {
          console.log(msg.channel.id)
          msg.channel.send(rows[0].namesCount+" Pokemon berada di dalam database , Tersisa " + (827-rows[0].namesCount)+" Pokemon lagi\n Perjalanan masih panjang,,,")
        }
      )
      
  }
});

client.on("message", msg => {
  if (
    msg.content.startsWith("!synth") && msg.channel.id == 545944796695363605
  ) {
    const arg = msg.content.split(" ");
    const args = arg
      .slice(1)
      .join()
      .replace(",", " ")
      .toLowerCase();
    if (!args) {
      msg.channel.send("List Weapon Synthesis `!synth weapon` \nList Armor Synthesis `!synth armor` \nList Accesorry Synthesis `!synth acc`\nList Offhand Synthesis `!synth offhand`")
      // msg.channel.send("mogok kerja,sudah tidak berguna")
    }
    else if(args == "weapon"){
      const embed = new Discord.RichEmbed()
        .setTitle("List Pre-synthesis Weapon")
        .setDescription("Berikut Listnya , How to use = `!synth <nama awal item>`\n Contohnya = `!synth Survivor's`")
        .setColor(0x00ae86)
        .addField("Spear", "• Halberd\n• Bill Guisarme\n• Green Steel Pike\n• Lance of Dragon Tamer\n• Spearfish Pike")
        .addField("Sword", "• Flamberge\n• Holy Avenger\n• Nagan")
        .addField("Axe", "• Blood Axe\n• Doom Axe\n• Double-Edged Axe\n• Heart Breaker\n• Vecer Axe")
        .addField("Dagger", "• Halberd\n• Holy Dagger\n• Sandstorm")
        .addField("Katar", "• Agent Katar\n• Loki's Nail")
        .addField("Whip", "• Meteor Whip")
        .addField("Bow", "• Cursed Lyre\n• Luna Bow\n• Malang Crab Bow\n• Mystery Bow\n• Roguemaster's Bow")
        .addField("Instrument", "• Lute")
        .addField("Book", "• Sage Diary")
        .addField("Staff", "• Croce Staff\n• Forest Staff\n• Nemesis\n• Staff of Elemental\n• Survivor's Rod\n• Wizardry Staff")
        .addField("Mace", "• Elder's Hammer\n• Mace of Judgment\n• Slash")
        .addField("Knuckle", "• Finger\n• Giant Gloves\n• Sura Rampage")
      msg.channel.send({ embed });
    } 
    else if(args == "armor"){
      const embed = new Discord.RichEmbed()
        .setTitle("List Pre-synthesis Armor")
        .setDescription("Berikut Listnya , How to use = `!synth <nama awal item>`\n Contohnya = `!synth Saint's`")
        .setColor(0x00ae86)
        .addField("Armor", "• Alloy Armor\n• Iron Armor\n• Beast Heart\n• Bohemian Coat\n• Elaborate Costume\n• Elegant Uniform\n• Glittering Jacket\n• Goibne Armor (Goibne's Armor)\n• Holy Robe\n• Legion Plate Armor\n• Meteorite Armor\n• Ninja Suit Moonlight\n• RobeCast (Robe of Cast)\n• RobeJudgment (Robe of Judgement)\n• Saint's Cape\n• Sniping Suit\n• Stardust Robe\n• Staunch Armor\n• Staunch Clothes \n• Surging Magic Robe\n• Thief Clothes")
      msg.channel.send({ embed });
    }
    else if(args == "offhand"){
      const embed = new Discord.RichEmbed()
        .setTitle("List Pre-synthesis Offhand")
        .setDescription("Berikut Listnya , How to use = `!synth <nama awal item/ atau 2 suku kata>`\n Contohnya = `!synth Life Magic`")
        .setColor(0x00ae86)
        .addField("Offhand", "• Nile's Bracelet\n • Life Magic Book\n • Chemical Protection Gloves\n• Evil Bracer\n• Exorcism Bible\n• Mirror Shield\n• Noble Bracer\n• Orleans's Server\n• Rosa Bracelet\n• Sacred Mission\n• Sacrifice Book\n• Shield of Naga\n• Static Shield\n• Statue of Mother Mary\n• Stone Buckler\n• Telekinetic Orb\n• Vinkt's Bracelet\n")
      msg.channel.send({ embed });
    }
    else if(args == "acc"){
      const embed = new Discord.RichEmbed()
        .setTitle("List Pre-synthesis Accessorry")
        .setDescription("Berikut Listnya , How to use = `!synth <nama awal item/ atau 2 suku kata>`\n Contohnya = `!synth AGI Pin`")
        .setColor(0x00ae86)
        .addField("Accessory", "• Eye of Dullahan\n• AGI Pin\n• Black Cat Brooch\n• Critical Ring\n• Dogtooth Gloves\n• Endurance Neklace \n• Fairy In Bottle\n• Fresh Tuna Talisman\n• LUK Neklace \n• Luna Brooch\n• Matyr's Least\n• Orleans Neklace\n• Orleans Gloves\n• Pocket Watch\n• Powerful Ring\n• Staunch Ring\n• Talisman Grass Neklace")
      msg.channel.send({ embed });
    }
    else if(args.startsWith("%") || args.startsWith("'")|| args.startsWith("`")|| args.startsWith("!")|| args.startsWith("@")|| args.startsWith("#")|| args.startsWith("^")|| args.startsWith("&")|| args.startsWith("*")|| args.startsWith("(")|| args.startsWith(")")|| args.startsWith("-")|| args.startsWith("_")|| args.startsWith("=")|| args.startsWith("+")){
      msg.channel.send("Jangan suka cari bug dong!")
    }
    else if(args.endsWith("'s")){
      var str = args.slice(0,-2);
      conn.query(
        `SELECT * FROM Synthesis WHERE Name LIKE '${str}%'`,
        (err, rows) => {
          if (err) throw err;
          if (rows.length > 0) {
            const embed = new Discord.RichEmbed()
              .setTitle("About item")
              .setDescription(rows[0].SynthName)
              .setThumbnail(rows[0].imgUrl)
              .setColor(0x00ae86)
              .addField("Description", rows[0].Desc)
              .addField("Material", rows[0].Material)
              .addField("Zeny", rows[0].Zeny);
            msg.reply("Nah gitu dong, nah Bahan Synthesis, dibaca!")
            // msg.channel.send("mogok kerja,sudah tidak berguna")
            msg.channel.send({ embed })
          } else {
              conn.query(
                `SELECT * FROM Armor WHERE Name LIKE '${str}%'`,
                (err, rows) => {
                  if (err) throw err;
                  if (rows.length > 0) {
                    const embed = new Discord.RichEmbed()
                      .setTitle("About item")
                      .setDescription(rows[0].SynthName)
                      .setThumbnail(rows[0].imgUrl)
                      .setColor(0x00ae86)
                      .addField("Description", rows[0].Desc)
                      .addField("Material", rows[0].Material)
                      .addField("Zeny", rows[0].Zeny);
                    msg.reply("Nah gitu dong, nah Bahan Synthesis Armor, dibaca!")
                    // msg.channel.send("mogok kerja,sudah tidak berguna")
                    msg.channel.send({ embed })
                  } else {
                    conn.query(
                      `SELECT * FROM Accessory WHERE Name LIKE '${str}%'`,
                      (err, rows) => {
                        if (err) throw err;
                        if (rows.length > 0) {
                          const embed = new Discord.RichEmbed()
                            .setTitle("About item")
                            .setDescription(rows[0].SynthName)
                            .setThumbnail(rows[0].imgUrl)
                            .setColor(0x00ae86)
                            .addField("Description", rows[0].Desc)
                            .addField("Material", rows[0].Material)
                            .addField("Zeny", rows[0].Zeny);
                          msg.reply("Nah gitu dong, nah Bahan Synthesis Acc, dibaca!")
                          // msg.channel.send("mogok kerja,sudah tidak berguna")
                          msg.channel.send({ embed })
                        } else {
                          conn.query(
                            `SELECT * FROM Offhand WHERE Name LIKE '${str}%'`,
                            (err, rows) => {
                              if (err) throw err;
                              if (rows.length > 0) {
                                const embed = new Discord.RichEmbed()
                                  .setTitle("About item")
                                  .setDescription(rows[0].SynthName)
                                  .setThumbnail(rows[0].imgUrl)
                                  .setColor(0x00ae86)
                                  .addField("Description", rows[0].Desc)
                                  .addField("Material", rows[0].Material)
                                  .addField("Zeny", rows[0].Zeny);
                                msg.reply("Nah gitu dong, nah Bahan Synthesis Offhand, dibaca!")
                                // msg.channel.send("mogok kerja,sudah tidak berguna")
                                msg.channel.send({ embed })
                              } else {
                                msg.channel.send(
                                  "Item Not Found, Please enter the right specific spelling"
                                )
                                // msg.channel.send("mogok kerja,sudah tidak berguna")
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
        
      // if(n==0){msg.channel.send("jangan bandel asik pake 's!")
      //         n = n + 1}
      // else if(n==1){msg.channel.send("uda di blg masih aja bandel!")
      //         n = n + 1}
      // else if(n==2){msg.channel.send("kok masi bandel!")
      //         n = n + 1}
      // else if(n==3){msg.channel.send("astaga minta di jewer ya!")
      //         n = n + 1}
      // else {
      //   msg.channel.send("Telor memang!")
      //         n = 0;
      // } 
    }
    // console.log(arg)
    // console.log(args)
    // msg.reply(args)
    else {
      conn.query(
        `SELECT * FROM Synthesis WHERE Name LIKE '${args}%'`,
        (err, rows) => {
          if (err) throw err;
          if (rows.length > 0) {
            const embed = new Discord.RichEmbed()
              .setTitle("About item")
              .setDescription(rows[0].SynthName)
              .setThumbnail(rows[0].imgUrl)
              .setColor(0x00ae86)
              .addField("Description", rows[0].Desc)
              .addField("Material", rows[0].Material)
              .addField("Zeny", rows[0].Zeny);
            msg.reply("Nah gitu dong, nah Bahan Synthesis, dibaca!")
            // msg.channel.send("mogok kerja,sudah tidak berguna")
            msg.channel.send({ embed })
          } else {
              conn.query(
                `SELECT * FROM Accessory WHERE Name LIKE '${args}%'`,
                (err, rows) => {
                  if (err) throw err;
                  if (rows.length > 0) {
                    const embed = new Discord.RichEmbed()
                      .setTitle("About item")
                      .setDescription(rows[0].SynthName)
                      .setThumbnail(rows[0].imgUrl)
                      .setColor(0x00ae86)
                      .addField("Description", rows[0].Desc)
                      .addField("Material", rows[0].Material)
                      .addField("Zeny", rows[0].Zeny);
                    msg.reply("Nah gitu dong, nah Bahan Synthesis Acc, dibaca!")
                    // msg.channel.send("mogok kerja,sudah tidak berguna")
                    msg.channel.send({ embed })
                  } else {
                    conn.query(
                      `SELECT * FROM Armor WHERE Name LIKE '${args}%'`,
                      (err, rows) => {
                        if (err) throw err;
                        if (rows.length > 0) {
                          const embed = new Discord.RichEmbed()
                            .setTitle("About item")
                            .setDescription(rows[0].SynthName)
                            .setThumbnail(rows[0].imgUrl)
                            .setColor(0x00ae86)
                            .addField("Description", rows[0].Desc)
                            .addField("Material", rows[0].Material)
                            .addField("Zeny", rows[0].Zeny);
                          msg.reply("Nah gitu dong, nah Bahan Synthesis Armor, dibaca!")
                          // msg.channel.send("mogok kerja,sudah tidak berguna")
                          msg.channel.send({ embed })
                        } else {
                          conn.query(
                            `SELECT * FROM Offhand WHERE Name LIKE '${args}%'`,
                            (err, rows) => {
                              if (err) throw err;
                              if (rows.length > 0) {
                                const embed = new Discord.RichEmbed()
                                  .setTitle("About item")
                                  .setDescription(rows[0].SynthName)
                                  .setThumbnail(rows[0].imgUrl)
                                  .setColor(0x00ae86)
                                  .addField("Description", rows[0].Desc)
                                  .addField("Material", rows[0].Material)
                                  .addField("Zeny", rows[0].Zeny);
                                msg.reply("Nah gitu dong, nah Bahan Synthesis Offhand, dibaca!")
                                // msg.channel.send("mogok kerja,sudah tidak berguna")
                                msg.channel.send({ embed })
                              } else {
                                msg.channel.send(
                                  "Item Not Found, Please enter the right specific spelling"
                                )
                                // msg.channel.send("mogok kerja,sudah tidak berguna")
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            } 
          }
        );
      }
    }
  });


client.on("message", msg => {
  if (
    msg.content.startsWith("!upgrade") && msg.channel.id == 545944796695363605) {
    const arg = msg.content.split(" ");
    const args = arg
      .slice(1)
      .join()
      .replace(",", " ")
      .toLowerCase();
    if (!args) {
      console.log(msg.channel.id)
      // msg.channel.send("Cara Pakai : `!upgrade <Nama Equipment>`")
      msg.channel.send("Mogok kerja,sudah tidak berguna\nSilahkan Gunakan command `$db <Nama Item>`")
    }
    else if(args=="telor"){
      msg.channel.send("telor ga bisa di upgrade nak")
    }
    else if(args=="ketampanan" || args=="tampan" || args=="cantik" || args=="kecantikan"){
      msg.channel.send("makanya jangan upgrade eq ajaa. upgrade tampilan donggg , by Stefi,2019")
    }
    else if(args=="kehokian"||args=="hoki" ){
      msg.channel.send("dikira gampang upgrade kehokian, mandi 7 kembang dlu sana")
    }
    // console.log(arg)
    // console.log(args)
    // msg.reply(args)
    else {
      conn.query(
        `SELECT * FROM Upgrades WHERE Name LIKE '${args}%'`,
        (err, rows) => {
          if (err) throw err;
          if (rows.length > 0) {
            const embed = new Discord.RichEmbed()
              .setTitle("About item")
              .setDescription(rows[0].Name)
              .setColor(0x00ae86)
              .addField("Description", rows[0].Description)
              .setImage(rows[0].imgUrl)
              .addField("Material", rows[0].Tier,true)
              .addField("Material 2", rows[0].Tier2,true)
              .addField("Dropped By", rows[0].Dropped)
              .setFooter(rows[0].Name, rows[0].imgUrl);
            // msg.reply("Nah gitu dong!")
            msg.channel.send("Mogok kerja,sudah tidak berguna\nSilahkan Gunakan command `$db <Nama Item>`")
            // msg.channel.send({ embed })
          } else {
            // msg.channel.send(
            //   "Error occured / Item not found / Please provide EP.5 Equipment\nIngat,hanya Equipment EP 5, sisanya pakai $db <nama equipment> jika command ini tidak berhasil\n tambahan database akses https://bit.ly/35El3hX "
            // )
            msg.channel.send("Mogok kerja,sudah tidak berguna\nSilahkan Gunakan command `$db <Nama Item>`")
          }
        }
      );
    }
  }
});

client.login("NjI1OTAzODMyNTAwNjY2Mzk4.XuwrVQ.HyXPdqDETgHJPI9FmyQr8mpy7S8");
