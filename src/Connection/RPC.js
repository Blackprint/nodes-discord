Blackprint.registerNode("Discord/Connection/RPC",
class extends Blackprint.Node {
	static input = {};
	static output = {};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "RPC";
	}
});