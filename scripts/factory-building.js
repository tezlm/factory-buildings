const simulation = require("simulation");
const events = require("events");
const exitUnitName = "factory-buildings-exit";
module.exports = (map) => {
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
    used: null,
    oldUnit: null,
    eventId: -1,

    // load map on click
    tapped() {
      var exitUnit = Vars.content.getByName(ContentType.unit, exitUnitName);
      // create a new pocket dimension
      if (this.used === null) {
        this.pocketDimension = simulation.create(map, this);
        this.used = true;
        events.create(Trigger.update.class, (event) => {
          if (Vars.player.unit().type === null) return;
          if (Vars.player.unit().type === exitUnit) {
            simulation.reset(this.pocketDimension, event.oldUnit);
          }
          event.oldUnit = Vars.player.unit();
        });
      } else {
        simulation.load(this.pocketDimension);
      }
    },

    // simulate factory
    updateTile() {
      if (this.used !== null) {
        this.pocketDimension = simulation.tick(this.pocketDimension);
      }
      if (this.eventId !== -1) {
        events.remove(this.eventId);
        this.eventId = null;
      }
    }
  });
};