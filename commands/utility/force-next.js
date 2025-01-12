const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('force')
		.setDescription('Forces the next message to mess with people'),
	async execute(interaction) {
		await interaction.reply('Prepping, need to add a field to put in text.');
		await wait(500);
		await interaction.editReply('Not actually implemented yet');
;

	},
};
