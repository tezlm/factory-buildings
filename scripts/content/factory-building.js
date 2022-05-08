const { createDimension } = require(this.modName + "/lib/create");
const data = require(this.modName + "/lib/data");
const state = require(this.modName + "/lib/state");
const facc = extendContent(Block, "factory-building", {
	// basic factory stuff
	requirements: ItemStack.with(Items.lead, 10, Items.copper, 20),
	size: 4,
	health: 1200,
	buildVisibility: BuildVisibility.shown,
	category: Category.effect,
	consumesTap: true,
	hasItems: true,
	itemCapacity: 300,
	unloadable: true,
	solid: true,
	update: true,
	hasPower: true,
});

const sounds = {
	open: loadSound("open"),
	close: loadSound("close"),
};

facc.buildType = () =>
	extend(Building, {
		pocketDimension: null,
		oldItems: null,
		size: 12,
		origin: null,

		placed() {
			this.pocketDimension = createDimension(this);
		},

		// load map on click
		tapped() {
			if (!this.pocketDimension) this.pocketDimension = createDimension(this);

			const oldState = state.save();
			this.pocketDimension.load();

			// move the camera and play sound
			Vars.player.unit().x = this.size * 4;
			Vars.player.unit().y = this.size * 4;
			Vars.renderer.setScale(Vars.renderer.getScale() + 1);
			Core.camera.position.set(this.size * 4, this.size * 4);
			sounds.open.play();

			// listen for exit condition
			state.onExit(() => {
				state.load(oldState);
				Vars.renderer.setScale(Vars.renderer.getScale() - 1);
				sounds.close.play();
			});
		},

		// simulate factory
		updateTile() {
			if (this.pocketDimension) {
				this.pocketDimension.tick();
				const core = this.pocketDimension.world.build(0, 0);
				if (!core) throw "how did we get here";
				if (this.oldItems) {
					const coreItems  = {};
					const buildItems = {};

					// calculate and apply item deltas
					core.items.each((item, amount) => coreItems[item]  = amount);
					this.items.each((item, amount) => buildItems[item] = amount);
					this.oldItems.each((item, amount) => {
						const coreDelta  = coreItems[item] - amount;
						const buildDelta = buildItems[item] - amount;
						this.items.add(item, coreDelta  || 0);
						core.items.add(item, buildDelta || 0);
					});
				}
				this.oldItems = this.items.copy();
				core.items.each((item, amount) => {
					if(!this.oldItems.has(item)) this.oldItems.set(item, amount);
				});
			}
		},

		acceptItem(source, item) {
			return this.items.get(item) < this.block.itemCapacity;
		},

		write(write) {
			if(this.pocketDimension) {
				data.write(write, this.pocketDimension.world);
			} else {
				write.i(0);
			}
		},

		read(read) {
			this.pocketDimension = createDimension(this);
			data.read(read, this.pocketDimension.world);
		},
	});

module.exports = facc;
