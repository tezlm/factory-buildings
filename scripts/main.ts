const $ = require("lib/mquery");
const maps = require("lib/maps");
const exit = require("content/exit")($);

require("content/factory-building")(
  $,
  maps.small,
  exit,
  require("lib/simulation")
);
require("content/factory-wall")($, exit);
