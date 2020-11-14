const simulation = require("simulation");
module.exports = (map) => {
  print(0);
  var facc = extendContent(Wall, "factory-building", {
    icons() {
      return [
        Core.atlas.find(this.name),
      ];
    },
  });

  // basic factory stuff
  facc.requirements = ItemStack.with(Items.lead, 10, Items.copper, 20);
  facc.size = 4;
  facc.health = 1200;
  facc.group = null;
  facc.buildVisibility = BuildVisibility.shown;
  facc.category = Category.effect;
  facc.consumesTap = true;
  // facc.hasPower = true;
  // facc.outputsPower = true;
  // facc.consumesPower = true;

  facc.buildType = () => extendContent(Wall.WallBuild, facc, {
    pocketDimension: {},
    used: false,

    //load map on click
    tapped() {
      if (this.used) simulation.load(this.pocketDimension);

      if (!this.used) {
        this.pocketDimension = simulation.create(map, facc);
        this.used = true;
      }
    },

    //simulate factory
    updateTile() {
      if (this.used) this.pocketDimension = simulation.tick(this.pocketDimension);
    }
  });
};