const { Client, RichEmbed, Attachment } = require('discord.js');
const chalk = require('chalk');

// Create an instance of a Discord client.
const client = new Client();
var status = '';

/**START**/
console.clear();
client.on('ready', () => {
	//reports login
	console.log(`Logged in as ${client.user.tag}!`);
	console.log('Console START');
	var bootStart = Date.now();
	//makes sure you're connected
	var ping = require('ping');
	 
	var hosts = ['google.com', 'discordapp.com'];
	function pingFunction(){
		hosts.forEach(function(host){
			var pStart = Date.now();
			ping.sys.probe(host, function(isAlive){
				var pFinish = Date.now();
				var pReport = pFinish - pStart;
				var activePing = isAlive ? host + ' is alive... report: '+pReport+'ms': 'host ' + host + ' is dead';
				console.log(chalk.cyan('<STARTUP>')+' Ping Report');
				console.log(activePing);
				console.log('--------------------------------------------------');
			});
		});
		//sends a message to the log that in 30 minutes a ping test will occur this also works as a timer, that's called every time pingFunction is called
		setTimeout(function(){ console.log(chalk.green('Next Ping will occur in 30min.'));},1800000);
	}
	//calls the ping function
	pingFunction();
	var bootFinish = Date.now(); //makes another timestamp
	var bootTime = (bootFinish - bootStart); //subtracts the ms values of the two vars
	client.user.setPresence({ game: { name: 'now awake' }, status: 'away' }) //sets the default 'awake' status
	console.log('Start-up time was...' + bootTime + 'ms'); //reports the time it took to boot the bot in ms
	setInterval(pingFunction,3600000); //sets up a repeat call of the ping function, that happens every hour
});
client.login('NjY5MjczMDA4OTY3NTE2MTcy.Xie9xQ.lLZo_z7Qi1J8gYOEvFjBWvsPnOQ'); //the login info...
//somehow move the auth-code to a different file? and exclude it from the 'master' build that goes up to github?

client.on('message', msg => {
	var sameCooldown = false;
	if (msg.content === '!pog') { //simple call and responce.
		msg.reply("i don't have nitro :(");
	}else if(msg.content === '!avatar') { //sends the user's avatar back to them
		// Send the user's avatar URL
		msg.reply(msg.author.avatarURL);
	}else if (msg.content === '!info') { //sends a Embed of the bot's info.
		const embed = new RichEmbed()
		// Set the title of the field
		.setTitle('Who is Thronekeeper?')
		// Set the color of the embed
		.setColor(0x29a329)
		// Set the main content of the embed
		.setDescription('I am Thronekeeper. I am a moderation bot coded in JS, and with the goal of being able to accurately moderate, and control the workings of a server.\n This bot is in early development.\n Version: Beta-0.1');
		// Send the embed to the same channel as the message
		msg.channel.send(embed);
	}else /* if (msg.content === 'same' && sameCooldown == false){ /**need to make a cooldown thingy*
		//This is a meme --
		msg.channel.send('saaaaaaaaaame'); console.log('help');
		sameCooldown = true;
		setTimeout(function(){sameCooldown = false;},30000);
	}else */ if (msg.content.startsWith('!admin')){ //admin-only commands
		if (msg.author.id !== '181187505448681472'){ //verifies that Contrastellar#0001 is the only user to do this.
			msg.channel.send('You do not have sufficent perms. https://i.kym-cdn.com/entries/icons/mobile/000/028/925/Screen_Shot_2019-03-15_at_11.01.54_AM.jpg'); //clowns on a fool
			console.log('invalid status-change attempt from' + msg.author + ' ' + msg.author.username);
		} else{
			console.log(chalk.yellow('<REPORT> ')+ msg.createdAt + ' good admin call from ' + msg.author.username);
            var arg = msg.content.slice(7);
			//above removes the !admin call
			//The following 'if' checks the next argument
			if(arg.startsWith('playstatus')){
				arg = arg.slice(11);
				console.log(chalk.yellow('<REPORT> ')+ msg.createdAt + 'status change call ');
				if(arg.length == 0){
                    msg.reply('I need a new playing Status!');
                    return;
                }else{
                    client.user.setPresence({ game: { name: arg }});
                    console.log(chalk.red('<IMPORTANT> ')+ msg.createdAt + ' The status was changed to "' + arg + '"');
					console.log(chalk.yellow('<REPORT> ')+msg.createdAt + ' action performed by:' + msg.author.username);
                    msg.reply('status changed.');
                    return;
				}
			}else{
				msg.reply("I need a argument... \n USAGE - !admin <playstatus/onlinestatus/...>");
			}
		}
	}else if(msg.content === 'gamer'){
		//a fun little command with a 1/10th chance to respond to someone saying 'gamer'
		var gamerRandom = Math.floor(Math.random() * 11);
		console.log('rng was ' + gamerRandom);
		if(gamerRandom == 10){
			msg.reply("We don't say the hard R here...");
			console.log("'gamer' responce was called");
		}else{ //this conditional reports whether or not it happens. this is for debugging stuff
			console.log("'gamer' responce was not called (bad RNG)");
		}
    }else if(msg.content === 'This poor bot.'){
		//another fun thing, except it *should* also report RAM value... <- i dunno how to do it.
        msg.reply("I feel bad for Contra's RAM lol.");
    }
});