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
        'z-index: 70;' +
        'position: fixed;' +
        'bottom: 75px;' +
        'left: 220px;' +
        'width: 600px;' +
        'height: 52px;' +
        'box-sizing: border-box;' +
        'pointer-events: none;' +
    '}' +

    '#custom-hotbar #custom-hotbar-directory-controls {' +
        'pointer-events: all;' +
    '}' +

    '#custom-hotbar #custom-hotbar-directory-controls a{' +
        'line-height: 24px;' +
    '}' +
    
    '#custom-hotbar .bar-controls {' +
        'flex: 0 0 32px;' +
        'height: 100%;' +
        'margin: 0 2px;' +
        'text-align: center;' +
        'color: #c9c7b8;' +
        'background: rgba(0, 0, 0, 0.6);' +
        'border: 1px solid #000;' +
        'box-shadow: 0 0 3px #444 inset;' +
        'border-radius: 3px;' +
    '}' +

    '#custom-hotbar .bar-controls a{' +
        'display: block' +
    '}' +
    
    '#hotbar #custom-macro-list {' +
        'flex: 0 0 502px;' +
        'height: 100%;' +
        'list-style: none;' +
        'margin: 0 2px;' +
        'padding: 0;' +
        'border: 1px solid #000;' +
        'border-radius: 3px;' +
    '}' +

    '#hotbar .bar-controls {' +
        'flex: 0 0 32px;' +
        'height: 100%;' +
        'margin: 0 2px;' +
        'text-align: center;' +
        'color: #c9c7b8;' +
        'background: rgba(0, 0, 0, 0.6);' +
        'border: 1px solid #000;' +
        'box-shadow: 0 0 3px #444 inset;' +
        'border-radius: 3px;' +
    '}'
;

var ref = document.querySelector('script');
ref.parentNode.insertBefore(style, ref);