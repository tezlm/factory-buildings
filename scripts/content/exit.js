module.exports = ($) => {
  var exit = extendContent(UnitType, "exit", {});
  exit.isCounted = false;
  exit.constructor = () => extend(MechUnit, {});
  return exit;
};
