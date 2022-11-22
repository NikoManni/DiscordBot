const { SlashCommandBuilder } = require("@discordjs/builders")
const { EmbedBuilder } = require("discord.js")
const { QueryType } = require("discord-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Soittaa biisejä Youtubesta")
		.addSubcommand((subcommand) =>
			subcommand
				.setName("link")
				.setDescription("Käytä Youtube linkkiä")
				.addStringOption((option) => option.setName("url").setDescription("the song's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("playlist")
				.setDescription("Käytä Youtube soittolistan linkkiä")
				.addStringOption((option) => option.setName("url").setDescription("the playlist's url").setRequired(true))
		)
		.addSubcommand((subcommand) =>
			subcommand
				.setName("search")
				.setDescription("Hae Youtube hakusanalla")
				.addStringOption((option) =>
					option.setName("hakusana").setDescription("the search keywords").setRequired(true))
		)
        .addSubcommand((subcommand) =>
            subcommand
                .setName("uwu")
                .setDescription("uwu")
        ),
	run: async ({ client, interaction }) => {
		if (!interaction.member.voice.channel) return interaction.editReply("Mee kannulle")

		const queue = await client.player.createQueue(interaction.guild)
		if (!queue.connection) await queue.connect(interaction.member.voice.channel)

		let embed = new EmbedBuilder()

		if (interaction.options.getSubcommand() === "link") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_VIDEO
            })
            if (result.tracks.length === 0)
                return interaction.editReply("Ei löydy")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** lisättiin jonoon`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Kesto: ${song.duration}`})

		} else if (interaction.options.getSubcommand() === "playlist") {
            let url = interaction.options.getString("url")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.YOUTUBE_PLAYLIST
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Ei löydy")
            
            const playlist = result.playlist
            await queue.addTracks(result.tracks)
            embed
                .setDescription(`**${result.tracks.length} kaikki biisit soittolistasta [${playlist.title}](${playlist.url})** on lisätty jonoon`)
                .setThumbnail(playlist.thumbnail)

		} else if (interaction.options.getSubcommand() === "search") {
            let url = interaction.options.getString("hakusana")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Ei löydy")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`**[${song.title}](${song.url})** lisättiin jonoon`)
                .setThumbnail(song.thumbnail)
                .setFooter({ text: `Kesto: ${song.duration}`})
		}

        else if (interaction.options.getSubcommand() === "uwu") {
            let url = ("https://www.youtube.com/shorts/Tn937VjQtqI")
            const result = await client.player.search(url, {
                requestedBy: interaction.user,
                searchEngine: QueryType.AUTO
            })

            if (result.tracks.length === 0)
                return interaction.editReply("Ei löydy")
            
            const song = result.tracks[0]
            await queue.addTrack(song)
            embed
                .setDescription(`uwu`)
                
		}

        if (!queue.playing) await queue.play()
        await interaction.editReply({
            embeds: [embed]
        })
	},
}
