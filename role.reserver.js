/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.reserver');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
  module.exports = {
  run: function (creep){
        //if  not in target room
        if(creep.room.name == creep.memory.target){
          //claim controller
          if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE)
          {
            //move to controller if not in range
            creep.moveTo(creep.room.controller),{maxRooms: 1};
          }
        }
        else
        {
          //move to target room
          var exit = creep.room.findExitTo(creep.memory.target)
          creep.moveTo(creep.pos.findClosestByRange(exit));
        }


  }

};

};
