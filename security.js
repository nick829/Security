module.exports = {
    antiRaid(member) {
        console.log(`${member.user.tag} joined ${member.guild.name}`);
    },

    antiNuke(guild) {
        console.log(`Monitoring ${guild.name} for nukes`);
    },

    lockdown(guild) {
        guild.channels.cache.forEach(channel => {
            channel.permissionOverwrites.edit(
                guild.roles.everyone,
                { SendMessages: false }
            );
        });
    }
};