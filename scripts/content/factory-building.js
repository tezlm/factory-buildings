module.exports = ($, map, exit, simulation) => {
  var facc = extendContent(Block, "factory-building", {
    icons() {
      return [Core.atlas.find($.format(this.name))];
    },
  });

  // basic factory stuff
  facc.requirements = ItemStack.with(Items.lead, 10, Items.copper, 20);
  facc.size = 4;
  facc.health = 1200;
  facc.buildVisibility = BuildVisibility.shown;
  facc.category = Category.effect;
  facc.consumesTap = true;
  facc.hasItems = true;
  facc.itemCapacity = 300;
  facc.unloadable = true;
  facc.solid = true;
  facc.update = true;
  facc.hasPower = true;
  // facc.outputsPower = true;
  // facc.consumesPower = true;

  function listenExit(pocketDimension) {
    var listener = $.events.create(Trigger.update.class, () => {
      if (Vars.player.unit().type === null) return;
      if (Vars.player.unit().type === exit) {
        simulation.reset(pocketDimension);
        $.events.remove(listener);
      }
      // pocketDimension.orgin.world = simulation.tick(pocketDimension.orgin.world);
      pocketDimension.unit = Vars.player.unit();
    });
  }

  facc.buildType = () =>
    extend(Building, {
      pocketDimension: {},
      used: false,

      // load map on click
      tapped() {
        // create a new pocket dimension
        if (!this.used) {
          this.pocketDimension = simulation.create(map, this);
          listenExit(this.pocketDimension);
          this.used = true;
        } else {
          this.pocketDimension = simulation.load(this.pocketDimension, this);
          listenExit(this.pocketDimension);
        }
      },

      // simulate factory
      updateTile() {
        if (this.used) {
          this.pocketDimension.world = simulation.tick(this.pocketDimension.world);
        }
      }
    });
};
