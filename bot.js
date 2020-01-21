console.clear();
console.time('opTime');
var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
	colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
	token: auth.token,
	autorun: true
});

bot.on('ready', function (evt) {

	console.timeLog('opTime');
	//logger.info('Connected');
	//logger.info('Logged in as: ');
	//logger.info(bot.username + ' - (' + bot.id + ')');
	console.log('...');
	bot.user;
	console.log('Thronekeeper is Active. Happy Hunting');
});

bot.on('message', function (user, userID, channelID, message, evt) {
// Our bot needs to know if it will execute a command
// It will listen for messages that will start with `!`
	if (message.substring(0, 1) == '!') {
		var args = message.substring(1).split(' ');
		var cmd = args[0];
		args = args.splice(1);
		switch(cmd) {
			// !awake
			case 'awake':
			bot.sendMessage({
				to: channelID,
					message: 'Finally awake. Eyes up. <3'
			});
			break;
			// Just add any case commands if you want to..
			case 'debug':
			bot.sendMessage({
				to: channelID,
					message:'Debug code: OMEGA-'+channelID
			});
			break;
		}
	}
});