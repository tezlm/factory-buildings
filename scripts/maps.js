var maps = Vars.maps.all();
maps = maps.filter(i => i.mod != null && i.mod.name == this.modName);
print(maps.count(i => true));
// maps = maps.sort((a, b) => a.name > b.name);
// print(maps);
module.exports = {
  small: maps.get(0),
  //   medium: maps[1],
  //   large: maps[2],
}

// const keys=(obj)=>Object.keys(obj).toString();