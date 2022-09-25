Blackprint.registerNode("Discord/Event/Error",
class extends Blackprint.Node {
	// Node type: event listener
	static type = 'event';

	static input = { Client: DiscordJS.Client || fType('Client') };
	static output = { Data: Object };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Error";
	}

	init(){
		let { IInput } = this.ref; // Shortcut

		// Listen if the cable was disconnected from the input port
		IInput.Client.on('disconnect', Context.EventSlot, ()=> {
			this.unlisten?.();
		});
	}

	update(){
		this.unlisten?.(); // Remove old event if exist

		let { Input, Output } = this.ref; // Shortcut
		let client = Input.Client; // Store reference to variable

		this.unlisten = () => client.off('error', this._callback);
		client.on('error', this._callback = (err) => {
			Output.Data = err;
		});
	}
});

/*
channelCreate
channelDelete
channelPinsUpdate
channelUpdate
emojiCreate
emojiDelete
emojiUpdate
guildBanAdd
guildBanRemove
guildCreate
guildDelete
guildIntegrationsUpdate
guildMemberAdd
guildMemberAvailable
guildMemberRemove
guildMembersChunk
guildMemberUpdate
guildScheduledEventCreate
guildScheduledEventDelete
guildScheduledEventUpdate
guildScheduledEventUserAdd
guildScheduledEventUserRemove
guildUnavailable
guildUpdate
interactionCreate
invalidated
inviteCreate
inviteDelete
messageCreate
messageDelete
messageDeleteBulk
messageReactionAdd
messageReactionRemove
messageReactionRemoveAll
messageReactionRemoveEmoji
messageUpdate
presenceUpdate
rateLimit
ready
roleCreate
roleDelete
roleUpdate
stageInstanceCreate
stageInstanceDelete
stageInstanceUpdate
stickerCreate
stickerDelete
stickerUpdate
threadCreate
threadDelete
threadListSync
threadMembersUpdate
threadMemberUpdate
threadUpdate
typingStart
userUpdate
voiceStateUpdate
warn
webhookUpdate
*/