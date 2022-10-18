Blackprint.registerNode("Discord/Connection/WebSocket",
class extends Blackprint.Node {
	static input = {
		Connect: Blackprint.Port.Trigger(port => port.iface.node.connect()),
		Disconnect: Blackprint.Port.Trigger(port => port.iface.node.disconnect()),
		/** Default to all intents except auto moderation */
		IntentsBits: Blackprint.Port.Default(Number, 131071),
		AccessToken: String,
	};
	static output = {
		Client: fType(DiscordLib, 'Client'),
		Ready: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "WebSocket";
		this._toast = new NodeToast(iface);

		this._toast.warn("Disconnected");
	}

	connect(){
		let { IntentsBits, AccessToken } = this.ref.Input;
		if(IntentsBits == null || !AccessToken) return;

		if(!Blackprint.Environment.isNode)
			return this._toast.warn("Blackprint remote engine is required");

		this.syncOut("warn", "Connecting");

		let { Output } = this.ref;
		Output.Client?.destroy();
		Output.Ready = false;
		let client = Output.Client = new DiscordLib.Client({ intents: new DiscordLib.IntentsBitField(IntentsBits) });

		client.once('ready', () => {
			this.syncOut("success", "Connected");
			Output.Ready = true;
		});

		client.login(AccessToken);
	}

	syncIn(id, val){
		if(!Blackprint.Environment.isBrowser) return;

		let toast = this._toast;
		if(id === 'warn') toast.warn(val);
		if(id === 'success') {
			toast.clear();
			toast.success(val);
		}
	}

	disconnect(){
		let { Output } = this.ref;

		Output.Client?.destroy();
		Output.Ready = false;

		this._toast.warn("Disconnected");
	}
});