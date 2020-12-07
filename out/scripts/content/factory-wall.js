module.exports = function ($, exit) {
    ["factory-wall", "factory-wall-storage"].forEach(function (i) {
        var wall = extendContent(CoreBlock, i, {});
        // h
        // wall.outputsPower = true;
        wall.unitType = exit;
        wall.size = 1;
        wall.breakable = false;
        wall.destructible = false;
        wall.hasPower = true;
        wall.buildVisibility = BuildVisibility.hidden;
        wall.itemCapacity = i == "factory-wall" ? 0 : 25;
        wall.consumesTap = true;
        wall.unitCapModifier = 0;
        wall.buildType = function () {
            return extendContent(CoreBlock.CoreBuild, wall, {
                tapped: function () { }
            });
        };
    });
};
//# sourceMappingURL=factory-wall.js.map