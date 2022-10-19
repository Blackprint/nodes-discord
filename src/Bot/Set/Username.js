/**
 * Set bot activity
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Bot/Set/Username",
class extends Blackprint.Node {
	static input = {
		Client: fType(DiscordLib, 'Client'),
		Username: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Set bot's username";
	}

	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Client == null || !Input.Username) return;

		Input.Client.user.setUsername(Input.Username);
	}
});