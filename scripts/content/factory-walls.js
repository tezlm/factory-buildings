const exit = require(this.modName + "/content/exit");

["factory-wall", "factory-wall-storage"].forEach((i) => {
  const wall = extendContent(CoreBlock, i, {
    unitType: exit,
    size: 1,
    breakable: false,
    destructible: false,
    hasPower: true,
    buildVisibility: BuildVisibility.hidden,

    itemCapacity: i === "factory-wall" ? 0 : 25,
    consumesTap: true,
    unitCapModifier: 1,
  });

  // h
  // wall.outputsPower = true;
  // wall.unitType = exit;
  wall.buildType = () =>
    extendContent(CoreBlock.CoreBuild, wall, {
      tapped() {},
    });

  module.exports[i] = wall;
});
