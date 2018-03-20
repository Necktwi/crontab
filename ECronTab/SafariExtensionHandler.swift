//
//  SafariExtensionHandler.swift
//  ECronTab
//
//  Created by Gowtham Kudupudi on 23/09/17.
//  Copyright © 2017 ferryfair. All rights reserved.
//

import SafariServices

class SafariExtensionHandler: SFSafariExtensionHandler {
    
    override func messageReceived(withName messageName: String, from page: SFSafariPage, userInfo: [String : Any]?) {
        // This method will be called when a content script provided by your extension calls safari.extension.dispatchMessage("message").
        page.getPropertiesWithCompletionHandler { properties in
            NSLog("The extension received a message (\(messageName)) from a script injected into (\(String(describing: properties?.url))) with userInfo (\(userInfo ?? [:]))")
        }
/*
        if(TabStack.length===0){
            addTabsToStack();
        }
        if(e.name==="RotateTabs"){
            RotateTabs=true;
            setTimeout(showPopover, window.PopoverDelay);
            TabsDiv.children[CurrentIndex].classList.remove('active');
            if(e.message.Direction===false){
                CurrentIndex++;
                CurrentIndex%=TabsDiv.children.length;
            }
            else{
                CurrentIndex--;
                if(CurrentIndex<0)CurrentIndex+=TabsDiv.children.length;
            }
            
            TabsDiv.children[CurrentIndex].classList.add('active');
            ScrollEasyIntoView(TabsDiv.children[CurrentIndex]);
        }
        else if(e.name==="ActivateRecent"){
            RotateTabs=false;
            TabsPopOver.hide();
            if(CurrentIndex<0){
                CurrentIndex = -CurrentIndex;
                CurrentIndex %= TabStack.length;
            }
            else {
                CurrentIndex %= TabStack.length;
                CurrentIndex = TabStack.length - CurrentIndex-1;
            }
            var CurrentTab=TabStack[CurrentIndex];
            TabStack.splice(CurrentIndex,1);
            TabStack.push(CurrentTab);
            var tabDiv = TabsDiv.removeChild(TabsDiv.children[TabStack.length-CurrentIndex-1]);
            TabsDiv.insertAdjacentElement('afterbegin',tabDiv);
            TabStack[TabStack.length-1].browserWindow.activate();
            TabStack[TabStack.length-1].activate();
            CurrentIndex=0;
        }
 */
    }
    
    override func toolbarItemClicked(in window: SFSafariWindow) {
        // This method will be called when your toolbar item is clicked.
        NSLog("The extension's toolbar item was clicked \(Bundle.main.bundleIdentifier)")
    }
    
    override func validateToolbarItem(in window: SFSafariWindow, validationHandler: @escaping ((Bool, String) -> Void)) {
        // This is called when Safari's state changed in some way that would require the extension's toolbar item to be validated again.
        validationHandler(true, "")
    }
    
    override func popoverViewController() -> SFSafariExtensionViewController {
        return SafariExtensionViewController.shared
    }

}
