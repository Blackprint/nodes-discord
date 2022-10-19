/**
 * Respond to slash command's autocomplete request
 * @summary Discord.js Slash Command
 * @blackprint node
 */
Blackprint.registerNode("Discord/SlashCommand/Autocomplete/Respond",
class extends Blackprint.Node {
	static input = {
		
		Interaction: fType(DiscordLib, 'BaseInteraction'),
		Choices: Blackprint.Port.ArrayOf(String),
	};
	static output = { };

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Respond Autocomplete";
	}

	request(){this.update()}
	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(!Input.Interaction) return;

		Input.Interaction.respond(Input.Choices.map(str => ({ name: str, value: str })));
	}
});