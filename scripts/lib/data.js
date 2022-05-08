function write(write, world) {
	const size = world.width();
	const blocks = [];
	world.tiles.each((x, y) => {
		if (x < 2 || x >= size - 2) return;
		if (y < 2 || y >= size - 2) return;

		const build = world.build(x, y);
		if (!build) return;
		if (blocks.includes(build)) return;
		blocks.push([build, x, y]);
	});

	write.i(blocks.length);
	for (let i = 0; i < blocks.length; i++) {
		const [build, x, y] = blocks[i];
		write.i(x);
		write.i(y);
		write.s(build.block.id);
		build.writeAll(write);
	}
}

function read(read, world) {
	const blocks = read.i();
	for (let i = 0; i < blocks; i++) {
		const x = read.i();
		const y = read.i();
		const block = Vars.content.block(read.s());
		world.tile(x, y).setBlock(block);
		world.build(x, y).readAll(read, 1);
	}
}

module.exports = { write: write, read: read };
