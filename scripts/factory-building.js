const load = require("loadMap");
module.exports = (map) => {
  const facc = extendContent(Wall, "factory-building", {});

  facc.solid = true;
  facc.group = null;
  facc.category = Category.effect;
  facc.consumesTap = true;
  facc.buildType = () => extendContent(Wall.WallBuild, facc, {
    tapped() {
      load(map, this);
    }
  });
};