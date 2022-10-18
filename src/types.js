let Types = {
	User: Blackprint.Port.StructOf(fType(DiscordLib, 'User'), {
		Id: {type: String, field: 'id'},
		Bot: {type: Boolean, field: 'bot'},
		Username: {type: String, field: 'username'},
		Discriminator: {type: String, field: 'discriminator'},
		Avatar: {type: String, field: 'avatar'},
		AccentColor: {type: String, field: 'accentColor'},
	}),
	BaseChannel: Blackprint.Port.StructOf(fType(DiscordLib, 'BaseGuildTextChannel'), {
		Id: {type: String, field: 'id'},
		Name: {type: String, field: 'name'},
		Members: {type: Map, field: 'members'},
		Messages: {type: fType(DiscordLib, 'MessageManager'), field: 'messages'},
	}),
	Guild: Blackprint.Port.StructOf(fType(DiscordLib, 'Guild'), {
		Id: {type: String, field: 'id'},
		Name: {type: String, field: 'name'},
		Members: {type: Map, handle: data=> data.members.cache},
		Channels: {type: fType(DiscordLib, 'GuildChannelManager'), field: 'channels'},
	}),
};
