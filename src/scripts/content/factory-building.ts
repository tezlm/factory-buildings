module.exports = ($, map, exit, simulation) => {
  var facc = extendContent(Block, "factory-building", {
    icons() {
      return [Core.atlas.find($.format(this.name))];
    },
    // basic factory stuff
    requirements: ItemStack.with(Items.lead, 10, Items.copper, 20),
    size: 4,
    health: 1200,
    buildVisibility: BuildVisibility.shown,
    category: Category.effect,
    consumesTap: true,
    hasItems: true,
    itemCapacity: 300,
    unloadable: true,
    solid: true,
    update: true,
    hasPower: true,
  });

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
          // this.pocketDimension = simulation.create(map, this);
          this.pocketDimension = new Simulation(map, this);
          listenExit(this.pocketDimension);
          this.used = true;
        } else {
          this.pocketDimension.load();
          listenExit(this.pocketDimension);
        }
      },

      // simulate factory
      updateTile() {
        if (this.used) {
          this.pocketDimension.tick();
        }
      },

      acceptItem(source, item) {
        return this.items.get(item) < this.block.itemCapacity;
      },
    });
};
