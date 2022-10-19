/**
 * Listen for event from the client
 * @summary Discord
 * @blackprint node
 */
Blackprint.registerNode("Discord/Event/Interaction/Create",
class extends Blackprint.Node {
	// Node type: event listener
	static type = 'event';

	static input = {
		/** Websocket client connection */
		Client: fType(DiscordLib, 'Client'),
	};
	static output = {
		/** Response data */
		Data: fType(DiscordLib, 'BaseInteraction'),
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface('BPIC/Discord/Event/Interaction/Create');
		iface.title = "Interaction Create";
	}

	init(){
		// Listen if the cable was disconnected from the input port
		this.ref.IInput.Client.on('disconnect', Context.EventSlot, ()=> this.unlisten?.());
	}

	update(){
		this.unlisten?.(); // Remove old event if exist

		let { Input, Output } = this.ref; // Shortcut
		let client = Input.Client; // Store reference to variable

		this.unlisten = () => client.off('interactionCreate', this._callback);
		client.on('interactionCreate', this._callback = (data) => {
			let type = this.iface.data.type;

			// Interaction type check
			if(type === 0){} // Any interaction type
			else if(type === 1){ if(!data.isButton()) return; }
			else if(type === 2){ if(!data.isAutocomplete()) return; }
			else if(type === 3){ if(!data.isChatInputCommand()) return; }
			else if(type === 4){ if(!data.isCommand()) return; }
			else if(type === 5){ if(!data.isContextMenuCommand()) return; }
			else if(type === 6){ if(!data.isMessageComponent()) return; }
			else if(type === 7){ if(!data.isMessageContextMenuCommand()) return; }
			else if(type === 8){ if(!data.isModalSubmit()) return; }
			else if(type === 9){ if(!data.isSelectMenu()) return; }
			else if(type === 10){ if(!data.isUserContextMenuCommand()) return; }

			Output.Data = data;
		});
	}

	syncIn(id, data){
		if(id === 'type') this.data.type = data;
	}
});

Blackprint.registerInterface('BPIC/Discord/Event/Interaction/Create', 
class extends Blackprint.Interface {
	constructor(node){
		super(node);
		this.data = {type: 0}; // Default any interaction
	}
});