const maps = require("maps");
require("factory-building")(maps.small);
require("factory-wall")();
Vars.content.getByName(ContentType.block, "factory-buildings-factory-wall").buildVisibility = BuildVisibility.shown