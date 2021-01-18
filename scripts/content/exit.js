const exit = extendContent(UnitType, "exit", {});
exit.isCounted = false;
exit.constructor = () => extend(MechUnit, {});
module.exports = exit;
