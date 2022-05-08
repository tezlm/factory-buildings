const Simulation = require(this.modName + "/lib/simulation");
const floor = require(this.modName + "/content/factory-floor");
const wall = require(this.modName + "/content/factory-walls");

// WARNING: can only do multiples of 25
function genWalls(target, team) {
	let storage = 0;
	return function (tile) {
		if (storage < target) {
			tile.setBlock(wall["factory-wall-storage"], team);
			storage += 25;
		} else {
			tile.setBlock(wall["factory-wall"], team);
		}
	};
}

function createWorld(size, storage, team) {
	const world = new World();
	const wall = genWalls(storage, team);
	world.resize(size, size);
	world.tiles.each((x, y) => {
		world.context.create(x, y, floor.id, 0, 0);

		const tile = world.tile(x, y);
		// two block thick margin
		if (x < 2 || x >= size - 2 ||
			y < 2 || y >= size - 2) wall(tile);
	});

	world.tiles.each((x, y) => {
		const build = world.build(x, y);
		if(build) build.updateProximity();
	});

	return world;
}

function createState(facc) {
	const state = new GameState();
	state.rules.canGameOver = false;
	state.rules.unitCap = 9999;
	state.rules.bannedBlocks.add(facc.block);
	state.rules.enemyCoreBuildRadius = 0;
//	state.rules.infiniteResources = true;
	return state;
}

function createDimension(facc) {
	return new Simulation(createWorld(facc.size, facc.block.itemCapacity, facc.team), createState(facc));
}

module.exports = {
	createWorld: createWorld,
	createState: createState,
	createDimension: createDimension,
}

