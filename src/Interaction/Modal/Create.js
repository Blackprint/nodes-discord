let modalCreateId = 0;

/**
 * Create modal for replying to user interaction
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/Interaction/Modal/Create",
class extends Blackprint.Node {
	static input = {
		Exec: Blackprint.Port.Trigger(port => port.iface.node.exec()),
		/** Interaction object that will be replied */
		Interaction: fType(DiscordLib, 'BaseInteraction'),
		/** Modal title */
		Title: String,
		/** Modal rows */
		Rows: Blackprint.Port.ArrayOf(fType(DiscordLib, 'TextInputBuilder')),
	};
	static output = {
		/** This will have a value after user submitted the form/modal */
		UserSubmit: fType(DiscordLib, 'BaseInteraction'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Reply an interaction";

		this._customId = "modal" + (++modalCreateId);
	}

	_listen(){
		let { Input, Output } = this.ref; // Shortcut

		let client = Input.Interaction.client;
		if(this._client === client) return;
		this._client = client;

		this._unlisten?.();
		this._unlisten = () => client.off('interactionCreate', listen);
		client.on('interactionCreate', listen);

		function listen(ev){
			if(!ev.isModalSubmit() || ev.customId !== this._customId) return;
			Output.UserSubmit = ev;
		}
	}

	async exec(){
		let { Input } = this.ref; // Shortcut
		if(Input.Interaction == null || Input.Rows.length === 0) return;

		let modal = new DiscordLib.ModalBuilder();
		modal.setCustomId(this._customId);
		modal.setTitle(Input.Title);

		let rows = Input.Rows;
		for (let i=0; i < rows.length; i++) {
			modal.addComponents(new ActionRowBuilder().addComponents(rows[i]));
		}

		await Input.Interaction.showModal(modal);
	}

	destroy(){
		this._unlisten?.();
	}
});