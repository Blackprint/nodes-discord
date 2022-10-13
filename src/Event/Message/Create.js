/**
 * Listen for new message created on from any guild channel that visible by the bot
 * @summary Discord
 * @blackprint node
 */
Blackprint.registerNode("Discord/Event/Message/Create",
class extends Blackprint.Node {
	// Node type: event listener
	static type = 'event';

	static input = {
		/** Websocket client connection */
		Client: fType(DiscordLib, 'Client'),
	};

	static output = {
		/** Response data */
		Data: Blackprint.Port.StructOf(fType(DiscordLib, 'Message'), {
			/** Message Id */
			Id: { type: String, field: 'id' },
			/** Message Content */
			Content: { type: String, field: 'content' },
			/** Message Creation Date */
			CreatedAt: { type: Date, field: 'createdAt' },
			/** Message Author */
			Author: { type: fType(DiscordLib, 'User'), field: 'author' },
			/** Channel where the message was sent */
			Channel: { type: fType(DiscordLib, 'BaseGuildTextChannel'), field: 'channel' },
			/** Guild where the message was sent */
			Guild: { type: fType(DiscordLib, 'Guild'), field: 'guild' },

			/** Thread where the message was sent */
			// Thread: { type: fType(DiscordLib, 'ThreadChannel'), field: 'Thread' },
		}),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Message Create";

		// Node type: event listener
		iface.type = 'event';
	}

	init(){
		// Listen if the cable was disconnected from the input port
		this.ref.IInput.Client.on('disconnect', Context.EventSlot, ()=> this.unlisten?.());
	}

	update(){
		this.unlisten?.(); // Remove old event if exist

		let { Input, Output } = this.ref; // Shortcut
		let client = Input.Client; // Store reference to variable

		if(client == null) return;

		this.unlisten = () => client.off('messageCreate', this._callback);
		client.on('messageCreate', this._callback = (msg) => {
			if(msg.author?.bot) return; // Skip bot event
			Output.Data = msg;
		});
	}
});