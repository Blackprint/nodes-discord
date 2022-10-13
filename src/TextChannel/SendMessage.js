Blackprint.registerNode("Discord/TextChannel/SendMessage",
class extends Blackprint.Node {
	static input = {
		Send: Blackprint.Port.Trigger(port => port.iface.node.send()),
		TextChannel: fType(DiscordLib, 'BaseGuildTextChannel'),
		Content: String,
	};
	static output = { };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Send Message";
	}

	send(){
		let { Input, Output } = this.ref; // Shortcut
		Input.TextChannel?.send(Input.Content);
	}
});