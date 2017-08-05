/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.roles');
 * mod.thing == 'a thing'; // true
 */
var roles = {
  harvester : require('role.harvester'),
  builder : require('role.builder'),
  repairer : require('role.repairer'),
  wallrepairer : require('role.wallrepairer'),
  longDistanceHarvester : require('role.longDistanceHarvester'),
  claimer : require('role.claimer'),
  upgrader : require('role.upgrader'),
  upgradercon : require('role.upgradercon'),
  miner : require('role.miner'),
  mover : require('role.mover'),
  filler : require('role.filler'),

}
//module.exports = {
Creep.prototype.runRole =
function (){
  roles[this.memory.role].run(this);
}
//Get energy source storage>container>source
Creep.prototype.getEnergy =
function (useStorage, useContainer, useSource)
{
    if(useContainer)
    {
    //  console.log(this.memory.containerRefresh)
      //decrement containerRefresh to check for stale container
      if(this.memory.containerRefresh == undefined){
        this.memory.containerRefresh = 0;

      }
      else{
        this.memory.containerRefresh = this.memory.containerRefresh - 1;
      //  console.log(this.memory.containerRefresh);
      }
      //if this doesn't have a container stored or it is stale find a new one
      if((this.memory.target != 0 || this.memory.target != undefined)  && this.memory.containerRefresh < 1 )
      {
        this.memory.target = undefined;
        //target is the current best target, targetEnergy is the amount target holds
        var targetEnergy = 0;
        var target = undefined
        //find containers other than the controller's container
        //var container = this.room.find(FIND_STRUCTURES, {
        //  filter: (s) => s.structureType == 'container' && s.id != this.room.memory.controllerContainer
        //});
        var container = this.room.memory.sourceContainers
        //For every container if container has 100 more energy than last set it as target
        for(let c in container){
          var targetcheck = Game.getObjectById(container[c]);
          if ((targetcheck.store.energy >= targetEnergy + 100 || target == undefined)  && targetcheck.id != this.memory.controllerContainer){
            targetEnergy = targetcheck.store.energy;
            target = targetcheck;
          }
        }
        //set memory to target and give 10 uses of getEnergy before stale
        this.memory.target = target.id;
        this.memory.containerRefresh = 10;
      }
      //if we have a container
      if (this.memory.target != undefined)
      {
        //if ( Math.abs(this.pos.x - target.pos.x) > 2 || Math.abs(this.pos.y - target.pos.y > 2))
        //{
      //    this.moveTo(target);
      //  }
      //attempt to fill up energy if out of range move closer
    target= Game.getObjectById(this.memory.target);
        if (this.withdraw( target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
        {

          this.moveTo(target);
        }
      }
    }
  }
//};
