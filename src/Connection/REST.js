/**
 * Prepare REST connection to Discord's server
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Connection/REST",
class extends Blackprint.Node {
	static input = {
		AccessToken: String,
	};
	static output = {
		Client: fType(DiscordLib, 'REST'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "REST";
	}

	update(){
		if(Blackprint.Environment.isBrowser) return;
		
		let { Input, Output } = this.ref;
		if(!Input.AccessToken) return;

		// Construct and prepare an instance of the REST module
		Output.Client = new DiscordLib.REST({ version: '10' }).setToken(Input.AccessToken);
	}
});