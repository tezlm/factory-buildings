module.exports = function ($) {
    var exit = extendContent(UnitType, "exit", {});
    exit.isCounted = false;
    exit.constructor = function () { return extend(MechUnit, {}); };
    return exit;
};
//# sourceMappingURL=exit.js.map