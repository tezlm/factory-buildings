const simulation = {
  create: function (map, from) {
    // copy rules/world from normal world
    const orgin = { world: Vars.world, state: Vars.state };
    Vars.state = new GameState();
    Vars.world = new World();

    // copy player from normal world
    const unit = Vars.player.unit();

    // load map
    Vars.world.loadMap(map);

    // set rules
    Vars.state = orgin.state;
    Vars.state.rules.canGameOver = false;
    Vars.state.rules.unitCap = 9999;
    Vars.state.rules.bannedBlocks.add(from.block);
    Vars.state.rules.enemyCoreBuildRadius = 0;

    for (var i = 0; i < map.height; i++) {
      for (var j = 0; j < map.width; j++) {
        Vars.world.tile(i, j).setTeam(from.team);
      }
    }

    this.setPlayer(unit);
    Vars.logic.play();
    Events.fire(new WorldLoadEvent);

    return { world: Vars.world, state: Vars.state, orgin: orgin };
  },

  load: function (factory) {
    //save current state
    const unit = Vars.player.unit();
    const orgin = { world: Vars.world, state: Vars.state };

    // load map
    Vars.state = new GameState();
    Vars.world = new World();
    Vars.state = factory.state;
    Vars.world = factory.world;
    Events.fire(new WorldLoadEvent);

    this.setPlayer(unit);
    return orgin;
  },

  setPlayer: function (unit) {
    Groups.unit.clear();

    // spawn player
    Vars.player.unit((unit.type || UnitTypes.alpha).spawn(5 * 8, 5 * 8));
    Vars.player.team(unit.team);
    Vars.player.unit().health = unit.health;
  },

  reset: function (factory) {
    factory.world = Vars.world;
    factory.state = Vars.state;
    Vars.world = new World();
    Vars.state = new GameState();
    Events.fire(new WorldLoadEvent);
    Vars.world = factory.orgin.world;
    Vars.state = factory.orgin.state;
    Events.fire(new WorldLoadEvent);
    this.setPlayer(factory.unit);
    // Vars.player.unit().x = factory.pos.x;
    // Vars.player.unit().y = factory.pos.y;
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

module.exports = simulation;
