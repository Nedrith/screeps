/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.harvester');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
run: function (spawntarget){
//check for switching state
var spawn = Game.spawns[spawntarget];
spawn.memory.minimumNumberOfHarvesters = 0;
spawn.memory.minimumNumberOfUpgraders = 0;
spawn.memory.minimumNumberOfUpgradercons=0;
spawn.memory.minimumNumberOfBuilders = 0;
spawn.memory.minimumNumberOfWallRepairers = 0;
spawn.memory.minimumNumberOfRepairers = 0;
spawn.memory.additionalMovers = 0;
}
};
