console.clear();
// Extract the required classes from the discord.js module
const { Client, RichEmbed, Attachment } = require('discord.js');

// Create an instance of a Discord client
const client = new Client();
var status = '';

/**START**/
client.on('ready', () => {
	//reports login
	console.log(`Logged in as ${client.user.tag}!`);
	//makes sure you're connected
	var ping = require('ping');
	 
	var hosts = ['google.com', 'discordapp.com'];
	hosts.forEach(function(host){
		ping.sys.probe(host, function(isAlive){
			var activePing = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
			console.log(activePing);
		});
	});
	client.user.setPresence({ game: { name: 'with a Sword' }, status: 'online' })
});

client.on('message', msg => {
	if (msg.content === '!ping') {
		msg.reply('pong');
	}else if(msg.content === '!avatar') {
		// Send the user's avatar URL
		msg.reply(msg.author.avatarURL);
  }else if (msg.content === '!embed') {
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
	}else if (msg.content.startsWith('!status')){
		//verifies that Contrastellar#0001 is the only user to do this.
		if (msg.author.id !== '181187505448681472'){
			msg.channel.send('You do not have sufficent perms. https://i.kym-cdn.com/entries/icons/mobile/000/028/925/Screen_Shot_2019-03-15_at_11.01.54_AM.jpg');
			console.log('invalid status-change attempt from' + msg.author);
		} else{
		var arg = msg.content.slice(8);
			if(arg.length == 0){
				msg.reply('I need a new Status!');
				return;
			}else{
				client.user.setPresence({ game: { name: arg }, status: 'online' })
				console.log(msg.createdAt + ' The status was changed to "' + arg + '"');
				msg.reply('status changed.');
				return;
			}
		}
	}
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NjY5MjczMDA4OTY3NTE2MTcy.Xie9xQ.lLZo_z7Qi1J8gYOEvFjBWvsPnOQ');