//
//  ViewController.swift
//  CronTab
//
//  Created by Gowtham Kudupudi on 23/09/17.
//  Copyright © 2017 ferryfair. All rights reserved.
//

import Cocoa
import SafariServices

class ViewController: NSViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
        print("Main Bundle ID: \(Bundle.main.bundleIdentifier)")
        for bundle in Bundle.allBundles {
            print("Bundle id: \(bundle.bundleIdentifier)")
        }
        SFSafariExtensionManager.getStateOfSafariExtension(withIdentifier: "com.ferryfair.CronTab.ECronTab") { (state, error) in
            if error != nil {
                print("Error determining the state of extension: %@", error!);
                return;
            }
            
            if state!.isEnabled {
                // The extension is already on.
            } else {
                // Provide instructions to users on how to turn on your extension in Safari.
                SFSafariApplication.showPreferencesForExtension(withIdentifier: "com.ferryfair.CronTab.ECronTab") { (error) in
                    if error != nil {
                        print("Error launching the extension's preferences: %@", error);
                        return;
                    }
                }
            }
        }
    }

    override var representedObject: Any? {
        didSet {
        // Update the view, if already loaded.
        }
    }


}

