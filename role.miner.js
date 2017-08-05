 /*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader')
module.exports = {
run: function (creep){
//check for switching state
      var source = Game.getObjectById(creep.memory.sourcetarget);
//console.log(source);
      var container = Game.getObjectById(creep.memory.containerID);
    //  console.log(creep.memory.containerID);
      creep.memory.containers = container;
      if(container){
      if(creep.pos.x != container.pos.x || creep.pos.y != container.pos.y)
      {
        creep.moveTo(container.pos.x,container.pos.y);
        //console.log('hi');
      }
      else{
        creep.memory.test = source;
        creep.harvest(source);
      }
    }
    //    console.log(creep.memory.sourcetarget);
  //      console.log('hi');
  }

}
