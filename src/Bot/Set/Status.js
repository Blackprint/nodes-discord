/**
 * Set bot status
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Bot/Set/Status",
class extends Blackprint.Node {
	static input = {
		Client: fType(DiscordLib, 'Client'),
		/**
		 * online = Online
		 * idle = Idle
		 * dnd = Busy
		 * invisible = Invisible
		 */
		Status: Blackprint.Port.Default(String, 'online'),
	};
	static output = {};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Set bot's status";
	}

	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Client == null || !Input.Status) return;

		Input.Client.user.setStatus(Input.Status);
	}
});