StructureTower.prototype.run =
function (){
  var structure = this.pos.findClosestByPath(FIND_STRUCTURES,
  {filter: (s) => s.hits < s.hitsMax-800 && s.structureType != STRUCTURE_WALL
    && s.structureType != STRUCTURE_RAMPART || (s.structureType == STRUCTURE_CONTAINER && s.hits < 50000) });
  if (structure != undefined)
  {
    if (this.repair(structure) == ERR_NOT_IN_RANGE){
      this.moveTo(structure, {maxRooms: 0});

    }
  }
  var structure = this.pos.findClosestByPath(FIND_STRUCTURES,
    {filter: (s) => s.hits < 5000 && s.structureType == STRUCTURE_WALL});
  if (structure != undefined)
  {
    if (this.repair(structure) == ERR_NOT_IN_RANGE){
      this.moveTo(structure,{maxRooms: 0});

    }
  }
  var structure = this.pos.findClosestByPath(FIND_STRUCTURES,
    {filter: (s) => s.hits < 5000 && s.structureType == STRUCTURE_RAMPART});
  if (structure != undefined)
  {
    if (this.repair(structure) == ERR_NOT_IN_RANGE){
      this.moveTo(structure,{maxRooms: 0});

    }
  }
}
