const dc = require("discord.js");
let ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
  let davet = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;
  const yardım = new dc.MessageEmbed()
    .setAuthor(client.user.username, client.user.avatarURL())
    .setTitle("Premims Yardım Menüsü")
    .setURL("https://discord.gg/")
    .setThumbnail(client.user.avatarURL())
    .setDescription(`[Botu Ekle](https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) - [Destek Sunucusu](https://discord.gg/8wywb2YJaa)`)
    .addField("<a:kitapp:800633026866184232>  Premims", "`p!premims Yazarak Ulasabilirsin`")
    .addField("<a:altin1:800633066255024169>  Eğlence", "`p!eglence Yazarak Ulasabilirsin`")
    .addField("<a:discord:800633043458588713>  Moderasyon", "`p!moderasyon yazarak ulasabilirsin`")
    .addField("<a:altin4:800632956732964895> Sistemler", "`p!sistemler yazarak ulasabilirsin`")
    .setFooter(`Prefixim: ${prefix}`, client.user.avatarURL())
    .setImage()
    .setColor("RANDOM");
  message.channel.send(yardım);
};
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ["help"],
  permLevel: 0
};
exports.help = {
  name: "yardım"
};