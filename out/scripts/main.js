var $ = require("lib/mquery");
var maps = require("lib/maps");
var exit = require("content/exit")($);
require("content/factory-building")($, maps.small, exit, require("lib/simulation"));
require("content/factory-wall")($, exit);
//# sourceMappingURL=main.js.map