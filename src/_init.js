// Let the Blackprint Editor know the source URL where
// the registerNode and registerInterface belongs to
let Blackprint = window.Blackprint.loadScope({
	// You can find the URL on Blackprint menu -> Modules
	// This will also be exported to JSON if this module's nodes is being used
	url: import.meta.url,

	// This will autoload (*.sf.mjs) and (*.sf.css) file for Browser
	// hasInterface: true,

	// This will autoload (*.docs.json) for Browser
	hasDocs: true,
});

let DiscordJS = {};
if(Blackprint.Environment.isNode){
	// ToDo: fix
	DiscordJS = await import('file:'+process.cwd()+'/node_modules/discord.js/src/index.js');
}
else{
	// 1
}

// Fake Type, for browser
let _fType = {};
let fType = function(name){
	if(_fType[name] == null){
		let temp = _fType[name] = class{};
		Object.defineProperty(temp, 'name', {value: name});
	}

	return _fType[name];
}

// Global shared context (share to _init.sf)
let Context = Blackprint.createContext('Discord');

// This is needed to avoid duplicated event listener when using hot reload
// Event listener that registered with same slot will be replaced
Context.EventSlot = {slot: 'my-private-event-slot'};