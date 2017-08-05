/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (creep){
//check for switching state
  if(creep.memory.working == true && creep.carry.energy == 0){
    creep.memory.working = false;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
    creep.memory.working = true;
  }
  //transfer
  if(creep.memory.working == true){
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
      creep.moveTo(creep.room.controller, {maxRooms: 0});

    }
  }
  else{
    var storage = creep.room.storage;
    if(storage == undefined){
      var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE){
        creep.moveTo(source, {maxRooms: 0});
      }
    }
    else{
      if(creep.withdraw(storage,RESOURCE_ENERGY,creep.carryCapacity) == ERR_NOT_IN_RANGE)
      {
        creep.moveTo(storage);
      }
    }
  }

}
};
