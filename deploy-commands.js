const { REST, Routes } = require('discord.js');
const { runType, devGuild, guildIds, token, clientId } = require('./config.json');  // Import config.json
const fs = require('node:fs');
const path = require('node:path');


// Parse command-line arguments
const args = process.argv.slice(2); // Get the arguments passed to the script
const closing = args.includes('--empty'); // Check if '--empty' is passed

const commands = [];
const devCommands = [];

if (!closing) {
    // Only load commands if we're not deploying empty commands
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        // Grab all the command files from the folder
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        // Add commands to the array
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                if('deploy' in command){
                    commands.push(command.data.toJSON());
                    devCommands.push(command.data.toJSON());
                }
                else{
                    devCommands.push(command.data.toJSON());
                }
                
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
    try {
        for (const guildId of guildIds)
        {
            if(closing || (runType === 'dev' && guildId != devGuild))
            {
                //skips the refresh if it's not running for prod
                console.log(`Started refreshing 0 commands to guild ${guildId}`);
                //const data = await rest.put(
            //Routes.applicationGuildCommands(clientId, guildId),
            //{ body: commands }
          
        //);
            }
            else if (guildId == devGuild)
            {
                console.log(`Started refreshing ${commands.length} application (/) commands to guild ${guildId}`);
                const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: devCommands });
            }
            else
            {
                console.log(`Started refreshing ${commands.length} application (/) commands to guild ${guildId}`);
                const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands });
            }
        }
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
    console.log(`Command deployment complete! Program running...`);
})();