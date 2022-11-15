/**
 * Create text input box for modal
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Interaction/Modal/TextInput",
class extends Blackprint.Node {
	static input = {
		/** Input box's customId */
		CustomId: String,
		/** Input box's label */
		Label: String,
		/**
		 * Input box's style
		 * @menu
		 * - [short]:(Short) = One line text input box
		 * - [paragraph]:(Paragraph) = Paragraph text input box
		 */
		Style: Blackprint.Port.Default(String, 'short'),
	};
	static output = {
		Object: fType(DiscordLib, 'TextInputBuilder'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Text input box";
	}

	request(){this.update()}
	update(){
		let { Input, Output } = this.ref; // Shortcut
		if(!Input.CustomId || !Input.Label) return;

		Output.Object = new DiscordLib.TextInputBuilder()
			.setCustomId(Input.CustomId)
			.setLabel(Input.Label)
			.setStyle(Input.Style);
	}
});