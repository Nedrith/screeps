/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleRepairer = require('role.repairer');
module.exports = {
run: function (creep){
//check for switching state
  if(creep.memory.working == true && creep.carry.energy == 0){
    creep.memory.working = false;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
    creep.memory.working = true;
  }
  if(creep.memory.target != undefined && creep.memory.target != creep.room.name)
  {
    //move to target room
    var exit = creep.room.findExitTo(creep.memory.target)
    creep.moveTo(creep.pos.findClosestByRange(exit));
  }
  //transfer
  else if(creep.memory.working == true){
    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (constructionSite != undefined)
    {
      if (creep.build(constructionSite) == ERR_NOT_IN_RANGE){
        creep.moveTo(constructionSite, {maxRooms: 0});

      }
    }
    else
    {
      roleRepairer.run(creep);
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

      if(creep.withdraw(storage,RESOURCE_ENERGY,creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE)
      {
        creep.moveTo(storage);
      }
    }
  }

}
};
