// big thank to deltanedas for the block texture code

module.exports = () => {
  const diags = [
    [-1, 1],
    [1, 1],
    [1, -1],
    [-1, -1]
  ];

  const all = [
    [-1, 1], [0, 1], [1, 1],
    [-1, 0], [1, 0],
    [-1, -1], [0, -1], [1, -1]
  ];

  const dirs = [
    { x: 0, y: 1 },
    { x: 1, y: 0 },
    { x: 0, y: -1 },
    { x: -1, y: 0 }
  ];
  const wall = extendContent(Wall/*CoreBlock*/, "factory-wall", {
    load() {
      /* Edges and corners which depend on the placement */
      this.edgeRegions = [
        Core.atlas.find(this.name + "-edge_0"),
        Core.atlas.find(this.name + "-edge_1")
      ];

      this.cornerRegions = [];
      this.icornerRegions = [];
      for (var i = 0; i < 4; i++) {
        this.cornerRegions[i] = Core.atlas.find(this.name + "-corner_" + i);
        this.icornerRegions[i] = Core.atlas.find(this.name + "-icorner_" + i);
      }
    },

    draw(tile) {
      this.super$draw(tile);
      this.drawEdges(tile);
      this.drawCorners(tile);
    },

    drawEdges(tile) {
      const bits = tile.entity.blendBits;
      const dx = tile.drawx(), dy = tile.drawy();

      for (var i = 0; i < 4; i++) {
        // First nibble has the edges
        if ((bits & (1 << i)) == 0) {
          Draw.rect(this.edgeRegions[i >> 1], dx, dy, 90 * -i);
        }
      }
    },

    drawCorners(tile) {
      const bits = tile.entity.blendBits;
      const dx = tile.drawx(), dy = tile.drawy();

      for (var i = 0; i < 4; i++) {
        if ((bits & (256 << i)) != 0) {
          // Third nibble has the inner corners, which take priority
          Draw.rect(this.icornerRegions[i], dx, dy);
        } else if ((bits & (16 << i)) == 0) {
          // Second nibble has the outer corners
          Draw.rect(this.cornerRegions[i], dx, dy);
        }
      }
    },

    placed(tile) {
      this.super$placed(tile);

      // Server doesn't care about drawing, stop
      if (!Vars.ui) return;

      this.reblendAll(tile);
      this.reblend(tile);
    },

    removed(tile) {
      this.reblendAll(tile);
    },

    reblendAll(tile) {
      for (var i in all) {
        var other = tile.getNearby(all[i][0], all[i][1]);
        if (other && other.block() == wall) {
          this.reblend(other);
        }
      }
    },

    reblend(tile) {
      // All edges and outer corners by default
      var bits = 0;

      for (var i = 0; i < 4; i++) {
        var prev = this.adjacent(tile, (i + 3) % 4);
        var current = this.adjacent(tile, i);;
        if (current || prev) {
          // Can't be a corner
          bits |= 16 << i;
          if (current) {
            // Can't be a straight edge
            bits |= 1 << i;
            if (prev && this.interior(tile, i)) {
              // It's a bend, show inner corner
              bits |= 256 << i;
            }
          }
        }
      }

      tile.entity.blendBits = bits;
    },

    adjacent(tile, i) {
      const other = tile.getNearby(dirs[i].x, dirs[i].y);
      return other && other.block() == this;
    },

    /* Whether a router is a corner of a square or just a bend */
    interior(tile, i) {
      const diag = tile.getNearby(diags[i][0], diags[i][1]);
      return diag && diag.block() != this;
    }
  });

  // h
  // wall.outputsPower = true;
  wall.consumesTap = true;
  wall.buildType = () => extendContent(WallBlock.WallBuild/*CoreBlock.CoreBuild*/, wall, {
    tapped() { }
  });
};