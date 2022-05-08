const floor = require(this.modName + "/content/factory-floor");
const wall = require(this.modName + "/content/factory-walls");

// WARNING: can only do multiples of 25
function wallGen(target, team) {
	let storage = 0;
	return function (tile) {
		if (storage < target) {
			tile.setBlock(wall["factory-wall-storage"], team);
			storage += 25;
			print("added more storage, for a total of " + storage + " out of " + target);
		} else {
			tile.setBlock(wall["factory-wall"], team);
		}
	};
}

function create(size, storage, team) {
	const world = new World();
	const wall = wallGen(storage, team);
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

module.exports = create;
