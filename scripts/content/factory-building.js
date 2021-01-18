const Simulation = require(this.modName + "/lib/simulation");
const facc = extendContent(Block, "factory-building", {
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

facc.buildType = () =>
  extend(Building, {
    pocketDimension: null,

    placed() {
      this.pocketDimension = new Simulation(12, this);
    },

    // load map on click
    tapped() {
      if (this.pocketDimension) this.pocketDimension.load();
    },

    // simulate factory
    updateTile() {
      if (this.pocketDimension) {
        this.pocketDimension.tick();
      }
    },

    acceptItem(source, item) {
      return this.items.get(item) < this.block.itemCapacity;
    },
  });
module.exports = facc;
