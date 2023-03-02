const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("repeat")
        .setDescription("Will repeat what you say!")
        .addStringOption((option) =>	//first option to input
            option
                .setName("input")
                .setDescription("The input to repeat back")
                .setRequired(true) //makes input required
        )
        .addStringOption((option2) =>	//second option to input
            option2
                .setName("input2")
                .setDescription("Input 2 to repeat back from")
                .setRequired(true)	//makes input required
        )
        .addIntegerOption((option3) =>	//third option to input
            option3
                .setName("num")
                .setDescription("will spit out number")
				.setMinValue(0)
				.setMaxValue(10)
                .setRequired(true)	//makes input required
        ),

    async execute(interaction) {
        const value = interaction.options.getString("input");
        const value2 = interaction.options.getString("input2");
        const num = interaction.options.getInteger("num");
        if (value && value2 && num) {
            return interaction.reply(`${value} ${value2} ${num}`);
		}
    },
};
