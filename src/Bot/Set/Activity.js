/**
 * Set bot activity
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Bot/Set/Activity",
class extends Blackprint.Node {
	static input = {
		Client: fType(DiscordLib, 'Client'),
		/**
		 * 0 = Playing
		 * 1 = Streaming
		 * 2 = Listening
		 * 3 = Watching
		 * 4 = Custom
		 * 5 = Competing
		 */
		Type: Blackprint.Port.Default(Number, 0),
		Text: String,
	};
	static output = {};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Set bot's activity";
	}

	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Client == null || !Input.Text) return;

		Input.Client.user.setActivity(Input.Text, { type: Input.Type });
	}
});