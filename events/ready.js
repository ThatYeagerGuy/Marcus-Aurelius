const { Events } = require('discord.js');
const { exec } = require('child_process');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
	
	exec('node deploy-commands.js', (error, stdout, stderr) => {
	if (error) {
	  console.error(`Error executing deploy-commands.js: ${error.message}`);
	  return;
	}
	if (stderr) {
	  console.error(`stderr: ${stderr}`);
	  return;
	}
    console.log(`deploy-commands.js output: ${stdout}`);
  });
}
};