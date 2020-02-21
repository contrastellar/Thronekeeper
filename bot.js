const {Client, RichEmbed, Attachment } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');
const functionList ;
console.clear();
console.log(chalk.red('Starting here'));
const token = fs.readFileSync('DiscordToken.txt', 'utf8');

// Create an instance of a Discord client.
const client = new Client();
var status = '';

/**START**/
client.on('ready', () => {
	//reports login
	console.log(chalk.green('Logged in')+ ` as `+chalk.blue(`${client.user.tag}!`));
	console.log('Console '+chalk.cyan('START'));
	var bootStart = Date.now();
	//makes sure you're connected
	var ping = require('ping');
	//the hosts to test the ping for. this can be any viable host, however for the baseline, I've just used Google + Discord
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
	client.user.setPresence({ game: { name: 'waking up...' }, status: 'online' }) //sets the default 'awake' status
	console.log('Start-up time was...' + bootTime + 'ms'); //reports the time it took to boot the bot in ms
	setInterval(pingFunction,3600000); //sets up a repeat call of the ping function, that happens every hour
});

client.login(token); //the login info...

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
		.setDescription(`I am Thronekeeper. I am a moderation bot coded in JS, and with the goal of being able to accurately moderate, and control the workings of a server.\n This bot is in early development.\n Version: Beta-1.1`);
		// Send the embed to the same channel as the message
		msg.channel.send(embed);
	}else if (msg.content.startsWith('!admin')){ //admin-only commands
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
				console.log(chalk.yellow('<REPORT> ')+'status change call ');
				if(arg.length == 0){
                    msg.reply('I need a new playing Status!');
                    return;
                }else{
                    client.user.setPresence({ game: { name: arg }});
                    console.log(chalk.red('<IMPORTANT> ') + 'The status was changed to "' + arg + '"');
					console.log(chalk.yellow('<REPORT> ')+msg.createdAt + ' action performed by:' + msg.author.username);
                    msg.reply('status changed.');
                    return;
				}
            }else if(arg.startsWith('onlinestatus')){
                arg = arg.slice(13);
                if(arg.length ==0){
                    msg.reply('I need an new online status! <online,dnd>');
                }else{
                    if(arg.toString() == "away"){
                        msg.reply("I do not support an 'away' status, please use online or dnd.")
                    
                    }else{
                        client.user.setPresence({ status: arg.toString() });
                        console.log(chalk.red('<IMPORTANT> ') + 'The online status was changed to "' + arg + '"');
                        msg.reply('online status changed.');
                    }
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
		}
    }else if(msg.content === 'This poor bot.'){
		//another fun thing, except it *should* also report RAM value... <- i dunno how to do it.
        msg.reply("I feel bad for Contra's RAM lol.");
		
    }else if(msg.content.startsWith('!UserPurge')){
        //This works to destroy a specific user's messages
        var purgeUser = msg.mentions.users.first();
        var purgeUserID = purgeUser.id;
        console.log(purgeUserID);
		var messageList = msg.channel.fetchMessages();
        msg.channel.fetchMessages().then(messages => {
            var count = messages.filter(m => m.author.id === purgeUserID).size;
			var purgeList = messages.filter(m => m.author.id === purgeUserID);
            console.log('Attempting purge of '+count+' message(s)');
            //This works on messages that are older than 14 days old
            //Discord API Limit on bulk API requests, however, this technically isn't bulk.
			messages.forEach(m => { //recursion!
				if(m.author.id == purgeUserID){
					m.delete();
					console.log('Message Deleted');
				}
			});
        }).catch(console.error()); //If it screws up, it'll throw an error to the bot's console
		msg.reply('check the console to assure objective completion.');
    }else if(msg.content.startsWith('!IDPurge')){
        //This works to destroy a specific user's messages, based on user ID
        var purgeID = msg.content.slice(9, 27);
        purgeID = purgeID.toString();
        console.log(purgeID);
		var aroundID = msg.content.slice(28, 46);
		aroundID = aroundID.toString();
		if(aroundID == ''){
			msg.reply('I need a message ID for deletion request.');
		}else{
			var messageIDList = msg.channel.fetchMessages();
			msg.channel.fetchMessages({ around: aroundID }).then(messages => {
				var count = messages.filter(m => m.author.id === purgeID).size;
				var purgeList = messages.filter(m => m.author.id === purgeID);
				console.log('Attempting purge of '+count+' message(s)');
				//This works on messages that are older than 14 days old... Discord API Limit on bulk API requests, however, this technically isn't bulk.
				messages.forEach(m => { //recursion!
					if(m.author.id.toString() == purgeID){
						m.delete();
						console.log('Message Deleted');
					}
				});
			}).catch(console.error());
		}
    }else if(msg.content.startsWith('~MSGCount')){
		var msgCount = msg.content.slice(10);
		if(msgCount.length == 0){
			msg.reply(' I need a <USERID> to parse...');
			
		}else{
			msg.reply('im workin on it...');
		}
	}else if(msg.author.id == 154380183644798976){
		var calloutChange = Math.floor(Math.random() * 8);
		if(msg.channel.nsfw == true){
			if(calloutChange == 10){
				msg.channel.send('stop being horny!');
			}
		}
	}else if(msg.content.startsWith('!horny')){
        msg.channel.send("NO HORNY ALLOWED >:(");
    }else if(msg.content.startsWith('!announce')){
        var announceBody = msg.content.slice(10);
        msg.channel.send(announceBody + "... Thronekeeper has spoken...");
    }
});