/**
 * Register slash command into a guild
 * @summary Discord.js
 * @blackprint node
 */
Blackprint.registerNode("Discord/SlashCommand/Register",
class extends Blackprint.Node {
	static input = {
		/** Client connection with REST */
		Client: fType(DiscordLib, 'REST'),
		/** Connect this port to InteractionCreate event output if you want to trigger command callback */
		Event: fType(DiscordLib, 'BaseInteraction'),
		Exec: Blackprint.Port.Trigger(port => port.iface.node.send()),
		/** Your application's client id, you can obtain from Discord Developer Portal */
		AppId: String,
		/** [Optional] You can leave this empty if you want to register globally */
		GuildId: String,
		/** A collection of slash commands */
		Commands: Blackprint.Port.ArrayOf(SlashCommandCreate),
	};
	static output = {
		Success: Boolean,
	};

	constructor(instance){
		super(instance);

		let iface = this.setInterface();
		iface.title = "Register Slash Commands";
	}

	init(){
		let { IInput, Input } = this.ref; // Shortcut
		IInput.Event.on('value', ({ cable }) => {
			let interaction = cable.value;

			if(!interaction.isChatInputCommand() && !interaction.isAutocomplete()) return;
			let { GuildId, Commands } = Input;

			// Skip if the interaction was triggered for different guild
			if(!GuildId && GuildId !== interaction.guildId) return;

			for (let i=0; i < Commands.length; i++) {
				let command = Commands[i];
				if(command.name === interaction.commandName){
					if(interaction.isAutocomplete())
						command._node.handleAutocomplete(interaction);
					else 
						command._node.interacted(interaction);

					break;
				}
			}
		});
	}

	async send(){
		let { Input, Output } = this.ref; // Shortcut
		if(Input.Client == null) return;

		let GuildId = Input.GuildId;
		if(GuildId === '') GuildId = null;

		try {
			await Input.Client.put(DiscordLib.Routes.applicationGuildCommands(Input.AppId, Input.GuildId), {
				body: Input.Commands
			});
		} catch(e) {
			Output.Success = false;
			throw e;
		}

		Output.Success = true;
	}
});