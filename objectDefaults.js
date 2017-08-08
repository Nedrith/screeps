/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */
module.exports = {
spawn: function (spawntarget){
//check for switching state
var spawn = Game.spawns[spawntarget];
spawn.memory.minimumNumberOfHarvesters = 0;
spawn.memory.minimumNumberOfUpgraders = 0;
spawn.memory.minimumNumberOfUpgradercons=0;
spawn.memory.minimumNumberOfBuilders = 0;
spawn.memory.minimumNumberOfWallRepairers = 0;
spawn.memory.minimumNumberOfRepairers = 0;
spawn.memory.minimumNumberOfMovers = 0;
spawn.memory.minimumNumberOfFillers = 0;
spawn.memory.emergancyHarvesterCount = 4;
spawn.memory.roleCount = []
}
};
module.exports = {

targetRoom: function (spawntarget){
//check for switching state
var spawn = Game.rooms[spawntarget];
spawn.memory.sourceContainers = {}
spawn.memory.controllerContainer={}
spawn.memory.sourceIDList={}
}
};
