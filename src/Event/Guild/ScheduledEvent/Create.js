/**
 * Listen for event from the client
 * @summary Discord
 * @blackprint node
 */
Blackprint.registerNode("Discord/Event/Guild/ScheduledEvent/Create",
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
		iface.title = "Guild ScheduledEvent Create";
	}

	init(){
		// Listen if the cable was disconnected from the input port
		this.ref.IInput.Client.on('disconnect', Context.EventSlot, ()=> this.unlisten?.());
	}

	update(){
		this.unlisten?.(); // Remove old event if exist

		let { Input, Output } = this.ref; // Shortcut
		let client = Input.Client; // Store reference to variable

		this.unlisten = () => client.off('guildScheduledEventCreate', this._callback);
		client.on('guildScheduledEventCreate', this._callback = (data) => Output.Data = data);
	}
});