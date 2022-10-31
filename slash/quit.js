const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("quit").setDescription("Pakkaa ylös ja painu vittuun"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Jonossa ei oo biisejä")

		queue.destroy()
        await interaction.editReply("Ok mo!")
	},
}
