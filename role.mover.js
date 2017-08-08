/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
//require('prototype.creep');
var roleUpgrader = require('role.upgrader');
module.exports = {
run: function (creep)
{
//check for switching state
  if(creep.memory.working == true && creep.carry.energy == 0){
    creep.memory.working = false;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
    creep.memory.working = true;
  }
  //transfer
  if(creep.memory.working == true)
  {
    //structure disregards storages along with towers that aren't missing atleast 400 energy
    //this prevents a tower from constantly getting filled while repairing
    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
      filter: (s) => (s.energy < s.energyCapacity  &&
        !(s.structureType == STRUCTURE_STORAGE  || s.structureType == STRUCTURE_TOWER))
      || (s.structureType == STRUCTURE_TOWER && s.energy <s.energyCapacity - 400)
    });
    creep.memory.test = structure;
    if(structure != null && structure != undefined)
    {
    if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE  || Math.abs(structure.pos.x - creep.pos.x) > 2 || Math.abs(structure.pos.y - creep.pos.y) > 2){
      creep.moveTo(structure);

    }
    }
    else if(creep.room.storage != undefined){
      var target = creep.room.storage;
      if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE  || Math.abs(target.pos.x - creep.pos.x) > 2 || Math.abs(target.pos.y - creep.pos.y) > 2){
        creep.moveTo(target);
      }
    }
  }
  else{
  /*  var targetv = 0;
    var target = undefined
    var container = creep.room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == 'container' && s.id != creep.room.memory.controllerContainer
    });
    for(let c in container){
      var targetcheck = container[c];
      if ((targetcheck.store.energy >= targetv + 100 || target == undefined)  && targetcheck.id != creep.memory.controllerContainer){
        targetv = targetcheck.store.energy;
        target = targetcheck;
      }
    }
    creep.memory.container = container;
    if (target != undefined){}
    if ( Math.abs(creep.pos.x - target.pos.x) > 2 || Math.abs(creep.pos.y - target.pos.y > 2))
    {
      creep.moveTo(target);
    }
    else if (creep.withdraw(target, RESOURCE_ENERGY, (creep.carryCapacity - creep.carry.energy)) == ERR_NOT_IN_RANGE)
    {
      creep.moveTo(target);
    }
    */
  //console.log(creep);
  creep.getEnergy(false,true,false);
  }
}

}
