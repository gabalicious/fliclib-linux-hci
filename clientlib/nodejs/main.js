/*
 * This example program connects to already paired Button and register event listeners on button events.
 * Run the newscanwizard.js program to add Button.
 */
const fliclib = require("./fliclibNodeJs");
const GreenButton = require("./green_button_model");
const BlueButton = require("./blue_button_model");
const BlackButton = require("./black_button_model");
const WhiteButton = require("./white_button_model");
const FlicClient = fliclib.FlicClient;
const FlicConnectionChannel = fliclib.FlicConnectionChannel;
const FlicScanner = fliclib.FlicScanner;
const client = new FlicClient("localhost", 5551);

// Register Buttons
const Button = {}
Button['80:e4:da:71:ad:35'] = new BlueButton('blue', '80:e4:da:71:ad:35', 1);
Button['80:e4:da:71:b8:47'] = new GreenButton('green', '80:e4:da:71:b8:47', 2);
Button['80:e4:da:71:8e:37'] = new BlackButton('black', '80:e4:da:71:8e:37', 3);
Button['80:e4:da:71:b4:24'] = new WhiteButton('white', '80:e4:da:71:b4:24', 4);

// Function Listener
function listenToButton(bdAddr) {
	let cc = new FlicConnectionChannel(bdAddr);
	let checkForButtonUp = false;
	client.addConnectionChannel(cc);

	cc.on("buttonUpOrDown", function(clickType, wasQueued, timeDiff) {
		console.log(bdAddr + " " + clickType + " " + (wasQueued ? "wasQueued" : "notQueued") + " " + timeDiff + " seconds ago");
		if (checkForButtonUp) {
			console.log(`Let go of ${Button[bdAddr]} Button`);
			let event = 'holdUp'
			Button[bdAddr].functionRunner(event);
			checkForButtonUp = false;
		}
	});

 	cc.on("buttonSingleOrDoubleClickOrHold", function(clickType, wasQueued, timeDiff) {
 		console.log(Button[bdAddr] + " " + clickType + " " + (wasQueued ? "wasQueued" : "notQueued") + " " + timeDiff + " seconds ago");
 		if (clickType === 'ButtonHold') {
	 		checkForButtonUp = true;
 		}
		let event;

		switch (clickType) {
			case "ButtonSingleClick":
				event = 'single';
				break;
			case "ButtonDoubleClick":
				event = 'double';
				break;
			case "ButtonHold":
				event = 'holdDown';
				break;
			default:
				break;
		}
		Button[bdAddr].functionRunner(event);
 	});
	cc.on("connectionStatusChanged", function(connectionStatus, disconnectReason) {
		console.log(bdAddr + " " + connectionStatus + (connectionStatus == "Disconnected" ? " " + disconnectReason : ""));
	});
}
// From Example
client.once("ready", function() {
	console.log("Connected to daemon!");
	client.getInfo(function(info) {
		info.bdAddrOfVerifiedButtons.forEach(function(bdAddr) {
			listenToButton(bdAddr);
		});
	});
});

client.on("bluetoothControllerStateChange", function(state) {
	console.log("Bluetooth controller state change: " + state);
});

client.on("newVerifiedButton", function(bdAddr) {
	console.log("A new button was added: " + bdAddr);
	listenToButton(bdAddr);
});

client.on("error", function(error) {
	console.log("Daemon connection error: " + error);
});

client.on("close", function(hadError) {
	console.log("Connection to daemon is now closed");
});
