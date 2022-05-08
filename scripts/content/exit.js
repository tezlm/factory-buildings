const exit = extendContent(UnitType, "exit", { flying: true });
exit.isCounted = false;
exit.constructor = () => extend(MechUnit, {});
module.exports = exit;
