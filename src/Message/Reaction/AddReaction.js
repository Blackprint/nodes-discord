/**
 * Give emoji reaction to a message
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Message/Reaction/Add",
class extends Blackprint.Node {
	static input = {
		Exec: Blackprint.Port.Trigger(port => port.iface.node.send()),
		Message: fType(DiscordLib, 'Message'),
		/** You can use regular emoji, or using the emoji ID */
		Emoji: String,
	};
	static output = {
		Reacted: fType(DiscordLib, 'MessageReaction'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Add Message Reaction";
	}

	async send(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Message == null || !Input.Emoji) return;
		Output.Reacted = await Input.Message.react(Input.Emoji);
	}
});