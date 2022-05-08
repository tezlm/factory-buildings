const exit = require(this.modName + "/content/exit");

["factory-wall", "factory-wall-storage"].forEach((i) => {
	const wall = extend(CoreBlock, i, {
		unitType: exit,
		size: 1,
		breakable: false,
		destructible: false,
		buildVisibility: BuildVisibility.hidden,
		itemCapacity: i === "factory-wall" ? 0 : 25,
		hasPower: true,
	});

	// h
	// wall.outputsPower = true;
	// wall.unitType = exit;
	wall.buildType = () =>
		extend(CoreBlock.CoreBuild, wall, {
			tapped() {
				this.onControlSelect(Vars.player.unit())
			},
		});
	module.exports[i] = wall;
});
