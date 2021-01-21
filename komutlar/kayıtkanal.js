const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

    
if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed()
  .setTitle(`**Bu Komutu Sadece Yöneticiler Kullanabilir!**`)
  .setColor('#fa0606')
  .setThumbnail(message.author.avatarURL()));

if(args[0] === "sıfırla") {
const sıfırlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setColor('BLACK')
.setDescription(`Hoş Geldin Kanal Başarıyla Sıfırlandı ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(sıfırlandı)
db.delete(`hgbbkanal_${message.guild.id}`)
return;
}

let kanal = message.mentions.channels.first();   
if (!kanal) {
  const ayarlanmadı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setColor('BLACK')
.setDescription(` Hoş Geldin  Kanalı Belirtiniz !  `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(ayarlanmadı)
}
if (!message.guild) return;
db.set(`hgbbkanal_${message.guild.id}`, kanal.id)
const ayarlandı = new discord.MessageEmbed()
.setAuthor(client.user.username, client.user.avatarURL())  
.setColor('BLACK')
.setDescription(` Hoş Geldin Kanalı ${kanal} Olarak Ayarlandı ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(ayarlandı)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-hg',
  description: 'Kayıt Olunacak Kanalı Ayarlar',
  usage: 'dr!kayıt-kanal #kanal'
}