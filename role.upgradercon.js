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
      creep.moveTo(creep.room.controller);

    }
  }
  else{
    if(creep.memory.controllerContianer != undefined || creep.memory.controllerContainer == null)
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
     if (creep.withdraw(structure, RESOURCE_ENERGY, creep.carryCapacity - creep.carry) == ERR_NOT_IN_RANGE){
       creep.moveTo(structure);
   }
 }
}
}
};
