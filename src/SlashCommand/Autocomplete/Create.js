class AutocompleteCreate {
	constructor(node){
		let { Input, Output } = node.ref;

		this.name = Input.Name.toLowerCase();
		this.description = Input.Description;

		let Choices = Input.Choices;
		Choices = Choices.length === 0 ? null : Choices.map(str => ({ name: str, value: str }));
		this.choices = Choices;

		this.required = Input.Required;
		this._node = node;
	}
	toJSON(){
		return {
			name: this.name,
			type: 3, //https://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-type
			description: this.description,
			required: this.required,
			choices: this.choices,
			autocomplete: this.choices === null,
		};
	}
}

/**
 * Create/prepare a autocomplete for slash command
 * @summary Discord.js Slash command
 * @blackprint node
 */
Blackprint.registerNode("Discord/SlashCommand/Autocomplete/Create",
class extends Blackprint.Node {
	static input = {
		Name: String,
		Description: String,
		Required: Boolean,
		Choices: Blackprint.Port.ArrayOf(String),
	};
	static output = {
		Data: AutocompleteCreate,
		Requested: fType(DiscordLib, 'BaseInteraction'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Create Autocomplete";
	}

	request(){this.update()}
	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(!Input.Name) return;

		if(/^[-_\p{L}\p{N}\p{sc=Deva}\p{sc=Thai}]{1,32}$/mu.test(Input.Name) === false){
			throw new Error("Invalid command name: " + Input.Name);
		}

		Output.Data = new AutocompleteCreate(this);
	}

	handle(interaction){
		this.output.Requested = interaction;
	}
});