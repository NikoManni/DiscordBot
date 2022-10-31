const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
	data: new SlashCommandBuilder().setName("pause").setDescription("Pistää biisit pauselle"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Jonossa ei oo biisejä")

		queue.setPaused(true)
        await interaction.editReply("Juomatauko! Kirjota `/resume` ni jatketaan")
	},
}
