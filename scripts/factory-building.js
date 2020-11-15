const simulation = require("simulation");
module.exports = (map, listener) => {
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
    oldUnit: null,

    // load map on click
    tapped() {
      if (this.used) { simulation.load(this.pocketDimension); }

      // create a new pocket dimension
      if (!this.used) {
        this.pocketDimension = simulation.create(map, this);
        this.used = true;
        Events.on(Trigger.update.class, () => {
          if (!Vars.player.unit()) return;
          if (Vars.player.unit().type.toString() === "factory-buildings-exit") {
            simulation.reset(this.pocketDimension, this.oldUnit);
          }
          this.oldUnit = Vars.player.unit();
        });
      }
    },

    // simulate factory
    updateTile() {
      if (this.used) this.pocketDimension = simulation.tick(this.pocketDimension);
    }
  });
};