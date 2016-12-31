function MyFlicButton(name, address) {
  this.name = name;
  this.address = address;
  this.single = function() {
    console.log(`${this.name} single - (${this.address})`);
  };
  this.double = function() {
    console.log(`${this.name} double - (${this.address})`);
  };
  this.holdDown = function() {
    console.log(`${this.name} Hold - (${this.address})`);
  };
  this.holdUp = function() {
    console.log(`${this.name} ButtonUp - (${this.address})`);
  };
  this.functionRunner = function(event) {
    if( typeof this[event] === "function" ){
      this[event]();
    }
    else {
      console.log(this[event], event)
    }
  };
}

module.exports = MyFlicButton;
