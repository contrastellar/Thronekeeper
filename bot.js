const {Client, RichEmbed, Attachment } = require('discord.js');
const fs = require('fs');
const chalk = require('chalk');console.clear();
console.log(chalk.red('Starting here'));
const token = fs.readFileSync('DiscordToken.txt', 'utf8');

// Create an instance of a Discord client.
const client = new Client();

/**START**/
client.on('ready', () => {
	//reports login
	console.log(chalk.green('Logged in')+ ` as `+chalk.blue(`${client.user.tag}!`));
	console.log('Console '+chalk.cyan('START'));
	const bootStart = Date.now();
	//makes sure you're connected
	const ping = require('ping');
	//the hosts to test the ping for. this can be any viable host, however for the baseline, I've just used Google + Discord
	const hosts = ['google.com', 'discordapp.com'];

	function pingFunction(){
		hosts.forEach(function(host){
			const pStart = Date.now();
			ping.sys.probe(host, function(isAlive){
				const pFinish = Date.now();
				const pReport = pFinish - pStart;
				const activePing = isAlive ? host + ' is alive... report: ' + pReport + 'ms' : 'host ' + host + ' is dead';
				console.log(chalk.cyan('<STARTUP>')+' Ping Report');
				console.log(activePing);
				console.log('--------------------------------------------------');
			});
		});
		//sends a message to the log that in 30 minutes a ping test will occur this also works as a timer, that's called every time pingFunction is called
		//setTimeout(function(){ console.log(chalk.green('Next Ping will occur in 30min.'));},1800000);
	}
	//calls the ping function
	pingFunction();
	var bootFinish = Date.now(); //makes another timestamp
	var bootTime = (bootFinish - bootStart); //subtracts the ms values of the two vars
	client.user.setPresence({game: {name: 'waking up...'}, status: 'online'}).then(r =>console.log(chalk.green("Presence Established"))) // sets the default 'awake' status
	console.log('Start-up time was...' + bootTime + 'ms'); //reports the time it took to boot the bot in ms
	//setInterval(pingFunction,3600000); //sets up a repeat call of the ping function, that happens every hour
});

client.login(token); //the login info...

