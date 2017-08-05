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
  if(creep.memory.working == true && creep.carry.energy == 0){
    creep.memory.working = false;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
    creep.memory.working = true;
  }
  //transfer
  if(creep.memory.working == true){
    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => s.energy < s.energyCapacity
    });

    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
      creep.moveTo(structure,{maxRooms: 0});

    }
    else if (structure == null)
    {
      roleUpgrader.run(creep);
    }

  }
  else{
      var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE && creep.room.energyAvailable != creep.room.energyCapacityAvailable)
      {
        creep.moveTo(source, {maxRooms:0});
      }
      if(creep.room.energyCapacityAvailable == creep.room.energyAvailable)
      {
        roleUpgrader.run(creep);
      }
  }

}
};
