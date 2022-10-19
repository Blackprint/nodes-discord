class SlashCommandCreate {
	constructor(node){
		let { Input, Output } = node.ref;

		this.name = Input.Name;
		this.description = Input.Description;

		let Autocompletes = Input.Autocompletes;
		Autocompletes = Autocompletes.length === 0 ? null : Autocompletes;
		this.options = Autocompletes;

		this._node = node;
	}
	toJSON(){
		return {
			name: this.name,
			description: this.description,
			options: this.options,
		};
	}
}

/**
 * Create/prepare a slash command to be registered
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/SlashCommand/Create",
class extends Blackprint.Node {
	static input = {
		Name: String,
		Description: String,
		Autocompletes: Blackprint.Port.ArrayOf(AutocompleteCreate),
	};
	static output = {
		Command: SlashCommandCreate,
		Interacted: fType(DiscordLib, 'BaseInteraction'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Create Slash Commands";
	}

	request(){this.update()}
	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(!Input.Name) return;

		Output.Command = new SlashCommandCreate(this);
	}

	interacted(interaction){
		this.output.Interacted = interaction;
	}

	handleAutocomplete(interaction){
		let { Input: { Autocompletes } } = this.ref; // Shortcut
		if(Autocompletes.length === 0) return;

		let focusedOpt = interaction.options.getFocused(true);

		for (let i=0; i < Autocompletes.length; i++) {
			let temp = Autocompletes[i];
			if(temp.name === focusedOpt.name){
				temp._node.handle(interaction);
				break;
			}
		}
	}
});