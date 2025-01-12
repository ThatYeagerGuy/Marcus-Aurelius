const { SlashCommandBuilder } = require('discord.js');
const path = require('path');
const fs = require('fs');
const csv = require('csv-parser');
const wait = require('node:timers/promises').setTimeout;

const filePath = path.join(__dirname, 'quotes.csv');
let quotes = [];

function loadQuotes() {
    return new Promise((resolve, reject) => {
        // If quotes are already loaded, resolve immediately
        if (quotes.length > 0) {
            return resolve();
        }

        // Parse the CSV file and load the quotes
        fs.createReadStream(filePath)
            .pipe(csv(['quote', 'author']))  // Specify the headers for the CSV columns
            .on('data', (row) => {
                // Push each parsed quote into the quotes array
                quotes.push(row);
            })
            .on('end', () => {
                if (quotes.length === 0) {
                    reject('No quotes found in the file.');
                } else {
                    resolve();
                }
            })
            .on('error', (err) => {
                reject(`Error reading the CSV file: ${err}`);
            });
    });
}

module.exports = {
    deploy: 'true',
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Break glass in case of ass.'),
    async execute(interaction) {
        // interaction.guild is the object representing the Guild in which the command was run

        try {
            // Ensure quotes are loaded the first time the command is triggered
            if (quotes.length === 0) {
                await loadQuotes();  // Load quotes if not already loaded
            }

            // Pick a random quote from the loaded quotes array
            const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

            // Respond with the random quote and author
            const response = `"${randomQuote.quote}" - ${randomQuote.author}`;
            await interaction.reply('Eat shit');
            await wait(200);
            await interaction.editReply(response);
            //await interaction.reply(response);
        } catch (err) {
            console.error('Error:', err);
            await interaction.reply("Sorry, something went wrong while fetching a quote.");
        }
    },
};