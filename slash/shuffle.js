const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("shuffle").setDescription("Satunnaistoisto"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Jonossa ei oo biisejä")

		queue.shuffle()
        await interaction.editReply(`${queue.tracks.length} biisiä on nyt ihan sekasin`)
	},
}
