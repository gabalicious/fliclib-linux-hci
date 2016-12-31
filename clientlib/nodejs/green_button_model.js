const HueService = require('./hue-service');
class GreenButton {
  constructor(name, address, lightGroup) {
    this.name = name;
    this.address = address;
    this.hueService = new HueService();
    this.lightGroup = lightGroup;
  //   this.actionGroup = new Object([
  //     'irService',
  //     'tvVolume',
  //     'windowsBlinds',
  //     'ac',
  //     'colorCycle',
  //     'dim'
  // ]); //new actionGroupService();
  this.currentColor = null;
  this.colors = [
      ['Antique White', [0.3548,0.3489]],
      ['Aqua', [0.1607,0.3423]],
      ['Dodger Blue', [0.1559,0.1599]],
      ['Blue', [0.153,0.048]],
      ['Blue Violet', [0.251,0.1056]],
      ['Dark Violet', [0.2824,0.1104]],
      ['Deep Pink', [0.5445,0.2369]],
      ['Firebrick', [0.6621,0.3023]],
      ['Crimson', [0.6508,0.2881]],
      ['Brown', [0.6399,0.3041]],
      ['Orange Red', [0.6731,0.3222]],
      ['Dark Red', [0.692,0.308]]
    ];
  }
  single() {
    this.hueService.dimUp(this.lightGroup);
  }
  double() {

    this.hueService.dimDown(this.lightGroup);

  }
  holdDown() {
    this.hueService.toggleColorloop(this.lightGroup);
  }
  holdUp() {
    // this.hueService.stopColorloopGroup();
  }
  functionRunner(event) {
    if(typeof this[event] === "function" ){
      this[event]();
    }
    else {
      console.log(`Class is missing ${event} function`)
    }
  }
}
module.exports = GreenButton;
