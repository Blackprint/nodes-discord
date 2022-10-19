/**
 * Reply to user interaction
 * @summary Discord Slash Command
 * @blackprint node
 */
Blackprint.registerNode("Discord/SlashCommand/GetOption",
class extends Blackprint.Node {
	static input = {
		/** Slash command interaction event */
		Interaction: fType(DiscordLib, 'BaseInteraction'),
		/** Slash command's option name */
		Name: String,
	};
	static output = {
		Data: Blackprint.Types.Any,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Get command option";
	}

	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Interaction == null || !Input.Name) return;

		try {
			Output.Data = Input.Interaction.options.get(Input.Name.toLowerCase()).value;
		} catch(e) {
			Output.Data = null;
		}
	}
});