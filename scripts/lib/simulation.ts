function Simulation(map, from) {
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
  // copy rules/world from normal world
  this.orgin = {
    world: Vars.world,
    state: this.state.copy(),
  };

  // load map
  Vars.state = new GameState();
  Vars.world = new World();
  Vars.world.loadMap(map);

  // copy state
  Vars.state = this.orgin.state;
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

  // load map
  Vars.world = factory.world;

  // copy state
  Vars.state = state;
  this.state.setState(from);

  this.setPlayer(unit);
  Vars.logic.play();
  Events.fire(new WorldLoadEvent());

  return { world: Vars.world, state: Vars.state, orgin: orgin };
};

Simulation.prototype.reset = function () {};

Simulation.prototype.reset = function () {};

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

// tick: function (world) {
//   if (world == null) return;
//   for (var y = 0; y < world.height(); y++) {
//     for (var x = 0; x < world.width(); x++) {
//       var tile = Vars.world.build(x, y);
//       if (tile) {
//         if (tile.updateTile) {
//           tile.updateTile(); //h
//         }
//       }
//     }
//   }
//   return world;
// },
// });

module.exports = {
  create: function (map, from) {
    // copy player from normal world
    const unit = Vars.player.unit();

    // copy rules/world from normal world
    const orgin = { world: Vars.world, state: this.state.save(), unit: unit };
    const state = this.state.copy();

    // load map
    Vars.world = new World();
    Vars.world.loadMap(map);

    // copy state
    Vars.state = state;
    this.state.setState(from);

    // convert blocks to team
    for (var y = 0; y < map.height; y++) {
      for (var x = 0; x < map.width; x++) {
        Vars.world.tile(x, y).setTeam(from.team);
      }
    }

    this.setPlayer(unit);
    Vars.logic.play();
    Events.fire(new WorldLoadEvent());

    return { world: Vars.world, state: Vars.state, orgin: orgin };
  },

  load: function (factory, from) {
    //save current state
    const unit = Vars.player.unit();
    const orgin = { world: Vars.world, state: this.state.save(), unit: unit };
    const state = this.state.copy();

    // load map
    Vars.world = factory.world;

    // copy state
    Vars.state = state;
    this.state.setState(from);

    this.setPlayer(unit);
    Vars.logic.play();
    Events.fire(new WorldLoadEvent());

    return { world: Vars.world, state: Vars.state, orgin: orgin };
  },

  reset: function (factory) {
    // save factory
    factory.world = Vars.world;
    // load original world
    Vars.world = factory.orgin.world;

    // load state
    this.state.load(factory.orgin.state);
    Vars.logic.play();
    Events.fire(new WorldLoadEvent());

    this.setPlayer(factory.unit);
    Vars.player.unit().x = factory.orgin.unit.x;
    Vars.player.unit().y = factory.orgin.unit.y;
  },

  state: {
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
    copy: function () {
      var copy = new GameState();
      for (var i in Vars.state) {
        try {
          copy[i] = Vars.state[i];
        } catch (e) {
          //h
        }
      }
      return copy;
    },
  },

  setPlayer: function (unit) {
    Groups.unit.clear();

    // spawn player
    Vars.player.unit((unit.type || UnitTypes.alpha).spawn(5 * 8, 5 * 8));
    Vars.player.team(unit.team);
    Vars.player.unit().health = unit.health;
  },

  tick: function (world) {
    if (world == null) return;
    for (var y = 0; y < world.height(); y++) {
      for (var x = 0; x < world.width(); x++) {
        var tile = Vars.world.build(x, y);
        if (tile) {
          if (tile.updateTile) {
            tile.updateTile(); //h
          }
        }
      }
    }
    return world;
  },
};
