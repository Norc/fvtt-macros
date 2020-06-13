class CustomHotbar extends Hotbar {
    //copied from foundy.js line 21117 on 20200611
	constructor(options) {
        super(options);
        game.macros.apps.push(this);
      /**
       * The currently viewed macro page
       * @type {number}
       */
      this.page = 1;
      /**
       * The currently displayed set of macros
       * @type {Array}
       */
      this.macros = [];
      /**
       * Track collapsed state
       * @type {boolean}
       */
      this._collapsed = false;
      /**
       * Track which hotbar slot is the current hover target, if any
       * @type {number|null}
       */
      this._hover = null;
    }
  
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "custom-hotbar",
      template: "templates/hud/CustomHotbar.html",
      popOut: false,
      dragDrop: [{ dragSelector: ".macro", dropSelector: "#custom-macro-list" }]
    });
  }    

  
	/* -------------------------------------------- */

  /** @override */
 
  getData(options) {
    this.macros = this._getCustomMacrosByPage(this.page);
  return {
    page: this.page,
    macros: this.macros,
    barClass: this._collapsed ? "collapsed" : ""
  };
}

  /* -------------------------------------------- */

/**
 * Get the Array of Macro (or null) values that should be displayed on a numbered page of the custom hotbar
 * @param {number} page
 * @returns {Array}
 * @private
 */

 _getCustomMacrosByPage(page) { 
  const macros = this.getCustomHotbarMacros(page);
  for ( let [i, m] of macros.entries() ) {
    m.key = i<9 ? i+1 : 0;
    m.cssClass = m.macro ? "active" : "inactive";
    m.icon = m.macro ? m.macro.data.img : null;
  }
  return macros;
}

	/* -------------------------------------------- */

  /**
   * Get an Array of Macro Entities on this User's Hotbar by page
   * @param {number} page     The hotbar page number
   * @return {Array.<Object>}
   */
  getCustomHotbarMacros(page=1) {
    const macros = new Array(10).fill(null);
    const start = (page-1) * 10;
    return macros.slice(start, start+10).map((m, i) => {
      return {
        slot: start + i + 1,
        macro: m ? game.macros.get(m) : null
      };
    });
  }

	/* -------------------------------------------- */

  /**
   * Assign a Macro to a numbered custom hotbar slot between 1 and 10
   * eventually expand this to a full 50 later maybe
   * @param {Macro|null} macro  The Macro entity to assign
   * @param {number} slot       The integer Hotbar slot to fill
   * @param {number} [fromSlot] An optional origin slot from which the Macro is being shifted
   * @return {Promise}          A Promise which resolves once the User update is complete
   */
  async assignCustomHotbarMacro(macro, slot, {fromSlot=null}={}) {
    if ( !(macro instanceof Macro) && (macro !== null) ) throw new Error("Invalid Macro provided");
    const myCustomHotbar = this;

    // If a slot was not provided, get the first available slot
    slot = slot ? parseInt(slot) : Array.fromRange(10).find(i => !(i in myCustomHotbar));
    if ( !slot ) throw new Error("No available Hotbar slot exists");
    if ( slot < 1 || slot > 10 ) throw new Error("Invalid Hotbar slot requested");

    // Update the hotbar data
    const update = duplicate(myCustomHotbar);
    if ( macro ) update[slot] = macro.id;
    else {
      delete update[slot];
      update[`-=${slot}`] = null;
    }
    if ( fromSlot && (fromSlot in myCustomHotbar) ) {
      delete update[fromSlot];
      update[`-=${fromSlot}`] = null;
    }
    return update;
  };

        /* -------------------------------------------- */
  /**
   * Collapse the myCustomHotbar, minimizing its display.
   * @return {Promise}    A promise which resolves once the collapse animation completes
   */
  async collapse() {
    if ( this._collapsed ) return true;
    const toggle = this.element.find("#custom-bar-toggle");
    const icon = toggle.children("i");
    const bar = this.element.find("#custom-action-bar");
    return new Promise(resolve => {
      bar.slideUp(200, () => {
        bar.addClass("collapsed");
        icon.removeClass("fa-caret-down").addClass("fa-caret-up");
        this._collapsed = true;
        resolve(true);
      });
    });
  }
  
 	/* -------------------------------------------- */
  /**
   * Expand the CustomHotbar, displaying it normally.
   * @return {Promise}    A promise which resolves once the expand animation completes
   */
  expand() {
    if ( !this._collapsed ) return true;
    const toggle = this.element.find("#custom-bar-toggle");
    const icon = toggle.children("i");
    const bar = this.element.find("#custom-action-bar");
    return new Promise(resolve => {
      bar.slideDown(200, () => {
        bar.css("display", "");
        bar.removeClass("collapsed");
        icon.removeClass("fa-caret-up").addClass("fa-caret-down");
        this._collapsed = false;
        resolve(true);
      });
    });
  } 

  /* -------------------------------------------- */

  /**
   * Create a Context Menu attached to each Macro button
   * @param html
   * @private
   */
  _contextMenu(html) {
    new ContextMenu(html, ".macro", [
      {
        name: "Edit",
        icon: '<i class="fas fa-edit"></i>',
        condition: li => {
          const macro = game.macros.get(li.data("macro-id"));
          return macro ? macro.owner : false;
        },
        callback: li => {
          const macro = game.macros.get(li.data("macro-id"));
          macro.sheet.render(true);
        }
      },
      {
        name: "Remove",
        icon: '<i class="fas fa-times"></i>',
        callback: li => {
          ui.CustomHotbar = this.assignCustomHotbarMacro(null, li.data("slot"));
        }
      },
      {
        name: "Delete",
        icon: '<i class="fas fa-trash"></i>',
        condition: li => {
          const macro = game.macros.get(li.data("macro-id"));
          return macro ? macro.owner : false;
        },
        callback: li => {
          const macro = game.macros.get(li.data("macro-id"));
          Dialog.confirm({
            title: `${game.i18n.localize("MACRO.Delete")} ${macro.name}`,
            content: game.i18n.localize("MACRO.DeleteConfirm"),
            yes: macro.delete.bind(macro)
          });
        }
      },
    ]);
  }

  	/* -------------------------------------------- */
  /*  Event Listeners and Handlers
	/* -------------------------------------------- */
  /** @override */
  activateListeners(html) {
    super.activateListeners(html);
    // Macro actions
    html.find('#custom-bar-toggle').click(this._onToggleBar.bind(this));
    //html.find("#custom-macro-directory").click(ev => ui.macros.renderPopout(true));
    //    Disable pages for now, will just work with first page.
    //    html.find(".page-control").click(this._onClickPageControl.bind(this));
    // Activate context menu
//    ui.CustomHotbar._contextMenu(html);
  }

  /** @override */
  async _onDrop(event) {
    event.preventDefault();

    // Try to extract the data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    }
    catch (err) { return }

    // Get the drop target
    const li = event.target.closest(".macro");

    // Allow for a Hook function to handle the event
    if ( Hooks.call("hotbarDrop", this, data, li.dataset.slot) === false ) return;

    // Only handle Macro drops
    const macro = await this._getDropMacro(data);
    if ( macro ) ui.CustomHotbar = await this.assignCustomHotbarMacro(macro, li.dataset.slot, {fromSlot: data.slot});
  }

  /* -------------------------------------------- */

  /**
   * Handle left-click events to
   * @param event
   * @private
   */
  async _onClickMacro(event) {
    event.preventDefault();
    const li = event.currentTarget;

    // Case 1 - create a new Macro
    if ( li.classList.contains("inactive") ) {
      const macro = await Macro.create({name: "New Macro", type: "chat", scope: "global"});
      ui.CustomHotbar = await this.assignCustomHotbarMacro(macro, li.dataset.slot);
      macro.sheet.render(true);
    }

    // Case 2 - trigger a Macro
    else {
      const macro = game.macros.get(li.dataset.macroId);
      return macro.execute();
    }
  }

}

  /* -------------------------------------------- */

  /**
   * Handle number key presses
   * @param {Event} event       The original digit key press
   * @param {boolean} up        Is it a keyup?
   * @param {Object}modifiers   What modifiers affect the keypress?
   * @private
   */
