module.exports = {
  create: function (map, from) {
    // copy player from normal world
    const unit = Vars.player.unit();

    // copy rules/world from normal world
    var orgin = { world: Vars.world, state: this.state.save(), unit: unit };
    const state = Vars.state;

    // load map
    Vars.world = new World();
    Vars.world.loadMap(map);

    // copy state
    Vars.state = state;
    this.state.setState(from);

    // convert blocks to team
    for (var i = 0; i < map.height; i++) {
      for (var j = 0; j < map.width; j++) {
        Vars.world.tile(i, j).setTeam(from.team);
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
    const state = Vars.state;

    // load map
    Vars.world = new World();
    Vars.world = factory.world;

    // copy state
    Vars.state = state;
    this.state.setState(from);

    Events.fire(new WorldLoadEvent());

    this.setPlayer(unit);
    return orgin;
  },

  reset: function (factory) {
    // save factory
    factory.world = Vars.world;
    const state = Vars.state;

    // load original world
    Vars.world = new World();
    Vars.world = factory.orgin.world;

    // copy state
    Vars.state = state;
    this.state.load(factory.orgin.state);

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
  },

  setPlayer: function (unit) {
    Groups.unit.clear();

    // spawn player
    Vars.player.unit((unit.type || UnitTypes.alpha).spawn(5 * 8, 5 * 8));
    Vars.player.team(unit.team);
    Vars.player.unit().health = unit.health;
  },

  tick: function (world) {
    for (var i = 0; i < map.height; i++) {
      for (var j = 0; j < map.width; j++) {
        var tile = Vars.world.tile(i, j).block();
        if (tile) tile.updateTile();
      }
    }
    return world;
  },
};
