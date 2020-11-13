const simulation = require("simulation");
module.exports = (map) => {
  print(0);
  var facc = extendContent(Wall, "factory-building", {
    icons() {
      return [
        Core.atlas.find("factory-buildings-factory-building"),
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
  facc.consumesPower = true;

  facc.buildType = () => extendContent(Wall.WallBuild, facc, {
    factory: null,

    placed() {
      // this.factory = 
      print(simulation.create(map, facc).toString());
    },

    //load map on click
    tapped() {
      simulation.load(this.factory);
    },

    //simulate factory
    updateTile() {
      this.factory = simulation.simulate(this.factory);
    }
  });
};