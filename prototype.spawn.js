/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.this');
 * mod.thing == 'a thing'; // true
 */
 var roleNames = ['harvester','miner','mover','upgradercon','repairer',
 'builder','wallrepairer','filler','longDistanceHarvester','upgrader'];
//module.exports = function() {0
  StructureSpawn.prototype.createCustomCreep =
    function(energy, roleName) {
      var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < numberOfParts; i++){
        body.push(WORK);

      }
      for (let i = 0; i < numberOfParts; i++){
        body.push(CARRY);

      }
      for (let i = 0; i < numberOfParts; i++){
        body.push(MOVE);

      }
      return this.createCreep(body, undefined, { role: roleName, working: false});
    };
    StructureSpawn.prototype.createCustomCreeps =
    function(workp,carryp,movep,roleName,target,home,sourcetarget) {
      //var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < workp; i++){
        body.push(WORK);

      }
      for (let i = 0; i < carryp; i++){
        body.push(CARRY);

      }
      for (let i = 0; i < movep; i++){
        body.push(MOVE);

      }

      return this.createCreep(body, undefined, { harvestTime: 0, timeSpentNotWorking: 0,timeSpentWorking: 0, role: roleName, working: false, target: target, home: home, sourcetarget: sourcetarget});
    };
    StructureSpawn.prototype.createLongDistanceHarvester =
    function(energyMax,workP,roleName,target,home,sourcetarget) {
      //var numberOfParts = Math.floor(energy / 200);
      var body = [];
      for (let i = 0; i < workP; i++){
        body.push(WORK);

      }
      for (let i = 0; i < Math.floor((energyMax/100)) - workP; i++){
        body.push(CARRY);


      }
      for (let i = 0; i < Math.floor((energyMax/100)) -workP; i++){
        body.push(MOVE);

      }
      return this.createCreep(body, undefined, { harvestTime: 0, timeSpentNotWorking: 0,timeSpentWorking: 0, role: roleName, working: false, target: target, home: home, sourcetarget: sourcetarget});
    };
    StructureSpawn.prototype.createMiner =
    function(sourcetarget) {
      //var numberOfParts = Math.floor(energy / 200);
      var container = undefined;
      var source = Game.getObjectById(sourcetarget);
      var temp2 = source.room.lookForAtArea(LOOK_STRUCTURES, source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1,true);
      for (let i in temp2){
        var check = temp2[i];
        if(check.structure.structureType == 'container'){
          container = check.structure.id;
        }
      }
      return this.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, { role: 'miner', containerID: container, sourcetarget: sourcetarget});
    };
    StructureSpawn.prototype.createMoverCreep =
    function(carryP,moveP,roleName) {
      var body = [];

      for (let i = 0; i < carryP; i++){
        body.push(CARRY);

      }
      for (let i = 0; i < moveP; i++){
        body.push(MOVE);

      }
      return this.createCreep(body, undefined, { role: roleName, working: false});
    };
    StructureSpawn.prototype.createUpgradeContainerCreep =
    function(roleName) {

      return this.createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, { role: roleName, working: false});
    };
    StructureSpawn.prototype.createClaimerCreep =
    function(parts, target, role) {
      var body = []
      for (let i = 0; i < parts; i++)
      {
        body.push(CLAIM);

      }
      for (let i = 0; i < parts; i++){
        body.push(MOVE);

      }

      return this.createCreep(body, undefined, { role: role, target:target, working: false});
    };
//};





