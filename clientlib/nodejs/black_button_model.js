const HueService = require('./hue-service');
class BlackButton {
  constructor(name, address, lightGroup) {
    this.name = name;
    this.address = address;
    this.hueService = new HueService();
    this.lightGroup = lightGroup;
  }
  single() {
    this.hueService.dimUp(this.lightGroup);
  }
  double() {
    this.hueService.dimDown(this.lightGroup);
  }
  holdDown() {
    this.lightGroup++;
    if (this.lightGroup > 4) {
      this.lightGroup = 1
    }
    this.hueService.alert(this.lightGroup);
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
module.exports = BlackButton;
