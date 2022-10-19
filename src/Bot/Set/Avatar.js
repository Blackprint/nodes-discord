/**
 * Set bot activity
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Bot/Set/Avatar",
class extends Blackprint.Node {
	static input = {
		Client: fType(DiscordLib, 'Client'),
		URL: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Set bot's avatar";
	}

	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Client == null || !Input.URL) return;

		Input.Client.user.setAvatar(Input.URL);
	}
});