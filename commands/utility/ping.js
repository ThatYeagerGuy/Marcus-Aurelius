const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Take a guess jerkwad'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		await wait(500);
		await interaction.editReply('Pong again!');

	},
};
