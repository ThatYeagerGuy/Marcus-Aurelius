const { SlashCommandBuilder, REST, Routes } = require('discord.js');  // Import the necessary modules
const wait = require('node:timers/promises').setTimeout;
const { exec } = require('child_process');
const { clientId, guildIds, token } = require('../../config.json');  // Assuming clientId, guildId, and token are in config.json

module.exports = {
  cooldown: 60,
  data: new SlashCommandBuilder()
    .setName('close')
    .setDescription('Undeploy and shutdown'),

  async execute(interaction) {
    await interaction.reply('Bot shutdown starting!');

    // Instantiate REST module with token
    const rest = new REST().setToken(token);

    // Undeploy commands for multiple guilds
    try {
      for (const guildId of guildIds) {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
        console.log(`Successfully deleted all guild commands for guild ${guildId}.`);
      }
    } catch (error) {
      console.error(error);
    }
      await interaction.deleteReply();
    // Wait 2 seconds and shut down the bot
    await wait(2000);  // Wait 2 seconds
    process.exit();  // Shut down the bot
  }
};