client.on('message', msg => {
	function outstandingGirls(person){
		if(person == "gabby"){
			msg.channel.send("OUTSTANDING GIRL");
		}else if(person == "catherine"){
			msg.channel.send("OUTSTANDING GIRL");
		}else if(person == "aevery"){
			msg.channel.send("OUTSTANDING GIRL");
		}else if(person == "ember"){
			msg.channel.send("https://cdn.discordapp.com/attachments/572675846679166977/702064325019303946/dont_worry_about_it.png");
		}
	}
	var sameCooldown = false;
	if (msg.content === '!pog') { //simple call and responce.
		msg.reply("i don't have nitro :(");
	}else if(msg.content === '!avatar') { //sends the user's avatar back to them
		// Send the user's avatar URL
		msg.reply(msg.author.avatarURL);
	}else if (msg.content === '!TKinfo') { //sends a Embed of the bot's info.
		const embed = new RichEmbed()
		// Set the title of the field
		.setTitle('Who is Thronekeeper?')
		// Set the color of the embed
		.setColor(0x29a329)
		// Set the main content of the embed
		.setDescription(`I am Thronekeeper. I am a moderation bot coded in JS, and with the goal of being able to accurately moderate, and control the workings of a server.\n 
		This bot is in early development.\n
		Primary feature is supposed to be bulk user deletion. \n
		Version: Beta-1.3`);
		// Send the embed to the same channel as the message
		msg.channel.send(embed);

	}else if (msg.content.startsWith('!admin')){ //admin-only commands

		if (msg.author.id !== '181187505448681472'){ //verifies that Contrastellar#0001 is the only user to do this.
			msg.channel.send('You do not have sufficent perms. https://i.kym-cdn.com/entries/icons/mobile/000/028/925/Screen_Shot_2019-03-15_at_11.01.54_AM.jpg'); //clowns on a fool

		} else {
			console.log(chalk.yellow('<REPORT> ')+ msg.createdAt + ' good admin call from ' + msg.author.username);
			let arg = msg.content.slice(7);
			//above removes the !admin call
			//The following 'if' checks the next argument
			if(arg.startsWith('playstatus')){
				arg = arg.slice(11);
				console.log(chalk.yellow('<REPORT> ')+'status change call ');
				if(arg.length == 0){
                    msg.reply('I need a new playing Status!');
                }else{
                    client.user.setPresence({ game: { name: arg }});
                    console.log(chalk.red('<IMPORTANT> ') + 'The status was changed to "' + arg + '"');
					console.log(chalk.yellow('<REPORT> ')+msg.createdAt + ' action performed by:' + msg.author.username);
                    msg.reply('status changed.').then();

				}
            }else if(arg.startsWith('onlinestatus')){
                arg = arg.slice(13);
                if(arg.length == 0){
                    msg.reply('I need an new online status! <online,dnd>');
                }else{
                    if(arg.toString() === "away"){
                        msg.reply("I do not support an 'away' status, please use online or dnd.").then()
                    
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
	}else if(msg.content.includes('gamer')){
		//a fun little command with a 1/10th chance to respond to someone saying 'gamer'
		var gamerRandom = Math.floor(Math.random() * 11);
		console.log('rng was ' + gamerRandom);
		if(gamerRandom == 5){
			msg.reply("We don't say the hard R here...");
		}
    }else if(msg.content.includes("this poor bot")){
		//another fun thing, except it *should* also report RAM value... //TODO Add RAM report.
        msg.reply("I feel bad for Contra's RAM lol.");
		
    }else if(msg.content.startsWith('!UserPurge')){
        //This works to destroy a specific user's messages
		//TODO fix TypeError from not tagging a user...
        var purgeUser = msg.mentions.users.first();
        var purgeUserID = purgeUser.id;
        console.log(purgeUserID);
		var messageList = msg.channel.fetchMessages();
        msg.channel.fetchMessages().then(messages => {
			let count = messages.filter(m => m.author.id === purgeUserID).size;
			let purgeList = messages.filter(m => m.author.id === purgeUserID);
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
		let purgeID = msg.content.slice(9, 27);
		purgeID = purgeID.toString();
        console.log(purgeID);
		let aroundID = msg.content.slice(28, 46);
		aroundID = aroundID.toString();
		if(aroundID == ''){
			msg.reply('I need a message ID for deletion request.');
		}else{
			let messageIDList = msg.channel.fetchMessages();
			msg.channel.fetchMessages({ around: aroundID }).then(messages => {
				let count = messages.filter(m => m.author.id === purgeID).size;
				let purgeList = messages.filter(m => m.author.id === purgeID);
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
	}else if(msg.content.startsWith('!horny')){
		
        msg.channel.send("NO HORNY ALLOWED >:(");
		
    }else if(msg.content.startsWith('!announce')){
		
        var announceBody = msg.content.slice(10);
        msg.channel.send(announceBody + "... Thronekeeper has spoken...");
		
    }else if(msg.content.startsWith('!catherine')){
	
		outstandingGirls("catherine");
		
	}else if(msg.content.startsWith('!aevery')){
		
		outstandingGirls("aevery");
		
	}else if(msg.content.startsWith('!gabby')){
		
		outstandingGirls("gabby");
	}else if(msg.content.includes('fuck you')){
		msg.channel.send("fffFFUCK yOU");

	}else if(msg.content.startsWith('!retro')){
		msg.channel.send("the fuck do you want me to say??");

	}else if(msg.content.includes('420') && msg.author.id != 669273008967516172){
		msg.channel.send("no");

	}else if(msg.content.startsWith('!430')){
		msg.channel.send("430 > 420, obviously more dank");

	}else if(msg.content.includes("beans")){
		msg.channel.send("https://media.discordapp.net/attachments/660329145804390410/686041583405105182/image0.jpg?width=406&height=625");

	}else if(msg.content.startsWith('!TKCommands')){
		const embed = new RichEmbed();
		embed.setTitle("Commands")
			.setColor("#00ffff")
			.setDescription('\n!TKInfo - Prints info about the bot \n\n' +
				'!pog - fun little command. \n\n' +
				'!admin - admin stuff \n\n' +
				'gamer - fun little command to chew out people saying gamer \n\n' +
				'!UserPurge - the main function of this bot... !helpPurge \n\n' +
				"~MSGCount - command used for debugging/indexing of a user ID's message count \n\n" +
				'!horny - call people out for being horny \n\n' +
				'!announce - command to make the bot say something \n\n' +
				'!catherine - certified good girl \n\n' +
				'!aevery - certified good girl \n\n' +
				'!gabby - certified good girl(?) \n\n' +
				'!retro - the fuck you want me to say \n\n' +
				"there's also like a dozen easter eggs...");
		msg.channel.send(embed);

	}else if(msg.content.includes("are you on drugs")){
		msg.channel.send("lol yeah");

	}else if(msg.content.includes("¯\\_(ツ)_/¯")){
		msg.channel.send("make up your mind you twatmuffin.");

	}else if(msg.content.includes("strings")){
		msg.channel.send("https://cdn.discordapp.com/attachments/655642205465215016/703141130912399370/unknown.png");

	}else if(msg.content.includes("is") && msg.content.includes("asleep")){
		if(msg.content.includes("ember") || msg.content.includes("gabby")){
			msg.channel.send("idk but they probably should be. https://cdn.discordapp.com/attachments/158125349769576448/700588892805660682/8af7e897e8d7beae83d188832adc8fb7.mp4")
		}else if(msg.content.includes("poyo")){
			msg.channel.send("poyo");
		}else {
			msg.channel.send("idk dude, go kiss them and find out");
		}

	}else if(msg.content.includes("cdn") && msg.author.id != 669273008967516172){
		msg.channel.send("dis gon be gud");

	}else if(msg.content.startsWith("!ember")){
		outstandingGirls("ember");

	}else if(msg.content.includes("what is scp-")){
		let nameOfSCP = msg.content.slice(12);
		nameOfSCP = parseInt(nameOfSCP);
		if (nameOfSCP === 173) {
			msg.channel.send("https://cdn.discordapp.com/attachments/572675846679166977/702064325019303946/dont_worry_about_it.png");
		}else if(isNaN(nameOfSCP)){
			msg.channel.send("lol nope");
		} else if(nameOfSCP > 5099){
			msg.channel.send("prolly doesn't exist, get lost");
		}else {
			msg.channel.send("http://www.scp-wiki.net/scp-" + nameOfSCP);
		}

	}else if(msg.content.includes("weeb") && msg.author.id != 669273008967516172){
		msg.channel.send("nice, you fucking weeb");

	}else if(msg.content.includes("shut up")){
		let rando = Math.floor(Math.random()*2);
		switch (rando) {
			case 0:
				msg.channel.send("https://i.redd.it/wrc2zc4rt0e31.jpg");
			break;
			case 1:
				msg.channel.send("https://tenor.com/view/warframe-simaris-suck-my-data-gif-12190778");
			break;
			case 2:
				msg.channel.send("https://images-na.ssl-images-amazon.com/images/I/514iO8ezBuL._AC_SL1001_.jpg");
			break;
		}

	}else if(msg.content.includes("wait")){
		msg.channel.send("oh no");

	}else if(msg.content.includes("a toaster")){
		msg.channel.send("https://cdn.discordapp.com/attachments/595436575177834496/703847959472636004/photo_2020-04-26_01-00-13.jpg");

	}else if(msg.content.includes("cat ")){
		msg.channel.send("https://cdn.discordapp.com/attachments/621695346371985408/702217363847774229/image0.jpg");

	}else if(msg.content.startsWith("F")){
		msg.channel.send("salute... o7");

	}else if(msg.content.includes("uwu") && msg.author.id != 669273008967516172){
		msg.channel.send(":uwu:");
		
	}else if(msg.content.startsWith('!roll')){
		let dPos = msg.content.indexOf("d");
		let arg1 = msg.content.slice(5,dPos);
		let arg2 = msg.content.slice(dPos + 1);
		if(isNaN(parseInt(arg1))){
			msg.channel.send("please input a number for the number of die to be rolled, followed by a 'd'...");
		}else if(isNaN(parseInt(arg2))){
			msg.channel.send("please input a number for the number of sides on the die...");
		} else{
			msg.channel.send(diceRoll(arg1, arg2));
		}
	}
});

function diceRoll(numberOfDie, sizeOfDie){
	var sum = 0;
	let output = "The dice values are... ";
	for(i = 0; i < numberOfDie; i++){
		let dice = Math.floor((Math.random()*sizeOfDie)+1);
		sum += dice;
		output += dice;
		output += ", ";
	}
	output += "and the sum is..." + sum;
	return output;
}