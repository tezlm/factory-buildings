module.exports = (map, from) => {
  map.tags = "{playerteam=1, rules={unitCap: 9999}, height=12, width=12}"

  var rules = new Rules();
  rules.unitCap = 999;
  rules.bannedBlocks.add(from);

  Vars.world.loadMap(map, rules);
  Vars.logic.play();
}