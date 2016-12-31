const huejay = require('huejay');
class HueService {
  constructor() {
    this.client = new huejay.Client({
      host:     '192.168.1.151',
      port:     80,               // Optional
      username: 'yP2zgjEBgfJRHpD4p7fPSotKvSXar9AXXnttkM1I', // Optional
      timeout:  15000,            // Optional, timeout in milliseconds (15000 is the default)
    });
    this.colors = [];
    this.clickCount = { 'single': 0, 'double': 0 };
    this.dimDown =   (lightGroup) => {
        let newBrightness;
        this.client.groups.getById(lightGroup || 2)
        .then(group => {
          newBrightness = Math.floor(group.action.attributes.bri - 101.6);
          group.brightness = newBrightness = newBrightness < 0 ? 0 : newBrightness;
          group.transition = 0;
          // new code
          if (this.lastBrightness === 0) {
            this.clickCount.double ++;
            console.log(`clickCount: double: ${this.clickCount.double}`);
            setTimeout( () => {
              this.clickCount.double --;
              console.log(`clickCount: double: ${this.clickCount.double}`);
            }, 1000);
          }

          if (this.clickCount.double === 2) {
            this.turnOff(lightGroup || 2);
          }
          // end new code
          return this.client.groups.save(group);
        })
        .then(group => {
          this.lastBrightness = group.action.attributes.bri;
          console.log(`dimDown - New Brightness: ${newBrightness}`);
        })
        .catch(error => {
          console.log(error.stack);
        });
      }
  }
  turnOn(lightGroup) {
    this.client.groups.getById(lightGroup || 2)
    .then(group => {
      group.on = true;

      return this.client.groups.save(group);
    })
    .then(group => {
      this.lastBrightness = group.action.attributes.bri;
      console.log(`Light Turned On`);
    })
    .catch(error => {
      console.log(error.stack);
    });
  }
  turnOff(lightGroup) {
    this.client.groups.getById(lightGroup || 2)
    .then(group => {
      group.on = false;
      return this.client.groups.save(group);
    })
    .then(group => {
      console.log(`Light Turned Off`);
      this.lastBrightness = group.action.attributes.bri;
    })
    .catch(error => {
      console.log(error.stack);
    });
  }
  dimUp(lightGroup) {
    let newBrightness;
    this.client.groups.getById(lightGroup || 2)
    .then(group => {
      console.log(group.action.attributes.on === false)
      newBrightness = Math.floor(group.action.attributes.bri + 101.6);
      group.brightness = newBrightness = newBrightness > 254 ? 254 : newBrightness;
      group.transition = 0;
      if (group.action.attributes.on === false) {
        group.brightness = 0;
        group.on = true;
      }
      return this.client.groups.save(group);
    })
    .then(group => {
      console.log(`dimUp - New Brightness: ${newBrightness}`);
      this.lastBrightness = group.action.attributes.bri;
    })
    .catch(error => {
      console.log(error.stack);
    });
  }
  toggleOnOff(lightGroup) {
    this.client.groups.getById(lightGroup || 2)
    .then(group => {
      group.on  = !group.action.attributes.on;
        return this.client.groups.save(group);
    })
    .then(group => {
      console.log(`turned off colorloop`);
    })
    .catch(error => {
      console.log(error.stack);
    });
  }
  toggleColorloop(lightGroup) {
      this.client.groups.getById(lightGroup || 2)
      .then(group => {
        group.effect = group.action.attributes.effect === 'none' ? 'colorloop' : 'none' ;
        console.log(group.effect);
        return this.client.groups.save(group);
      })
      .then(group => {
        console.log(`turned on colorloop`);
      })
      .catch(error => {
        console.log(error.stack);
      });
    }
  startColorloopGroup(lightGroup) {
    this.client.groups.getById(lightGroup || 2)
    .then(group => {
      group.effect = 'colorloop';
      return this.client.groups.save(group);
    })
    .then(group => {
      console.log(`turned on colorloop`);
    })
    .catch(error => {
      console.log(error.stack);
    });
  }
  stopColorloopGroup(lightGroup) {
  this.client.groups.getById(lightGroup || 2)
  .then(group => {
    let newHue = group.action.attributes.hue;
    group = group;
    console.log(group);
    group.effect = 'none';
    return this.client.groups.save(group);
  })
  .then(group => {
    console.log(`turned off colorloop`);
  })
  .catch(error => {
    console.log(error.stack);
  });

  }
  alert(lightGroup, seconds) {
  this.client.groups.getById(lightGroup || 2)
  .then(group => {
    let newHue = group.action.attributes.hue;
    group = group;
    console.log(group);
    group.alert = 'select';
    return this.client.groups.save(group);
  })
  .then(group => {
    // console.log(`Alert on group ${lightGroup}`);
  })
  .catch(error => {
    console.log(error.stack);
  });

  }
  changeColor(lightGroup, color) {
  this.client.groups.getById(lightGroup || 2)
  .then(group => {
    group.xy = color[1];
    return this.client.groups.save(group);
  })
  .then(group => {
    console.log(`changed color to ${color[0]}`);
  })
  .catch(error => {
    console.log(error.stack);
  });

  }
}
module.exports = HueService;
