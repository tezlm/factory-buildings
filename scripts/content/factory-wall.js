module.exports = ($, exit) => {
  const wall = extendContent(CoreBlock, "factory-wall", {});

  // h
  // wall.outputsPower = true;
  wall.unitType = exit;
  wall.size = 1;
  wall.breakable = false;
  wall.destructible = false;
  wall.hasPower = true;
  wall.buildVisibility = BuildVisibility.hidden;

  wall.itemCapacity = 0;
  wall.consumesTap = true;
  wall.unitCapModifier = 0;
  wall.buildType = () =>
    extendContent(CoreBlock.CoreBuild, wall, {
      tapped() { },
    });
};
