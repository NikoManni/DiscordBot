const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")

module.exports = {
	data: new SlashCommandBuilder().setName("skip").setDescription("Skippaa biisin"),
	run: async ({ client, interaction }) => {
		const queue = client.player.getQueue(interaction.guildId)

		if (!queue) return await interaction.editReply("Jonossa ei oo biisejä")

        const currentSong = queue.current

		queue.skip()
        await interaction.editReply({
            embeds: [
                new EmbedBuilder().setDescription(`${currentSong.title} skipattiin!`).setThumbnail(currentSong.thumbnail)
            ]
        })
	},
}
