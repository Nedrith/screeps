//sets defaults for room memory must be run when room is taken control of
Room.prototype.defaultRoomVariables = function(){
  this.memory.sourceContainers={}
  this.memory.controllerContainer={}
}
//updates containers around sources
Room.prototype.updateSourceContainers = function()
{
  //finds sources
  var sources = this.find(FIND_SOURCES);
  for(let x in sources)
    {
        var source = sources[x];

        //find all structures 1 square away from source including diagonals
        var structuresNearSource = this.lookForAtArea(LOOK_STRUCTURES, source.pos.y-1,source.pos.x-1,source.pos.y+1,source.pos.x+1,true);

        for (let i in structuresNearSource){
            //let check equal structures near the source
            var check = structuresNearSource[i];
            //if it contains a container complete the for loop
            if(check.structure.structureType == 'container'){
              //set structures ID to sourceContainers array by source id
                this.memory.sourceContainers[source.id] = check.structure.id;
                break;
            }
        }
        //if after searching all structures memory is invalid delete it
        if(Game.getObjectById(this.memory.sourceContainers[source.id]) == undefined)
        {
          delete this.memory.sourceContainers[source.id];
        }
    }
}
//finds controller near source
Room.prototype.updateControllerContainer = function(){
  if(this.memory.controllerContianer != undefined || this.memory.controllerContainer == null)
  {
      //set controller
      let controller = this.controller;
      //find structures within 2 blocks of controller
      var structuresNearController = this.lookForAtArea(LOOK_STRUCTURES, controller.pos.y-2,controller.pos.x-2,controller.pos.y+2,controller.pos.x+2,true);
      for (let i in structuresNearController){
        var check = structuresNearController[i];
        //if check it contains a container set it to room's controller container variable
        if(check.structure.structureType == 'container'){
          this.memory.controllerContainer = check.structure.id;
          return;
        }
        //if after everything the controllerContainer is invalid delete it
        if(Game.getObjectById(this.memory.controllerContainer) == undefined)
        {
          delete this.memory.controllerContainer;
        }
      }
  }
}
