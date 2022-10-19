/**
 * Remove message from a channel
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Message/Delete",
class extends Blackprint.Node {
	static input = {
		Exec: Blackprint.Port.Trigger(port => port.iface.node.send()),
		Message: fType(DiscordLib, 'Message'),
	};
	static output = {
		/**
		 * Return true if the message was found and can be deleted
		 * Return false if message was not found or has no permission to delete
		 */
		Deleted: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Delete Message";
	}

	async send(){
		let { Input, Output } = this.ref; // Shortcut

		if(Input.Message == null) return;
		Output.Deleted = await Input.Message.delete();
	}
});