function write(write, facc) {
  const world = facc.pocketDimension.world;
  const size = facc.size;
  const blocks = [];
  const positions = [];
  let total = 0,
    tmpx,
    tmpy,
    tile;
  world.tiles.each((x, y) => {
    if (x <= 1 || x >= size - 2) return;
    if (y <= 1 || y >= size - 2) return;
    tile = world.build(x, y);
    if (!tile) return;
    if (blocks.includes(tile)) return;
    blocks.push(tile);
    tmpx = x;
    tmpy = y;
    positions.push([tmpx, tmpy]);
    total++;
  });
  write.i(size);
  write.i(total);
  for (let i = 0; i < blocks.length; i++) {
    const pos = positions[i];
    write.i(pos[0]);
    write.i(pos[1]);
    write.s(blocks[i].block.id);
    blocks[i].writeAll(write);
  }
}

function read(read, facc) {
  // size already read
  const world = facc.pocketDimension.world;
  const blocks = read.i();
  let x, y, block;
  for (let i = 0; i < blocks; i++) {
    x = read.i();
    y = read.i();
    block = Vars.content.block(read.s());
    world.tile(x, y).setBlock(block);
    world.build(x, y).readAll(read, 1);
  }
}

module.exports = { write: write, read: read };
