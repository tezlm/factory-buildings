const world = require(this.modName + "/lib/maps");
const exit = Vars.content.getByName(ContentType.unit, this.modName + "-exit");

function Simulation(from) {
  const size = from.size;
  this.world = world(size, from.block.itemCapacity, from.team);
  const state = new GameState();
  state.rules.canGameOver = false;
  state.rules.unitCap = 9999;
  state.rules.bannedBlocks.add(from.block);
  state.rules.enemyCoreBuildRadius = 0;
  this.state = state;
  this.onexit = () => {};
  this.playerUnit = null;
  this.origin = null;

  let build;
  this.world.tiles().each((x, y) => {
    build = this.world.build(x, y);
    if (build) build.updateProximity();
  });

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

    Events.fire(new WorldLoadEvent());

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

  Vars.renderer.blocks.drawShadows();
}

module.exports = Simulation;
