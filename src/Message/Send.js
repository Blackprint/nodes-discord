/**
 * Send message to a text channel
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Message/Send",
class extends Blackprint.Node {
	static input = {
		Exec: Blackprint.Port.Trigger(port => port.iface.node.send()),
		/** Channel where the message will be send */
		TextChannel: fType(DiscordLib, 'BaseGuildTextChannel'),
		/** Text content of the message */
		Content: String,
	};
	static output = {
		Message: fType(DiscordLib, 'Message'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Send Message";
	}

	async send(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.TextChannel == null || !Input.Content) return;
		Output.Message = await Input.TextChannel.send(Input.Content);
	}
});