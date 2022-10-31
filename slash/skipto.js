const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("skipto").setDescription("Siirtyy tiettyyn biisiin")
    .addNumberOption((option) => 
        option.setName("tracknumber").setDescription("The track to skip to").setMinValue(1).setRequired(true)),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Jonossa ei oo biisejä")

        const trackNum = interaction.options.getNumber("tracknumber")
        if (trackNum > queue.tracks.length)
            return await interaction.editReply("Väärä numero, kokeileppa uuestaan")
		queue.skipTo(trackNum - 1)

        await interaction.editReply(`Siirryttiin jonossa biisiin numero ${trackNum}`)
	},
}
