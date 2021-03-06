'use strict';
const Discord = require("discord.js");
const config = require("./config.json");
const tool = require("./tool.js");
const cmds = require("./commands.js");
const prompt = require('prompt');
const { get } = require("snekfetch");
const colors = require("colors");
prompt.message = "";
prompt.colors = '';

const bot = new Discord.Client();

let statuses = [`${config.prefix}help`, `regarder des photos de chat`]
bot.on('ready',() => {
	setInterval(function() {
		let status = statuses[Math.floor(Math.random()*statuses.length)];

		bot.user.setPresence({ game: { name: status }, status: 'dnd'});
	}, 10000)
	bot.user.setActivity(`Cube_Lime YT`, {type:'WATCHING'});
});

bot.on('ready',() => {
	console.log(`${bot.user.username} se lance`);
	console.log(`le bot se lance sur ${bot.guilds.size} server`);
});

bot.on('message', msg => {
	
		if(msg.content.startsWith(config.prefix + 'cat')) {
		try {
			get('https://aws.random.cat/meow').then(res => {
				const embed = new Discord.RichEmbed()
				.setImage(res.body.file)
				return msg.channel.send({embed});
			});
		} catch(err) {
			return msg.channel.send(error.stack);
		}
	}
	
	if(msg.author.bot || msg.channel.type != 'text')
		return;

	if(!msg.content.startsWith(config.prefix))
		return;
	let cmd =msg.content.split(/\s+/)[0].slice(config.prefix.length).toLowerCase();
	getCmdFunction(cmd)(msg);
 });

bot.on('error', (e) => console.log(e));
bot.on('warn', (e) => console.log(e));
//bot.on('debug', (e) => console.log(e));
bot.login(process.env.token);

function getCmdFunction(cmd){
	const COMMANDS = {
		'anacle': cmds.anacle,
		'cube': cmds.cube,
		'help': cmds.help,
		'invite': cmds.invite,
		'support': cmds.support,
		'nude': cmds.nude,
		'avatar': cmds.avatar,
	}
	return COMMANDS[cmd] ? COMMANDS[cmd] : () => {};
}
