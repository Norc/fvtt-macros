
let newHP = token.data.actorData.data.valueOf(current_hp_actor)+=3;
token.update({"actorData.data.valueOf(current_hp_actor)": newVal});

/*let canvas.tokens.controlled[0].data.actorData.data.attributes.valueOf(current_hp_actor) = canvas.tokens.controlled[0].data.actorData.data.valueOf(current_hp_actor)+=3; */

let newHP = 0;
let macroToken = canvas.tokens.controlled[0];
newHP = macroToken.actor.data.data.attributes.hp.value
newHP +=3;
macroToken  = await macroToken.update({"actor.data.data.attributes.hp.value": newHP});


async function main() {
  let newHP = 0;
  let macroToken = canvas.tokens.controlled[0];
  let macroActor = macroToken.actor;
  newHP = macroActor.data.actorData.data.attributes.hp.value
  newHP +=3;
  await macroActor.update({"attributes.hp.value": newHP});
  }
  main();

    let newHP = 0;
    let macroToken = canvas.tokens.controlled[0];
    let macroActor = macroToken.actor;
    newHP = macroActor.data.actorData.data.attributes.hp.value
    newHP +=3;
    macroActor.update({"attributes.hp.value": newHP});

    let newHP = 0;
    let macroActor = canvas.tokens.controlled[0].actor;
    newHP = macroActor.data.data.attributes.hp.value +=3;
    macroActor.update({"attributes.hp.value": 13});

    canvas.tokens.controlled[0] = await duplicate(canvas.tokens.controlled[0].update({"attributes.hp.value": 13}));

    let macroActor = canvas.tokens.controlled[0].actor;
    await macroActor.update({"data.attributes.hp.value": 13});

    let macroToken = canvas.tokens.controlled[0]
    let macroActor = canvas.tokens.controlled[0].actor;
    newHP = macroActor.data.data.attributes.hp.value +=3;
    macroActor.update({"data.attributes.hp.value": newHP});


     canvas.tokens.controlled[0]
    let macroActor = canvas.tokens.controlled[0].actor;
    newHP = macroActor.data.data.attributes.hp.value +=3;
    macroActor.update({"data.attributes.hp.value": newHP});

    macroToken.update();

    toInt("1")



    for ( let token of canvas.tokens.controlled ) {
        let attHP = html.find('[name="attributes.hp"]')[0].value;
            token.update({"disposition": -1});
            token.update("")
        }


let macroToken = canvas.tokens.controlled[0];
let hp_cur = (macroToken.actor) ? macroToken.actor.data.data.attributes.hp.value : macroToken.actorData.data.attributes.hp.value;
let hp_max = (macroToken.actor) ? macroToken.actor.data.data.attributes.hp.max : macroToken.actorData.data.attributes.hp.max;
console.log(`${hp_cur}`);
console.log(`${hp_max}`);
((hp_cur + 3) > hp_max) ? hp_cur = hp_max : hp_cur = hp_cur +=3;
console.log(hp_cur);
async function main() {
  await macroToken.actor.update({'data.attributes.hp.value': parseInt(hp_cur)});
main();
