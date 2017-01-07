var CMD   = 8, // bitmask values
    SHIFT = 4,
    ALT   = 2,
    CTRL  = 1;
var Rotation = false;
(function() {
    var modifiers = 0;
    function modifierCode(event) {
        switch (event.keyCode) {
            case 91:
            case 93:
                return CMD;
            case 16:
                return SHIFT;
            case 18:
                modifiers=0;
                return ALT;
            case 17:
                return CTRL;
            default:
                return 0;
        }
    }
    function keydownHandler(event){
        var modifier = modifierCode(event);
        if (modifier !== 0) {
            modifiers = modifiers | modifier; // add to the bitmask "stack"
        } else {
            if((modifiers&ALT)===ALT || (modifiers&(ALT|SHIFT))===(ALT|SHIFT)){
                if (event.keyIdentifier === 'U+0009') {
                    Rotation=true;
                    if((modifiers&(ALT|SHIFT))===(ALT|SHIFT)){
                        safari.self.tab.dispatchMessage("RotateTabs",{Direction:true,Modifiers:modifiers});
                    }
                    else if((modifiers&ALT)===ALT ){
                        safari.self.tab.dispatchMessage("RotateTabs",{Direction:false,Modifiers:modifiers});
                    }
                    event.preventDefault();
                    event.stopPropagation();
                }
            }
        }
    }
    function keyupHandler(event){
        modifiers = modifiers & ~modifierCode(event); // remove from the stack
        if(event.keyCode===18 &&Rotation){
            Rotation=false;
            safari.self.tab.dispatchMessage("ActivateRecent",{Direction:false,Modifiers:modifiers});
        }
    }
    function windowBlurHandler(e){
        modifiers = 0;
    }
    window.addEventListener('keydown', keydownHandler , true);
    window.addEventListener('keyup', keyupHandler, true);
    window.addEventListener('blur', windowBlurHandler,false);
}());
