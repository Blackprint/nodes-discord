Blackprint.registerNode("Discord/Event/MessageCreate",
class extends Blackprint.Node {
	// Node type: event listener
	static type = 'event';

	static input = { Client: DiscordJS.Client || fType('Client') };
	static output = {
		Data: Blackprint.Port.StructOf(DiscordJS.Message || fType('Message'), {
			Id: { type: String, field: 'id' },
			Content: { type: String, field: 'content' },
			CreatedAt: { type: Date, field: 'createdAt' },
			Author: { type: DiscordJS.User || fType('User'), field: 'author' },
			Channel: { type: DiscordJS.BaseGuildTextChannel || fType('BaseGuildTextChannel'), field: 'channel' },
			Guild: { type: DiscordJS.Guild || fType('Guild'), field: 'guild' },
			Thread: { type: DiscordJS.ThreadChannel || fType('ThreadChannel'), field: 'Thread' },
		}),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Message Create";
	}

	init(){
		let { IInput } = this.ref; // Shortcut

		// Listen if the cable was disconnected from the input port
		IInput.Client.on('disconnect', Context.EventSlot, ()=> {
			this.unlisten?.();
		});
	}

	update(){
		this.unlisten?.(); // Remove old event if exist

		let { Input, Output } = this.ref; // Shortcut
		let client = Input.Client; // Store reference to variable

		this.unlisten = () => client.off('messageCreate', this._callback);
		client.on('messageCreate', this._callback = (msg) => {
			if(msg.author?.bot) return; // Skip bot event
			Output.Data = msg;
		});
	}
});