const exit = Vars.content.getByName(ContentType.unit, this.modName + "-exit");

function save() {
	return {
		x: Vars.player.unit().x,
		y: Vars.player.unit().y,
		unit: Vars.player.unit(),
		world: Vars.world,
		state: Vars.state,
	};
}

function load(state) {
	Vars.player.unit(state.unit);
	Vars.player.unit().x = state.x;
	Vars.player.unit().y = state.y;
	Vars.world = state.world;
	Vars.state = state.state;
	Vars.logic.play();
	Events.fire(new WorldLoadEvent());
	Core.camera.position.set(state.x, state.y);
}

function onExit(call) {
	const listener = () => {
		const unit = Vars.player.unit();
		if (unit.type === null) return;
		if (unit.type === exit) {
			Events.remove(UnitChangeEvent, listener);
			call();
		}
	};
	Events.on(UnitChangeEvent, listener);
}

module.exports = {
	save: save,
	load: load,
	onExit: onExit,
};
