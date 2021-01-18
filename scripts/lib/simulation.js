const world = require(this.modName + "/lib/maps");
const exit = Vars.content.getByName(ContentType.unit, this.modName + "-exit");

function Simulation(size, from) {
  this.world = world(size, 100, from.team);
  const state = new GameState();
  state.rules.canGameOver = false;
  state.rules.unitCap = 9999;
  state.rules.bannedBlocks.add(from.block);
  state.rules.enemyCoreBuildRadius = 0;
  this.state = state;
  this.onexit = () => {};
  this.playerUnit = null;
  this.origin = null;

  this.unload = () => {
    if (!this.origin.hasOwnProperty("world")) return;

    // load map
    Vars.player.unit().x = this.origin.pos.x;
    Vars.player.unit().y = this.origin.pos.y;
    Core.camera.position.set(this.origin.pos.x, this.origin.pos.y);
    Vars.world = this.origin.world;
    Vars.state = this.origin.state;

    Vars.logic.play();
    Events.fire(new WorldLoadEvent());
    this.origin = null;
  };

  this.load = () => {
    // copy rules/world from normal world
    this.origin = {
      world: Vars.world,
      state: Vars.state,
      pos: { x: Vars.player.unit().x, y: Vars.player.unit().y },
    };
    this.playerUnit = Vars.player.unit();

    // load map
    Vars.player.unit().x = size * 4;
    Vars.player.unit().y = size * 4;
    Core.camera.position.set(size * 4, size * 4);
    Vars.world = this.world;
    Vars.state = this.state;

    Vars.logic.play();

    Timer.schedule(() => {
      Events.fire(new WorldLoadEvent());
    }, 1 / 1000);

    const listener = () => {
      const unit = Vars.player.unit();
      if (unit.type === null) return;
      if (unit.type === exit) {
        Events.remove(Trigger.update.class, listener);
        Vars.player.unit(this.playerUnit);
        this.unload();
      }
      this.playerUnit = unit;
    };
    Events.on(Trigger.update.class, listener);
  };

  this.tick = (world) => {
    if (world == null) return;
    let build;
    for (let y = 0; y < world.height(); y++) {
      for (let x = 0; x < world.width(); x++) {
        build = world.build(x, y);
        if (!build) continue;
        if (build.updateTile) build.updateTile();
      }
    }
  };
}

module.exports = Simulation;
/*
  // copy rules/world from normal world
  this.orgin = {
    world: Vars.world,
    state: this.state.copy(),
  };

  // load map
  const state = Vars.state;
  Vars.state = new GameState();
  Vars.world = new World();
  Vars.world.loadMap(map);

  // copy state
  Vars.state = state;
  this.orgin.state = this.state.save();
  this.state.setState(from);

  // convert blocks to team
  for (var y = 0; y < map.height; y++) {
    for (var x = 0; x < map.width; x++) {
      Vars.world.tile(x, y).setTeam(from.team);
    }
  }

  this.setPlayer(this.orgin.unit);
  Vars.logic.play();
  Events.fire(new WorldLoadEvent());

  this.world = Vars.world;
  this.state = Vars.state;
}

Object.defineProperty(Simulation, "state", {
  save: function () {
    var things = {};
    things.canGameOver = Vars.state.rules.canGameOver;
    things.unitCap = Vars.state.rules.unitCap;
    things.bannedBlocks = Vars.state.rules.bannedBlocks;
    things.enemyCoreBuildRadius = Vars.state.rules.enemyCoreBuildRadius;
    return things;
  },
  setState: function (from) {
    Vars.state.rules.canGameOver = false;
    Vars.state.rules.unitCap = 9999;
    Vars.state.rules.bannedBlocks.add(from.block);
    Vars.state.rules.enemyCoreBuildRadius = 0;
  },
  load: function (things) {
    Vars.state.rules.canGameOver = things.canGameOver;
    Vars.state.rules.unitCap = things.unitCap;
    Vars.state.rules.bannedBlocks = things.bannedBlocks;
    Vars.state.rules.enemyCoreBuildRadius = things.enemyCoreBuildRadius;
  },
});

Simulation.prototype.load = function () {
  
};

//   reset: function (factory) {
//     // save factory
//     factory.world = Vars.world;
//     // load original world
//     Vars.world = factory.orgin.world;

//     // load state
//     this.state.load(factory.orgin.state);
//     Vars.logic.play();
//     Events.fire(new WorldLoadEvent());

//     this.setPlayer(factory.unit);
//     Vars.player.unit().x = factory.orgin.unit.x;
//     Vars.player.unit().y = factory.orgin.unit.y;
//   },

// setPlayer: function (unit) {
//   Groups.unit.clear();

//   // spawn player
//   Vars.player.unit((unit.type || UnitTypes.alpha).spawn(5 * 8, 5 * 8));
//   Vars.player.team(unit.team);
//   Vars.player.unit().health = unit.health;
// },

// },
// });
*/
