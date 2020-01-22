
// Extract the required classes from the discord.js module
const { Client, RichEmbed, Attachment } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();

/**START**/
client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	var ping = require('ping');
	 
	var hosts = ['google.com', 'discordapp.com'];
	hosts.forEach(function(host){
		ping.sys.probe(host, function(isAlive){
			var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
			console.log(msg);
		});
	});
	client.user.setPresence({ game: { name: 'programmer bad' }, status: 'dnd' })
});

client.on('message', msg => {
	if (msg.content === 'ping') {
		msg.reply('pong');
	}else if(msg.content === 'what is my avatar') {
		// Send the user's avatar URL
		msg.reply(msg.author.avatarURL);
  }else if (msg.content === 'how to embed') {
		// We can create embeds using the MessageEmbed constructor
		// Read more about all that you can do with the constructor
		// over at https://discord.js.org/#/docs/main/stable/class/RichEmbed
	const embed = new RichEmbed()
		// Set the title of the field
		.setTitle('A slick little embed')
		// Set the color of the embed
		.setColor(0xFF0000)
		// Set the main content of the embed
		.setDescription('Hello, this is a slick embed!');
		// Send the embed to the same channel as the message
		msg.channel.send(embed);
	}else if (msg.content === 'same'){
		msg.channel.send('saaaaaaaaaame');
	}
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NjY5MjczMDA4OTY3NTE2MTcy.Xie9xQ.lLZo_z7Qi1J8gYOEvFjBWvsPnOQ');