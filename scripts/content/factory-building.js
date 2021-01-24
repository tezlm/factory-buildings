const Simulation = require(this.modName + "/lib/simulation");
const data = require(this.modName + "/lib/data");
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
    oldItems: null,
    size: 12,

    placed() {
      this.pocketDimension = new Simulation(this);
    },

    // load map on click
    tapped() {
      if (!this.pocketDimension) {
        this.pocketDimension = new Simulation(this);
      }
      this.pocketDimension.load();
    },

    // simulate factory
    updateTile() {
      if (this.pocketDimension) {
        this.pocketDimension.tick();
        if(this.oldItems) {
          this.pocketDimension.world.build(0, 0);
        }
        this.oldItems = this.items.copy();
      }
    },

    acceptItem(source, item) {
      return this.items.get(item) < this.block.itemCapacity;
    },

    write(write) {
      data.write(write, this);
    },

    read(read) {
      this.size = read.i();
      this.pocketDimension = new Simulation(this);
      data.read(read, this);
    },
  });

module.exports = facc;
