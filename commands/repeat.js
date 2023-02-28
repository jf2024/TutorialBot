const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("repeat")
        .setDescription("Will repeat what you say!")
        .addStringOption(
            (option) =>
                option
                    .setName("input")
                    .setDescription("The input to repeat back")
                    .setRequired(true) //makes input required
        )
        .addStringOption((option2) =>
            option2
                .setName("input2")
                .setDescription("Input 2 to repeat back from")
                .setRequired(true)
        ),
    async execute(interaction) {
        const value = interaction.options.getString("input");
        const value2 = interaction.options.getString("input2");
        if (value && value2) return interaction.reply(`${value} ${value2}`);
        return interaction.reply("No option was provided!");
    },
};
