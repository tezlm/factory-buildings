const floor = require(this.modName + "/content/factory-floor");
const wall = require(this.modName + "/content/factory-walls");

// WARNING: can only do multiples of 25
function wallGen(storage, team) {
	let i = 0;
	return function (tile) {
		if (i < storage) {
			tile.setBlock(wall["factory-wall-storage"], team);
		} else {
			tile.setBlock(wall["factory-wall"], team);
		}
		i += 25;
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
		if (x <= 1 || x >= size - 2) wall(tile);
		if (y <= 1 || y >= size - 2) wall(tile);
	});
	return world;
}

module.exports = create;
