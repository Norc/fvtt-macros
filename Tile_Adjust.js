//Simple macro to loop through ALL SELECTED TILES and adjust their position by a set amount
async function adjustTileXY(tile, xAdjust, yAdjust ) {
    await tile.update({
        x: tile.x + xAdjust,
        y: tile.y + yAdjust,
    });
}

//check to make sure at least one tile is selected
if (canvas.tiles.controlled[0]) {
    //loop through all selected tiles
    for (let t of canvas.tiles.controlled) {
        //REPLACE THE "1" VALUES BELOW AS NEEDED
            //The first number controls side-to-side position:
                //Positive values move tiles to the right
                //Negative values move tiles to the left
                //If you enter 0, tiles will not move side to side at all.
            //The second number controls up-and-down position:
                //Positive values move tiles down
                //Negative values move tiles up
                //If you enter 0, tiles will not move up or down at all.
        adjustTileXY(t, 1, 1);
    }
} else {
    ui.notifications.notify("Please select at least one tile.");
}



//Simple macro to loop through ALL SELECTED TILES and toggle their locked status.
//In other words:
    //If an individual tile is unlocked, this macro will lock it.
    //If an individual tile is locked, this macro will unlock it.
//Bonus function to lock or unlock all tiles instead also included.

async function toggleTileLock(tile) {
    await tile.update({locked: !tile.data.locked});
    }

async function setTileLock(tile, trueOrFalse) {
    await tile.update({locked: trueOrFalse});
}

//check to make sure at least one tile is selected
if (canvas.tiles.controlled[0]) {
    //loop through all selected tiles
    for (let t of canvas.tiles.controlled) {
        await toggleTileLock(t);
        //lock all tiles instead
        //await setTileLock(t,true);
        //unlock all tiles instead
        //await setTileLock(t,false); 
    }
} else {
    ui.notifications.notify("Please select at least one tile.");
}




//Simple macro to loop through ALL SELECTED TILES and toggle their visibility.
//In other words:
    //If an individual tile is visible, this macro will hide it.
    //If an individual tile is hidden, this macro will make it visible.
//Bonus function to hide or unhide tiles instead also included.

async function toggleTileVisibility(tile) {
    console.log(tile.data.hidden);
    console.log(!tile.data.hidden);
    await tile.update({hidden: !tile.data.hidden});
    }

async function setTileHidden(tile, trueOrFalse) {
    await tile.update({hidden: trueOrFalse});
}

//check to make sure at least one tile is selected
if (canvas.tiles.controlled[0]) {
    //loop through all selected tiles
    for (let t of canvas.tiles.controlled) {
        await toggleTileVisibility(t);
        //hide all selected tiles instead
        //await setTileHidden(t,true);
        //show all selected tiles instead
        //await setTileHidden(t,false);
    }
} else {
    ui.notifications.notify("Please select at least one tile.");
}