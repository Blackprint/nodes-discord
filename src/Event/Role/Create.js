/**
 * Listen for event from the client
 * @summary Discord
 * @blackprint node
 */
Blackprint.registerNode("Discord/Event/Role/Create",
class extends Blackprint.Node {
	// Node type: event listener
	static type = 'event';

	static input = {
		/** Websocket client connection */
		Client: fType(DiscordLib, 'Client'),
	};
	static output = {
		/** Response data */
		Data: Object,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Role Create";
	}

	init(){
		// Listen if the cable was disconnected from the input port
		this.ref.IInput.Client.on('disconnect', Context.EventSlot, ()=> this.unlisten?.());
	}

	update(){
		this.unlisten?.(); // Remove old event if exist

		let { Input, Output } = this.ref; // Shortcut
		let client = Input.Client; // Store reference to variable

		this.unlisten = () => client.off('roleCreate', this._callback);
		client.on('roleCreate', this._callback = (data) => Output.Data = data);
	}
});