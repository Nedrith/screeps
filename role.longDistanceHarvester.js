/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
module.exports = {
run: function (creep){
//check for switching state

  if(creep.memory.working == true && creep.carry.energy == 0){
    creep.memory.working = false;
  //  console.log(creep.name +  '  has a target of  '+creep.memory.sourcetarget+ ' time working: '+creep.memory.timeSpentWorking + 'time harvesting: ' + creep.memory.harvestTime + 'time spent not working: ' + creep.memory.timeSpentNotWorking );
    creep.memory.timeSpentNotWorking = 0;
    creep.memory.timeSpentWorking = 0;
    creep.memory.harvestTime = 0;
  }
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity){
    creep.memory.working = true;


  }
  //transfer
  if(creep.memory.working == true){
    creep.memory.timeSpentWorking++;
    if(creep.room.name == creep.memory.home)
    {
      var structure = creep.room.storage;
      if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(structure),{maxRooms: 1};

      }
      if (structure == undefined)
      {
        roleUpgrader.run(creep);
      }
    }
    else
    {
      var exit = creep.room.findExitTo(creep.memory.home)
      creep.moveTo(creep.pos.findClosestByRange(exit));
    }
  }
  else{
      creep.memory.timeSpentNotWorking++;
      if(creep.room.name == creep.memory.target){
        var source = Game.getObjectById(creep.memory.sourcetarget)
        var code = creep.harvest(source);
        if(code == ERR_NOT_IN_RANGE || code == ERR_NOT_ENOUGH_RESOURCES)
        {
          creep.moveTo(source),{maxRooms: 1};
        }
        else
        {
          creep.memory.harvestTime++;
        }

      }
      else
      {
        var exit = creep.room.findExitTo(creep.memory.target)
        creep.moveTo(creep.pos.findClosestByRange(exit));
      }
}
if(creep.pos.x*creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49)
creep.moveTo(new RoomPosition(25,25,creep.room.name));
}

};
