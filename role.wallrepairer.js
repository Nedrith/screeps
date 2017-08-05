/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleBuilder = require('role.builder');
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
  //  var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
  //  {filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL});
  //  if (structure != undefined)
  //  {
  //    if (creep.repair(structure) == ERR_NOT_IN_RANGE){
  //      creep.moveTo(structure);

    //  }
  //  }
  //  else
  //  {
      var structure = creep.pos.findClosestByPath(FIND_STRUCTURES,
        {filter: (s) => s.hits < 40000 && s.structureType == STRUCTURE_WALL  || s.structureType == STRUCTURE_RAMPART  && s.hits <200000});
        if (structure != undefined)
        {
          if (creep.repair(structure) == ERR_NOT_IN_RANGE){
            creep.moveTo(structure);

          }
        }
        else
        {

          roleBuilder.run(creep);
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
