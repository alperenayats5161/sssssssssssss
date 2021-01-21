const discord = require("discord.js");
const fs = require("fs");
const http = require("http");
const db = require("quick.db");
const moment = require("moment");
const express = require("express");
const ayarlar = require("./ayarlar.json");
const app = express();
app.get("/", (request, response) => {
  console.log(`7/24 Hizmet Vermekteyim!`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

//READY.JS

const Discord = require("discord.js");
const client = new Discord.Client();
client.on("ready", async () => {
  client.appInfo = await client.fetchApplication();
  setInterval(async () => {
    client.appInfo = await client.fetchApplication();
  }, 600);

  client.user.setActivity(`Rolly Hazır Altyapı`, { type: "PLAYING" });

  console.log("Rolly Code #AFFETMEZ!!");
});

const log = message => {
  console.log(` ${message}`);
};
require("./util/eventLoader.js")(client);

//READY.JS SON

//KOMUT ALGILAYICI

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

//KOMUT ALGILAYICI SON

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};




////////////hg mesaj 

let randomgif = [ "https://i.makeagif.com/media/5-03-2019/VMiwHX.gif  ", "https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif ", "https://24.media.tumblr.com/tumblr_mccq3mdHnD1rn6iyqo1_500.gif ", "https://media2.giphy.com/media/xFBnkMvpTM6m4/giphy.gif ", "https://media0.giphy.com/media/xT1Ra5VqCwngifUBck/giphy.gif "];
   client.on("guildMemberAdd", member => { 
    
  let kayıtçı = db.fetch(`kayıtcırol_${member.guild.id}`);
  let kanal = db.fetch(`hgbbkanal_${member.guild.id}`)
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();  
  const embed = new Discord.MessageEmbed()
  var kontrol;
if (kurulus < 1296000000) kontrol = '<a:Alperen1:798144640540606535> Bu Hesap Güvenilir Değil '
if (kurulus > 1296000000) kontrol = '<a:Alperen09:798144618763124796>  Bu Hesap Güvenilir Gözüküyor '
  moment.locale("tr");
  let murat = client.channels.cache.get(kanal);
murat.send(new Discord.MessageEmbed()
    .setColor("RANDOM")
    .setImage(randomgif[Math.floor(Math.random() * randomgif.length)])       
.setDescription(` **Rondy Sunucu Kayıt Sistemi** 

<a:Alperen3:798144586773037086>  Hoşgeldin! ${member} Seninle Birlikte ${member.guild.memberCount} Kişiyiz. 

<a:Alperen43:798144585653026836>  Sunucuya Hoşgeldin Tag Almak İstermisin . 

<a:Alperen44:798144585636773929>  <@&${kayıtçı}> seninle ilgilenicektir. 

<a:EnesAcar50:798144626216796170> Hesabın Oluşturulma Tarihi:** ${moment(member.user.createdAt).format(" **YYYY DD MMMM dddd (hh:mm:ss)  ")} 

 ${kontrol} 

<a:Alperen85:798144679392444426> Register Odasına İsim Yaş Yazarak Kayıt Olabilirsin.   `))
     
     
  
  });




client.on("guildMemberAdd", async member => {
  let kanal1 = await db.fetch(`otorolkanal_${member.guild.id}`);
  let rol1 = await db.fetch(`otorolrol_${member.guild.id}`);

  let kanal = member.guild.channels.cache.get(kanal1);
  let rol = member.guild.roles.cache.get(rol1);

  if (!kanal) return;
  if (!rol) return;

  const embed = new Discord.MessageEmbed()

    .setColor("BLACK")
    .setDescription(
      `<a:acik:800632962613116948> Gelen Üye **${member}** Adlı Kullanıcıya Başarıyla \`${rol.name}\` Rolü Verildi.`
    );

  kanal.send(embed);
  member.roles.add(rol);
});



client.login(process.env.TOKEN);

