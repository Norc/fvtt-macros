let hotTest = new Hotbar();
hotTest.content = hotTest.getData();
hotTest.options = {
    id: "norcHotbar",
    template: "templates/hud/customHotbar.html", 
    popOut: false,
    dragDrop: [{ dragSelector: ".macro", dropSelector: "#custom-macro-list" }]
  };
hotTest.ID="custom-hotbar";
hotTest.element = "div#custom-hotbar.flexrow";

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

    '#custom-hotbar .bar-controls span.page-number {' +
        'display: block;' +
        'font-size: 20px;' +
        'line-height: 8px;' +
    '}' +

    '#custom-hotbar .bar-controls a.page-control {' +
        'font-size: 1.5em;' +
        'line-height: 12px;' +
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

    '#custom-hotbar #custom-bar-toggle {' +
        'max-height: 33%;' + 
    '}' +

    '#custom-hotbar-directory-controls {' +
        'max-height: 33%' +
    '}' +

    '#custom-hotbar-directory-controls a#custom-macro-directory {' +
        'display: none;' +
    '}'
;

var ref = document.querySelector('script');
ref.parentNode.insertBefore(style, ref);