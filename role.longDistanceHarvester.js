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
var roleHarvester = require('role.harvester');
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
      if(structure == undefined)
      {
        var structure = creep.room.memory.controllerContainer;
      }

      if(structure != undefined || structure != null)
      {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
        creep.moveTo(structure,{maxRooms: 0,visualizePathStyle: {} });

        }
      }
      else
      {
        roleHarvester.run(creep);
      }
    }
    else
    {
      var exit = creep.room.findExitTo(creep.memory.home)
      creep.moveTo(creep.pos.findClosestByRange(exit), {maxRooms:1});
    }
  }
  else{


      creep.memory.timeSpentNotWorking++;
      //normal harvesting
        if(creep.room.name == creep.memory.target){
            if(creep.memory.containerHarvesting == false  || creep.memory.containerHarvesting == undefined)
            {
            var source = Game.getObjectById(creep.memory.sourcetarget)
            var code = creep.harvest(source);
            if(creep.name == 'Gabriella')
            console.log('here')
            if(code == ERR_NOT_IN_RANGE || code == ERR_NOT_ENOUGH_RESOURCES)
            {
              creep.moveTo(source,{maxRooms: 0 , visualizePathStyle: {} });
            }
            else
            {
              creep.memory.harvestTime++;
            }
          }
        //container harvesting
        //build containers if no container is found

        }
      }
//this prevents the back and forthness.  If a creep is found at the
//edge of a room this overrides control until a safe distance is reached

if(creep.memory.controlOverride || creep.pos.x*creep.pos.y == 0 || creep.pos.x == 49 || creep.pos.y == 49)
{
creep.memory.controlOverride = true;
creep.moveTo(new RoomPosition(25,25,creep.room.name), {maxRooms:0, visualizePathStyle: {} });
if(creep.pos.x >3 && creep.pos.y > 3 && creep.pos.x < 47 && creep.pos.y <47)
{
  creep.memory.controlOverride = false;
}
}
}
}

containerMine : function(){
  if(creep.memory.sourceContainer != undefined)
  {

      var structuresNearSource = this.lookForAtArea(LOOK_CONSTRUCTION_SITES,
        creep.memory.sourcetarget.pos.y-1,creep.memory.sourcetarget.pos.x-1,
        creep.memory.sourcetarget.pos.y+1,creep.memory.sourcetarget.pos.x+1,true);
      if(structuresNearSource != undefined)
      {
        if(creep.carry <= creep.carryCapacity  && )
        {

        }
      }
      //find container
      //repair container
      //harvest
  }
  else
  {
    var exit = creep.room.findExitTo(creep.memory.target)
    creep.moveTo(creep.pos.findClosestByRange(exit), {maxRooms: 1});
  }
}
