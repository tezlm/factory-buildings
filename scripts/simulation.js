module.exports = {
  create: (map, from) => {
    // copy rules from normal world
    const orgin = { world: Vars.world, state: Vars.state };
    const rules = Vars.state.rules;

    // create new world + state
    const world = new World;
    const state = new GameState;

    // load map
    world.loadMap(map);

    // set rules
    state.rules = rules;
    state.rules.canGameOver = false;
    state.rules.unitCap = 9999;
    state.rules.bannedBlocks.add(from);

    for (var i = 0; i < world.height; i++) {
      for (var j = 0; j < world.width; j++) {
        // TODO: convert walls to team
      }
    }

    // for some reason the above code kicks to main menu
    // Vars.world.load(orgin.world);
    // Vars.logic.play();

    return { world: world, state: state };
  },

  load: (factory) => {
    // copy player from normal world
    const unit = Vars.player.unit();

    // load map
    Vars.state = factory.state;
    Vars.world = factory.world;
    Vars.logic.play();

    // spawn player
    Vars.player.unit((unit.type || UnitTypes).alpha.spawn(5 * 8, 5 * 8));
    Vars.player.team(unit.team);
    Vars.player.unit().health = unit.health;
  },

  simulate: (world) => {
    //TODO: simulate world
    return world;
  }
}