/*
   _onDigit(event, up, modifiers) {
    if ( modifiers.hasFocus || up ) return;
    const num = parseInt(event.key);
//??     If (modifiers.key is not Shift) {
    const slot = ui.hotbar.macros.find(m => m.key === num);
//??     } else {    
//??     const slot = ui.CustomHotbar.macros.find(m => m.key === num);
//??     }
    if ( slot.macro ) slot.macro.execute();
    this._handled.add(modifiers.key);
  }
*/

  /* -------------------------------------------- */

  /**
   * Handle DELETE Keypress Events
   * @param {KeyboardEvent} event     The originating keyboard event
   * @param {boolean} up              Is the key being released?
   * @param {Object} modifiers        The identified modifiers attached to this keypress
   * @private
   */
 /*
   _onDelete(event, up, modifiers) {
    if ( this.hasFocus ) return;
    event.preventDefault();

    // Remove hotbar Macro
    if ( ui.hotbar._hover ) this.assignHotbarMacro(null, ui.hotbar._hover);
//??    if ( ui.CustomHotbar._hover ) this.assignCustomHotbarMacro(null, ui.CustomHotbar._hover);

    // Delete placeables from Canvas layer
    else if ( canvas.ready && ( canvas.activeLayer instanceof PlaceablesLayer ) ) {
      return canvas.activeLayer._onDeleteKey(event);
    }
  }
*/  

  /**
   * Event handler for the drop portion of a drag-and-drop event.
   * @private
   */

   /*
   _onDrop(event) {
    event.preventDefault();

    // Try to extract the data
    let data;
    try {
      data = JSON.parse(event.dataTransfer.getData('text/plain'));
    }
    catch (err) {
      return false;
    }

    // Acquire the cursor position transformed to Canvas coordinates
    const [x, y] = [event.clientX, event.clientY];
    const t = this.stage.worldTransform;
    data.x = (x - t.tx) / canvas.stage.scale.x;
    data.y = (y - t.ty) / canvas.stage.scale.y;

    // Dropped Actor
    if ( data.type === "Actor" ) canvas.tokens._onDropActorData(event, data);
    
    // Dropped Journal Entry
    else if ( data.type === "JournalEntry" ) canvas.notes._onDropData(event, data);

    // Dropped Macro (clear slot)
    else if ( data.type === "Macro" ) {
//??      game.user.assignHotbarMacro(null, data.slot);
    }

    // Dropped Tile artwork
    else if ( data.type === "Tile" ) {
      return canvas.tiles._onDropTileData(event, data);
    }
  }
*/

