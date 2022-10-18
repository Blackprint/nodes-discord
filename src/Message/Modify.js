/**
 * Edit or modify message
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Message/Modify",
class extends Blackprint.Node {
	static input = {
		Exec: Blackprint.Port.Trigger(port => port.iface.send()),
		Message: fType(DiscordLib, 'Message'),
		Content: String,
	};
	static output = {
		/**
		 * Return true if the message was edited
		 * Return false if no permission or the message was gone
		 */
		Success: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Modify Message";
	}

	async send(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Message == null || !Input.Content) return;

		Output.Success = await Input.Message.edit(Input.Content);
	}
});