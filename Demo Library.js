//Roll Obgject

let rollObj = new Roll("d666");
rollObj.roll();

let chatData = {
  type: CONST.CHAT_MESSAGE_TYPES.ROLL,
  roll: rollObj
}

ChatMessage.create(chatData);

//find in array
let skill = player_skills.find(sk => sk.name === name);
let skill = player_skills.find(sk => {return sk.name === name});