// Let the Blackprint Editor know the source URL where
// the registerNode and registerInterface belongs to
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	hasInterface: true,

	// This will autoload (*.docs.json) for Browser
	hasDocs: true,
});

let DiscordLib = {};
if(Blackprint.Environment.isNode)
	DiscordLib = await import('file:'+process.cwd()+'/node_modules/discord.js/src/index.js');


// Try obtain the class, if not exist then create fake type only for browser
let _fType = {};
let fType = function(obj, name){
	let type = obj[name];

	if(type == null)
		type = deepProperty(obj, name.split('.'));

	if(type != null) return type;

	if(Blackprint.Environment.isNode)
		throw new Error(`'Discord.${name}' class contructor was not found`);

	if(_fType[name] == null){
		let temp = _fType[name] = class{};
		Object.defineProperty(temp, 'name', {value: name});
	}

	return _fType[name];
}

function deepProperty(obj, path){
	for(var i = 0; i < path.length; i++){
		if((obj = obj[path[i]]) == null) return;
	}

	return obj;
}

// Global shared context (share to _init.sf)
let Context = Blackprint.createContext('Discord');

// Expose the fake types and the imported library so it can be accessed or extended by other module
Context.DiscordType = fType;
Context.DiscordLib = DiscordLib;

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};