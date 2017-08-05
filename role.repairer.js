/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader');
module.exports = {
run: function (creep){
//check for switching state
var tower = Game.getObjectById('6ab0baee1cc2e66');
    if(tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
  if(creep.memory.working == true && creep.carry.energy == 0){
    creep.memory.working = false;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
    creep.memory.working = true;
  }
  //transfer
  if(creep.memory.working == true){
    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
    {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
      && s.structureType != STRUCTURE_RAMPART || (s.structureType == STRUCTURE_CONTAINER && s.hits < 50000) });
    if (structure != undefined)
    {
      if (creep.repair(structure) == ERR_NOT_IN_RANGE){
        creep.moveTo(structure, {maxRooms: 0});

      }
    }
    else
    {
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
        {filter: (s) => s.hits < 5000 && s.structureType == STRUCTURE_WALL});
        if (structure != undefined)
        {
          if (creep.repair(structure) == ERR_NOT_IN_RANGE){
            creep.moveTo(structure,{maxRooms: 0});

          }
        }
        else
        {

          roleUpgrader.run(creep);
        }
    }
  }
  else{
      var source = creep.pos.findClosestByPath(FIND_SOURCES);
      if(creep.harvest(source) == ERR_NOT_IN_RANGE){
        creep.moveTo(source);
      }
  }

}
};
