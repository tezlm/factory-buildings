module.exports = ($, exit) => {
  ["factory-wall", "factory-wall-storage"].forEach(i => {
    const wall = extendContent(CoreBlock, i, {});

    // h
    // wall.outputsPower = true;
    wall.unitType = exit;
    wall.size = 1;
    wall.breakable = false;
    wall.destructible = false;
    wall.hasPower = true;
    wall.buildVisibility = BuildVisibility.hidden;

    wall.itemCapacity = i == "factory-wall" ? 0 : 25;
    wall.consumesTap = true;
    wall.unitCapModifier = 0;
    wall.buildType = () =>
      extendContent(CoreBlock.CoreBuild, wall, {
        tapped() { },
      });
  });
};