StructureSpawn.prototype.spawnCheck =
function (debug)
{
  //true to refresh roles false not to
  var roleRefresh = false
  //check if it is time to refresh roles otherwise decrease time
  if(this.memory.roleRefresh == undefined || this.memory.roleRefresh < 1 || debug)
  {
    roleRefresh = true
    this.memory.roleRefresh = 1
  }
  else
  {
    this.memory.roleRefresh = this.memory.roleRefresh - 1
  }
  //get creeps in room
  var creepsInRoom = this.room.find(FIND_MY_CREEPS);
  //total energy available
  var energy = this.energyCapacityAvailable
  //if debug is not active don't print out creep totals only refresh periodically
  if(!debug && roleRefresh)
  {
    //for every role
    for(let role of roleNames)
    {
      //LDHs are by all creeps all else only targets creeps in room
      if(role != 'longDistanceHarvester')
      {
      this.memory.roleCount[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
      }
      else
      {
      this.memory.roleCount[role] = _.sum(Game.creeps, (c) => c.memory.role == role)
      }
    }
  }
  //always refresh on a debug run but also print out data
  else if(debug)
  {
    //print array stores the entire table column of stuff to print starting with spawn name
    let printArray = this.name + '   |'
    for(let role of roleNames)
    {

      if(role != 'longDistanceHarvester')
      {
      this.memory.roleCount[role] = _.sum(creepsInRoom, (c) => c.memory.role == role);
      }
      else
      {
      this.memory.roleCount[role] = _.sum(Game.creeps, (c) => c.memory.role == role)
      }
      //add proper data to printArray
      printArray = printArray + this.memory.roleCount[role]
      printArray = printArray + ' |'
    }
    console.log(printArray)
  }

  //start spawning code
  var name = undefined;
  var sources = this.room.find(FIND_SOURCES);
  //energy in the room available
  var energyMax = this.room.energyCapacityAvailable;
  //miner code check every source that has a container for a miner
  if(this.memory.miner != false){
  for(let x in sources)
    {
      //name of creep Spawned


      //current source
      var source = sources[x];
      //if the spawn's room memory says the source has a container then see if it has a miner
      if(this.room.memory.sourceContainers[source.id] != undefined)
      {

        if ((_.sum(Game.creeps, (c) => c.memory.sourcetarget == source.id)) < 1)
        {
          //if there's no miner then create one
          name = this.createMiner(source.id);

          //console.log('miner');
          //console.log(source.id);
          //console.log(_.sum(Game.creeps, (c) => c.memory.sourcetarget == source.id))
        }
      }
    }
  }
  if(name == undefined && this.memory.roleCount['harvester'] < this.memory.minimumNumberOfHarvesters)
  {
    name = this.createCustomCreep(energyMax, 'harvester');
  }
  //backup harvester spawn
  else if((this.memory.roleCount['harvester'] < this.memory.emergancyHarvesterCount  && this.memory.roleCount['miner'] < 1) && energyMax/2 > this.room.energyAvailable)
  {
    name = this.createCustomCreep(this.room.energyAvailable,'harvester')
  }
  else if(this.memory.roleCount['mover'] < this.memory.minimumNumberOfMovers  && name == undefined){
    name = this.createMoverCreep(8,3,'mover');
  }
  else if(this.memory.roleCount['filler'] < this.memory.minimumNumberOfFillers)
  {
    name = this.createMoverCreep(14,7,'filler');
  }
  else if(Game.flags.claimRoom != undefined)
  {
    name = this.createClaimerCreep(Game.flags.claimRoom.pos.roomName);
    if(name != undefined)
    {
      delete Game.flags.claimRoom.remove()
    }
  }
  else if(this.memory.roleCount['upgradercon'] < this.memory.minimumNumberOfUpgradercons){
    name = this.createUpgradeContainerCreep('upgradercon');
  }
  else if(this.memory.roleCount['upgrader'] < this.memory.minimumNumberOfUpgraders){
    name = this.createCustomCreep(energyMax,'upgrader');
  }
  else if(this.memory.roleCount['repairer'] < this.memory.minimumNumberOfRepairers){
    name = this.createCustomCreep(energyMax, 'repairer');
  }
  else if(this.memory.roleCount['builder'] < this.memory.minimumNumberOfBuilders){
    name = this.createCustomCreep(energyMax, 'builder');
  }
  else if(this.memory.roleCount['wallrepaier'] < this.memory.minimumNumberOfWallRepairers){
    name = this.createCustomCreep(energyMax, 'wallrepairer');
  }
  //if all else fails spawn a longDistanceHarvester as long as we need one
  else if(this.room.memory.sourceIDList != undefined || this.room.memory.sourceIDList != null) {

    //get a list of longDistanceHarvester targets
    var longRangeTargets = this.room.memory.sourceIDList
    //for every source targeted see if we need a harvester
    for(let x in longRangeTargets){

      var target = longRangeTargets[x]
      //is there not enough harvesters on that source?
      if(_.sum(Game.creeps, (c) => c.memory.sourcetarget == target.sourceID) < 1)
      {
        if(energyMax > 1000)
        {
        name = this.createLongDistanceHarvester(energyMax, 3, 'longDistanceHarvester',target.roomLoc,this.room.name,
        target.sourceID);
        }
        else
        {
          name = this.createLongDistanceHarvester(energyMax, 2, 'longDistanceHarvester',target.roomLoc,this.room.name,
          target.sourceID);
        }

        break;
      }
    }
  }
  if(name == undefined  && ((this.room.memory.reserveRoom != undefined || this.room.memory.reserveRoom != null) && energyMax > 1100)){
  var reserveTargets = this.room.memory.reserveRoom
  //for every source targeted see if we need a harvester
  for(let x in reserveTargets){

    var target = reserveTargets[x]
    //console.log(target)
    //is there not enough harvesters on that source?
    if(_.sum(Game.creeps, (c) => c.memory.target == target  && c.memory.role == 'reserver') < 1)
    {
      //console.log('here')
      name = this.createClaimerCreep(2,target,'reserver');
      break;
    }
  }
}
//print out the name of the spawned creep
if(!(name < 0) && name != undefined){
  if(this.memory.roleCount[Game.creeps[name].memory.role] != 'longDistanceHarvester')
    this.memory.roleCount[Game.creeps[name].memory.role] = this.memory.roleCount[Game.creeps[name].memory.role] + 1
  console.log("Spawned new: " + name +'(' + Game.creeps[name].memory.role + ') at' + this.name );
}
}
