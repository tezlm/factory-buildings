const simulation = {
  create: function (map, from) {
    // copy rules/world from normal world
    const orgin = { world: Vars.world, state: Vars.state };

    // copy player from normal world
    const unit = Vars.player.unit();

    // load map
    Vars.world.loadMap(map);

    // set rules
    Vars.state.rules.canGameOver = false;
    Vars.state.rules.unitCap = 9999;
    Vars.state.rules.bannedBlocks.add(from);

    for (var i = 0; i < map.height; i++) {
      for (var j = 0; j < map.width; j++) {
        // TODO: convert walls to team
      }
    }

    this.setPlayer(unit);
    Vars.logic.play();

    return { world: Vars.world, state: Vars.state, orgin: orgin };
  },

  load: function (factory) {
    // load map
    Vars.state = factory.state;
    Vars.world = factory.world;
    Vars.logic.play();

    this.setPlayer();
  },

  setPlayer: function (unit) {
    Groups.unit.clear();

    // spawn player
    print(unit.type);
    Vars.player.unit((unit.type || UnitTypes.alpha).spawn(5 * 8, 5 * 8));
    Vars.player.team(unit.team);
    Vars.player.unit().health = unit.health;
  },

  tick: function (world) {
    //TODO: simulate world
    return world;
  }
}

module.exports = simulation; 