# Phillips Hue & Flic Hub For Raspberry Pi
Tested on Raspbian for Raspberry Pi

## Requirements
- default on raspbian setup

## Running

### First time setup and run:
- Start the Daemon Bluetooth Server by runnnig ```sudo ./flicd -f flic.sqlite3``` in /bin/arm6l
- Start the Node Client by runnnig ```node main.js``` in /clientlib/nodejs

### Todo
- Add a raspberry pi script to restart and launch daemon
- Add voltos to project to manage environment files
- Create a more intuitive experience for pairing buttons and phillips hue lights
- Reorganize and refactor Node.js code

### Restarting the client:
Execute `./start.sh`. 

## Feedback
Be sure to post a Github issue if you find a bug, something you don't like or if something is wrong or should be changed. You can also submit a Pull request if you have a ready improvement.

## Contribute
Help is always welcome.  If you want to help me make this project great say something in the Github issues section.