/**
 * Respond to Discord server but we currently didn't want to send anything yet
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Interaction/Defer",
class extends Blackprint.Node {
	static input = {
		/** Channel where the message will be send */
		Interaction: fType(DiscordLib, 'BaseInteraction'),
	};
	static output = { };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Defer an interaction";
	}

	update(){
		let { Input } = this.ref; // Shortcut
		if(Input.Interaction == null) return;

		Input.Interaction.deferReply();
	}
});