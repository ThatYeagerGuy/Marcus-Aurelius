const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('restart')
		.setDescription('Restarts the Palworld server'),
	async execute(interaction) {
		await interaction.reply('Restarting the server...');
		await wait(500);
		await interaction.editReply('Not actually implemented yet');

	},
};
