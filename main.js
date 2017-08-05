require('prototype.creep');
require('prototype.spawn');
require('prototype.room');
require('spawning');
//depreciated?
var filler = require('role.filler');
var harvester = require('role.harvester');
var upgrader = require('role.upgrader');
var upgradercon = require('role.upgradercon')
var builder = require('role.builder');
var repairer = require('role.repairer');
var wallrepairer=require('role.wallrepairer');
var longDistanceHarvester=require('role.longDistanceHarvester')
var miner = require('role.miner');
var mover = require('role.mover');
var claimer = require('role.claimer');
const profiler = require('screeps-profiler');
profiler.enable();
//depreciated?
var home = 'W7N3';
var roleNames = ['harvester','upgrader','upgradercon','builder','repairer',
'wallrepairer','longDistanceHarvester','miner','mover','claimer'];
//all role names
//var roleBuilder = require('role.builder');
//var roleUpgrader = require('role.upgrader');
module.exports.loop = function() {
  profiler.wrap(function(){

    //decide whether to enter debug
  var debug = false;
  Game.rooms.W7N3.memory.numLoop = Game.rooms.W7N3.memory.numLoop + 1;
      //console.log(Game.rooms.W7N3.memory.numLoop);
  //print debug information once every 30 loops
  if (Game.rooms.W7N3.memory.numLoop > 30){
    debug = true;
    Game.rooms.W7N3.memory.numLoop = 0;
  }

  //delete old creeps
  for (let name in Memory.creeps) {
    if (Game.creeps[name] == undefined){
      delete Memory.creeps[name];
    }
  }
  var tower = Game.getObjectById('2fa9c063e5baba3');
if(tower) {
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

    if(closestHostile) {
        tower.attack(closestHostile);
    }
}
var tower = Game.getObjectById('6ab0baee1cc2e66');
if(tower) {
  var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

  if(closestHostile) {
      tower.attack(closestHostile);
  }
}



  //console.log(debug)
  //lets run the creeps!
  for(let name in Game.creeps)
  {
    var creep = Game.creeps[name];
    if(creep.memory.role != undefined){
    creep.runRole();
    //eval(creep.memory.role).run(creep);
}
    else
    console.log(name)

  }
  //print out table header when needed
  if(debug) console.log('spawnN    ha mi mo up re bu wr fi ldh' )

  for(let n in Game.spawns)
  {
      var spawn = Game.spawns[n]
    //every time debug is turned on update container locations
    if(debug)
    {
      spawn.room.updateSourceContainers();
      spawn.room.updateControllerContainer();
    }
    //check if spawns are needed
    if(Game.rooms.W7N3.memory.numLoop%5 == 0)
    {
      spawn.spawnCheck(debug)
    }
  }
  for(let n in Game.spawns)
  {
    var spawn = Game.spawns[n];
    var creepsInRoom = spawn.room.find(FIND_CREEPS);

  //console.log(spawn.name);
  var energyMax = Game.spawns.Spawn1.room.energyCapacityAvailable - 200;
  if (energyMax > 1000)
    energy = 1000;
  else
    energy = energyMax;
  //var energy = 400;
  var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester');
  //if(debug == true){console.log(spawn.name + ' harvesters: ' + numberOfHarvesters);}
//console.log(spawn.name);
  var numberOfMiners = _.sum(creepsInRoom, (c) => c.memory.role == 'miner');
  //if(debug == true){console.log('miner: ' + numberOfMiners);}
  //console.log(numberOfMiners);
  var numberOfMovers = _.sum(creepsInRoom, (c) => c.memory.role == 'mover');
//  if(debug == true){console.log('mover: ' + numberOfMovers);}

  var numberOfUpgradercons = _.sum(creepsInRoom, (c) => c.memory.role == 'upgradercon');
//  if(debug == true){console.log('upgraders: ' + numberOfUpgradercons);}

  var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader');
//  if(debug == true){console.log('upgraders: ' + numberOfUpgraders);}

  var numberOfRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'repairer');
//  if(debug == true){console.log('repairers: ' + numberOfRepairers);}

  var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder');
//  if(debug == true){console.log('builders: ' + numberOfBuilders);}

  var numberOfWallRepairers = _.sum(creepsInRoom, (c) => c.memory.role == 'wallrepairer');
//  if(debug == true){console.log('wall repairers: ' + numberOfWallRepairers);}

  var numberOfFillers = _.sum(creepsInRoom, (c) => c.memory.role == 'filler');
//  if(debug == true){console.log('wall repairers: ' + numberOfWallRepairers);}

  var minimumNumberOfLongDistanceHarvestersT = 4;
  var numberOfLongDistanceHarvestersT = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceHarvester');
//  if(debug == true){console.log('Long Distance Harvesters total: ' + numberOfLongDistanceHarvestersT);}
  /*if(debug){
    console.log(spawn.name + '    ' + numberOfHarvesters + '  ' + numberOfMiners + '  ' + numberOfMovers
  + '  ' + numberOfUpgradercons+'  ' + numberOfRepairers + '  ' + numberOfBuilders
+ '  ' + numberOfWallRepairers + '  ' + numberOfFillers + '  ' + numberOfLongDistanceHarvestersT)
  }*/
  var maximumNumberofDefault = 0  ;
  //spawn creeps
  //if(numberOfHarvesters < minimumNumberOfHarvesters  || numberOfLongDistanceHarvestersT <3 && numberOfHarvesters < 4){
  //  name = Game.spawns.Spawn1.createCustomCreep(energy, 'harvester');
  //}

  var sources = spawn.room.find(FIND_SOURCES);
  for(let x in sources)
  {
    var name = undefined;
    var energy = spawn.room.energyCapacityAvailable;
    var source = sources[x];
    var container = undefined;
    var temp2 = source.room.lookForAtArea(LOOK_STRUCTURES, source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1,true);
    for (let i in temp2){
      var check = temp2[i];
      if(check.structure.structureType == 'container'){
        container = check.structure.id;

      }
    }
    if(container)
    {

      if ((_.sum(Game.creeps, (c) => c.memory.sourcetarget == source.id)) < 1)
      {
        name = spawn.createMiner(source.id);

        //console.log('miner');
        //console.log(source.id);
        //console.log(_.sum(Game.creeps, (c) => c.memory.sourcetarget == source.id))
      }
    }
  }
  if(name == undefined && numberOfHarvesters < spawn.memory.minimumNumberOfHarvesters  || (numberOfHarvesters < 4  && numberOfMiners < 1))
  {
    name = spawn.createCustomCreep(200, 'harvester');
  }
  else if(numberOfMovers < spawn.memory.minimumNumberOfMovers  && name == undefined){
    name = spawn.createMoverCreep(5,3,'mover');
  }
  else if(numberOfFillers < spawn.memory.minimumNumberOfFillers)
  {
    name = spawn.createMoverCreep(14,7,'filler');
  }
  else if(numberOfUpgradercons < spawn.memory.minimumNumberOfUpgradercons){
    name = spawn.createUpgradeContainerCreep('upgradercon');
  }
  else if(numberOfUpgraders < spawn.memory.minimumNumberOfUpgraders){
    name = spawn.createCustomCreep(energy,'upgrader');
  }
  else if(numberOfRepairers < spawn.memory.minimumNumberOfRepairers){
    name = spawn.createCustomCreep(energy, 'repairer');
  }
  else if(numberOfBuilders < spawn.memory.minimumNumberOfBuilders){
    name = spawn.createCustomCreep(energy, 'builder');
  }
  else if(numberOfWallRepairers < spawn.memory.minimumNumberOfWallRepairers){
    name = spawn.createCustomCreep(energy, 'wallrepairer');
  }

//
  else if(spawn.memory.sourceIDList != undefined || spawn.memory.sourceIDList != null) {
  /*else if(numberOfLongDistanceHarvesters < minimumNumberOfLongDistanceHarvesters){
    name = Game.spawns.Spawn1.createCustomCreeps(2,6,6, 'longDistanceHarvester',home,
    '7cf80773019b1f1');
  }
  else if(numberOfLongDistanceHarvesters2 < minimumNumberOfLongDistanceHarvesters2){
      name = Game.spawns.Spawn1.createCustomCreeps(2,6,6, 'longDistanceHarvester',home,
      '70100773019e434');
  }
  else if(numberOfLongDistanceHarvesters3 < minimumNumberOfLongDistanceHarvesters3){
        name = Game.spawns.Spawn1.createCustomCreeps(2,6,6, 'longDistanceHarvester',home,
        '80d207728e6597b');
}*/

//long distance harvester spawning
//var sourceIDlist = ['7cf80773019b1f1', '70100773019e434', '80d207728e6597b', 'c44207728e621fc','26f20772347f879'];
//sourceIDlist.push('71ac0772347ffe6');
//var targetList = ['W6N3','W6N3','W7N4','W7N4','W8N3','W8N3']
//Get all of the spawns target list for long range harvesting

var longRangeTargets = spawn.memory.sourceIDList

for(let x in longRangeTargets){
  var target = longRangeTargets[x]
  //is there not enough harvesters on that source?
  if(_.sum(Game.creeps, (c) => c.memory.sourcetarget == target.sourceID) < 1)
  {
    name = spawn.createLongDistanceHarvester(energyMax, 'longDistanceHarvester',target.roomLoc,spawn.room.name,
    target.sourceID);
    break;
  }
}

}
if(!(name < 0) && name != undefined){
console.log("Spawned new: " + name +'(' + Game.creeps[name].memory.role + ') at' + n );
}
}
/*
var sourceIDlist = ['7cf80773019b1f1', '70100773019e434', '80d207728e6597b', 'c44207728e621fc','26f20772347f879'];
sourceIDlist.push('71ac0772347ffe6');
var targetList = ['W6N3','W6N3','W7N4','W7N4','W8N3','W8N3']
for(var i = 0;i < sourceIDlist.length; i++)
{
  if(_.sum(Game.creeps, (c) => c.memory.sourcetarget == sourceIDlist[i]) < 2)
  {

    var target = targetList[i];
    name = Game.spawns.Spawn1.createCustomCreeps(3,7,7, 'longDistanceHarvester',target,home,
    sourceIDlist[i]);


    break;
  }
}
*/
})
};
