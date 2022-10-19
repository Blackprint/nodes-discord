/**
 * Reply to user interaction
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Interaction/Reply",
class extends Blackprint.Node {
	static input = {
		Exec: Blackprint.Port.Trigger(port => port.iface.node.send()),
		/** Interaction object that will be replied */
		Interaction: fType(DiscordLib, 'BaseInteraction'),
		/** Text content of the message */
		Content: String,
	};
	static output = {
		Message: fType(DiscordLib, 'Message'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Reply an interaction";
	}

	async send(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Interaction == null) return;

		let temp = await Input.Interaction.reply(Input.Content);
		temp = await temp.awaitMessageComponent();
		Output.Message = temp.message;
	}
});