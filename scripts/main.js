const maps = require("maps");
var exit;
// Events.on(Trigger.update.class, () => {
//   if (!Vars.player.unit()) return;
//   if (Vars.player.unit().type.toString() === "factory-buildings-exit") {
//     simulation.reset(this.pocketDimension, this.oldUnit);
//   }
//   this.oldUnit = Vars.player.unit();
// });
require("factory-building")(maps.small, exit);
require("factory-wall")();