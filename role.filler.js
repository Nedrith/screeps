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
    creep.memory.test = structure;
    if(structure != null && structure != undefined)
    {
    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE  || Math.abs(structure.pos.x - creep.pos.x) > 2 || Math.abs(structure.pos.y - creep.pos.y) > 2){
      creep.moveTo(structure);

    }
    }
    else{

     if(creep.memory.controllerContianer != undefined  || creep.memory.controllerContainer == null)
    {
    let controller = creep.room.controller;
    var temp2 = creep.room.lookForAtArea(LOOK_STRUCTURES, controller.pos.y-2,controller.pos.x-2,controller.pos.y+2,controller.pos.x+2,true);
    for (let i in temp2){
      var check = temp2[i];
      if(check.structure.structureType == 'container'){
        creep.memory.controllerContainer = check.structure.id;
      }
    }
  }
    else
    {
      let structure = Game.getObjectById(creep.memory.controllerContainer);
      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(structure);
    }
  }
}
}
//creep needs filled with energy
  else{
    var target = creep.room.storage;
    if (creep.withdraw(target,RESOURCE_ENERGY,creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE)
      creep.moveTo(target);

  }
  }

}
