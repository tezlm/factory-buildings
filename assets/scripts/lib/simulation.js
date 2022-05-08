function Simulation(world, state) {
	this.world = world;
	this.state = state;
	this.first = true;

	this.load = () => {
		Vars.world = this.world;
		Vars.state = this.state;

		this.world.tiles.each((x, y) => {
			const build = this.world.build(x, y);
			if(build) build.updateProximity();
		});

		Vars.logic.play();
		Events.fire(new WorldLoadEvent());
	};

	this.tick = () => {
		const oldworld = Vars.world;
		const oldstate = Vars.state;
		Vars.world = this.world;
		Vars.state = this.state;

		for (let y = 0; y < Vars.world.height(); y++) {
			for (let x = 0; x < Vars.world.width(); x++) {
				const build = world.build(x, y);
				if (!build) continue;
				if (build.update) build.update();
			}
		}

		Vars.world = oldworld;
		Vars.state = oldstate;
	};
}

module.exports = Simulation;
