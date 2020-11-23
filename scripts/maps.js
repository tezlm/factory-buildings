// wip
var maps = Vars.maps.all().copy();
maps = maps.filter((i) => i.mod != null && i.mod.name == this.modName);

module.exports = {
  small: maps.get(0),
  //   medium: maps[1],
  //   large: maps[2],
};

// const keys = (obj) => Object.keys(obj).toString();