let hotTest = new CustomHotbar();
hotTest.content = hotTest.getData();
let obj = {
    left: 100,
    top: 100,
    width: 502,
    height: 52,
    scale: 1.0,
    log: true,
    renderContext: "Norc",
    renderData: "manual"
};
await hotTest.render(true, obj);
ui.CustomHotbar = hotTest;


var style = document.createElement('style');
style.innerHTML = 
    '#custom-hotbar {' +
        'z-index: 69;' +
        'position: fixed;' +
        'bottom: 63px;' +
        'left: 220px;' +
        'width: 600px;' +
        'height: 52px;' +
        'box-sizing: border-box;' +
    '}' +

    '#custom-hotbar #custom-hotbar-directory-controls {' +
        'pointer-events: all;' +
    '}' +

    '#custom-hotbar #custom-action-bar {' +
    'pointer-events: all;' +
'}' +
    
    '#custom-hotbar .bar-controls {' +
        'flex: 0 0 32px;' +
        'height: 100%;' +
        'margin: 0 2px;' +
        'text-align: center;' +
        'color: #c9c7b8;' +
        'background: rgba(0, 0, 200, 0.6);' +
        'border: 1px solid #0000ff;' +
        'box-shadow: 0 0 3px #444 inset;' +
        'border-radius: 3px;' +
    '}' +

    '#custom-hotbar .bar-controls a{' +
        'display: block' +
    '}' +
    
    '#custom-hotbar #custom-macro-list {' +
        'flex: 0 0 502px;' +
        'height: 100%;' +
        'list-style: none;' +
        'margin: 0 2px;' +
        'padding: 0;' +
        'border: 1px solid #0000ff;' +
        'border-radius: 3px;' +
    '}' +

    '#custom-hotbar .bar-controls {' +
        'flex: 0 0 32px;' +
        'height: 100%;' +
        'margin: 0 2px;' +
        'text-align: center;' +
        'color: #c9c7b8;' +
        'background: rgba(0, 0, 200, 0.5);' +
        'border: 1px solid #0000ff;' +
        'box-shadow: 0 0 3px #444 inset;' +
        'border-radius: 3px;' +
    '}' +

    '#custom-hotbar .macro {' +
        'position: relative;' +
        'flex: 0 0 50px;' +
        'height: 50px;' +
        'border: 1px solid #0000ff;' +
        'border-radius: 3px;' +
        'background: rgba(0, 0, 200, 0.5);' +
        'box-shadow: 0 0 5px #000 inset;' +
        'cursor: pointer;' +
    '}' +

    '#hotbar .macro .macro-icon {' +
        'width: 48px;' +
        'height: 48px;' +
        'object-fit: cover;' +
        'object-position: 50% 50%;' +
        'border: none;' +
    '}' +

    '#custom-hotbar .macro .macro-key {' +
        'position: absolute;' +
        'top: 2px;' +
        'right: 2px;' +
        'padding: 1px 3px;' +
        'background: #111;' +
        'color: #f0f0e0;' +
        'font-weight: bold;' +
    '}' +

    '#custom-hotbar img {' +
        'box-sizing: border-box;' +
        'border-radius: px;' +
        'max-width: 100%;' +
    '}' +

    '#custom-hotbar .macro.inactive {' +
        'box-shadow: 0 0 5px #444 inset;' +
    '}' +
    
    '#custom-hotbar .macro:hover {' +
        'box-shadow: 0 0 10px #ff6400 inset;' +
    '}' +
    
    '#custom-hotbar .macro.active:hover {' +
        'border: 1px solid white;' +
    '}' +

    '#custom-hotbar .macro.inactive:hover {' +
        'border: 1px solid gray;' +
    '}' +

    '#custom-hotbar .macro .tooltip {' +
        'display: block;' +
        'min-width: 148px;' +
        'height: 26px;' +
        'padding: 2px 4px;' +
        'position: absolute;' +
        'top: -32px;' +
        'left: -50px;' +
        'background: rgba(0, 0, 0, 0.9);' +
        'border: 1px solid #191813;' +
        'border-radius: 3px;' +
        'color: #f0f0e0;' +
        'line-height: 22px;' +
        'text-align: center;' +
        'white-space: nowrap;' +
        'word-break: break-all;' +
    '}' +

    '#custom-hotbar #custom-hotbar-directory-controls {' +
        'pointer-events: all;' +
    '}' +

    '#custom-hotbar-directory-controls a#custom-macro-directory {' +
        'display: none;' +
    '}' + 

    '#custom-hotbar-directory-controls {' +
        'max-height: 33%' +
    '}' +


    //Disable macro directory (unnecessary) and page controls (for now)
    '#custom-hotbar-directory-controls a#custom-macro-directory {' +
        'display: none;' +
    '}' +

    '#custom-hotbar-page-controls {' +
        'display: none;' +
    '}'
  
/*  Disabled for initial release
    '#custom-hotbar .bar-controls a.page-control {' +
        'font-size: 1.5em;' +
        'line-height: 12px;' +
    '}' +

    '#custom-hotbar .bar-controls span.page-number {' +
        'display: block;' +
        'font-size: 20px;' +
        'line-height: 8px;' +
    '}'
*/

;

var ref = document.querySelector('script');
ref.parentNode.insertBefore(style, ref);