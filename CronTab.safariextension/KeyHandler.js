var Rotation =    false;
var Modifiers =   0b0000;
var Ctrl =        0b0001,
Alt =             0b0010,
Meta =            0b0100,
Shift =           0b1000;

(function() {
   function update_Modifiers (event) {
      Modifiers = 
      ((event.getModifierState('Control') | event.ctrlKey) ?   Ctrl :   0)|
      ((event.getModifierState('Alt') | event.altKey) ?        Alt :    0)|
      ((event.getModifierState('Meta') | event.metaKey) ?      Meta :   0)|
      ((event.getModifierState('Shift') | event.shiftKey) ?    Shift :  0);
      console.log(Number(Modifiers).toString(2));
   }
   function handle_key_down (event) {
      update_Modifiers(event);
      if(event.key === 'Tab') {
         if (Modifiers === Alt) {
            Rotation = true;
            if (safari.self.tab) {
               safari.self.tab.dispatchMessage (
                  "RotateTabs", {Direction: false}
               );
            } else if (safari.extension) {
               safari.extension.globalPage.contentWindow.intercept_message({
                  name: "RotateTabs",
                  message: {
                    Direction: false
                  }
               });
            }
            event.preventDefault();
            event.stopPropagation();
         }
      } else if (event.key === '`') {
         if (Modifiers === Alt) {
            Rotation = true;
            if (safari.self.tab) {
               safari.self.tab.dispatchMessage (
                  "RotateTabs", {Direction: true}
               );
            } else if (safari.extension) {
               safari.extension.globalPage.contentWindow.intercept_message({
                  name: "RotateTabs",
                  message: {
                    Direction: true
                  }
               });
            }
            event.preventDefault();
            event.stopPropagation();
         }
      }
   }
   function handle_key_up (event) {
      update_Modifiers(event);
      if (event.key === 'Alt' && Rotation) {
         Rotation = false;
         if (safari.self.tab) {
            safari.self.tab.dispatchMessage("ActivateRecent",
                {Direction: false}
            );
         } else if (safari.extension) {
            safari.extension.globalPage.contentWindow.intercept_message({
               name: "ActivateRecent",
               message: {
                 Direction: false
               }
            });
         }
      }
   }
   function handle_window_blur (e) {
      Modifiers = 0;
   }
   function handle_message (e) {
      if (e.name === 'Modifiers') {
         
      }
   }
   window.addEventListener('keydown', handle_key_down , true);
   window.addEventListener('keyup', handle_key_up, true);
   window.addEventListener('blur', handle_window_blur, false);
   safari.self.addEventListener('message', handle_message, false);
}());
