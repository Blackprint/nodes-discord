/**
 * Get text input box's value from modal/form submission
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Interaction/Modal/GetValue/TextInput",
class extends Blackprint.Node {
	static input = {
		Interaction: fType(DiscordLib, 'BaseInteraction'),
		/** Input box's customId */
		CustomId: String,
	};
	static output = {
		Text: String,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Text input value";
	}

	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(!Input.Interaction || !Input.CustomId) return;

		Output.Text = Input.Interaction.fields.getTextInputValue(Input.CustomId);
	}
});