let sneakIconPath = 'icons/svg/cowled.svg';
let toggleResult = false;
let enabled = false;
let errorReason = '';
let sneakAttack = {};
let rogue = {};
let rogueLvls = 0;
let sneakDice = 0;
let chatMsg = '';
let oldMDmg = '';
let oldRDmg = '';

let macroActor = actor;
let macroToken = token;

const sneakAttackFeatureName = 'Sneak Attack';
const rogueClassName = 'Rogue';

//check to ensure token is selected and attempt to define the sneak attack feature
if (macroActor !== null && macroActor !== undefined) {
	sneakAttack = macroActor.items.find(i => i.name == `${sneakAttackFeatureName}`);
} else {
errorReason = 'Please select a token';
}

//check to ensure token is a rogue
if (errorReason == '' && macroActor.items.find(i => i.name == `${rogueClassName}`) !== undefined) {
	rogue = macroActor.items.find(i => i.name == `${rogueClassName}`);
} else {
	errorReason = 'Please select a single rogue token.';
}

console.log(`Error reason is: ${errorReason}`);
//main execution now that errors are caught

if (errorReason == '') {
	
	chatMsg = '';
	let enabled = false;
	// store the state of the sneak attack toggle in flags
	if (macroActor.data.flags.sneakMacro !== null && macroActor.data.flags.sneakMacro !== undefined) {
		enabled = true;
	}
	
	// if sneak attack is active, disable it
	if (enabled) {
		chatMsg = `${macroActor.name} is no longer sneak attacking.`;
		// ranged and melee weapon attack bonus
		let obj = {};
		obj['flags.sneakMacro'] = null;		
		obj['data.bonuses.mwak.damage'] = macroActor.data.flags.sneakMacro.oldMDmg;			
		obj['data.bonuses.rwak.damage'] = macroActor.data.flags.sneakMacro.oldRDmg;	
		macroActor.update(obj);
		
	// if sneak attack is disabled, enable it
	} else {		
		chatMsg = `${macroActor.name} starts sneak attacking!`;
		
		let obj = {};
		obj['flags.sneakMacro.enabled'] = true;

		// Preserve old mwak damage bonus if there was one
		let oldMDmg = macroActor.data.data.bonuses.mwak.damage;
		if (oldMDmg==null || oldMDmg == undefined || oldMDmg == '') oldMDmg = 0;
		obj['flags.sneakMacro.oldMDmg'] = JSON.parse(JSON.stringify(oldMDmg));

		// Preserve old rwak damage bonus if there was one
		let oldRDmg = macroActor.data.data.bonuses.rwak.damage;
		if (oldRDmg==null || oldRDmg == undefined || oldRDmg == '') oldRDmg = 0;
		obj['flags.sneakMacro.oldRDmg'] = JSON.parse(JSON.stringify(oldRDmg));

		
		// Determining the rogue level
		rogueLvls = rogue.data.data.levels;

		// Formula to determine the sneak attack damage depending on rogue level	
		sneakDice = Math.ceil(rogueLvls/2);
	
		//actually add the bonus sneak attack damage to the previous bonus damage
		//respect roll formulas if present.
		if (oldMDmg==null || oldMDmg == undefined || oldMDmg == '' || oldMDmg == 0) {
			obj['data.bonuses.mwak.damage'] = `${sneakDice}d6`;
		} else {
			obj['data.bonuses.mwak.damage'] = `${oldMDmg} + ${sneakDice}d6`;
		}

		if (oldRDmg==null || oldRDmg == undefined || oldRDmg == '' || oldRDmg == 0) {
			obj['data.bonuses.rwak.damage'] = `${sneakDice}d6`;
		} else {
			obj['data.bonuses.rwak.damage'] = `${oldRDmg} + ${sneakDice}d6`;
		}	

		macroActor.update(obj);

	}	
	
	// toggle Sneaky icon, if Sneaky path is defined above
	(async () => { 
		toggleResult = await macroToken.toggleEffect(sneakIconPath);
		if (toggleResult == enabled) macroToken.toggleEffect(sneakIconPath);  
	})();

	//mark or unmark character's token with Sneaky effect icon
	(async () => { 
		toggleResult = await macroToken.toggleEffect(sneakIconPath);
		if (toggleResult == enabled) macroToken.toggleEffect(sneakIconPath);  
	})();

	//toggle macro icon and name, if enabled
	let sneakyMacroImgPath = 'systems/dnd5e/icons/skills/shadow_17.jpg';
	let stopSneakyMacroImgPath = 'systems/dnd5e/icons/skills/yellow_11.jpg';
	let sneakMacroName = 'Sneak Attack';
	let sneakMacro = game.macros.getName(sneakMacroName);
		//Also check for name of macro in its "off" form
		if (sneakMacro == null || sneakMacro == undefined) {
			sneakMacro = game.macros.getName('Stop ' + sneakMacroName);
		}
	let obj = {};
	if ( (sneakMacro !== null && sneakMacro !== undefined) && 
			+ (stopSneakyMacroImgPath !== null && stopSneakyMacroImgPath !== undefined && stopSneakyMacroImgPath !== '') ) {
		if (enabled) {
		  obj['img'] = sneakyMacroImgPath;
		  obj['name'] = sneakMacroName;
		} else {
		  obj['img'] = stopSneakyMacroImgPath;
		  obj['name'] = 'Stop ' + sneakMacroName;
		}
		sneakMacro.update(obj);
	} else {
	ui.notifications.warn("Sneak Attack macro named " + `${sneakMacroName}` + " not found. Sneak toggle successful but unable to toggle macro icon.");
		
	}

} else {
ui.notifications.error(`${errorReason}`);	
}
if (chatMsg !== '') {
	let chatData = {
		user: game.user._id,
		speaker: ChatMessage.getSpeaker(),
		content: chatMsg
	};
	ChatMessage.create(chatData, {});
}