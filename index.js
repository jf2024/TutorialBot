const fs = require("node:fs"); //reads from "commands" folder/dir I created and sees command files
const path = require("node:path"); //will get the path for those files
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

//command handling
const commandsPath = path.join(__dirname, "commands"); //just gets the path: C:\Users\xfuen\Documents\Projects\WondoBot\commands
const commandFiles = fs //puts each of the command files into an array
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

//event handling
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(token);

// Can probably write a function called "handling" that does the the
// command handling and event handling in one function

//-------------------------------------------------------

//Below is without the event handling

// client.once(Events.ClientReady, () => {
//     console.log("Ready!");
// });

// client.on(Events.InteractionCreate, async (interaction) => {
//     if (!interaction.isChatInputCommand()) return;

//     const command = client.commands.get(interaction.commandName);

//     if (!command) return;

//     try {
//         await command.execute(interaction);
//     } catch (error) {
//         console.error(error);
//         if (interaction.replied || interaction.deferred) {
//             await interaction.followUp({
//                 content: "There was an error while executing this command!",
//                 ephemeral: true,
//             });
//         } else {
//             await interaction.reply({
//                 content: "There was an error while executing this command!",
//                 ephemeral: true,
//             });
//         }
//     }
// });
