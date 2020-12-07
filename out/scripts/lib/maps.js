var _this = this;
var maps = Vars.maps.all().copy();
maps = maps.filter(function (i) { return i.mod != null && i.mod.name == _this.modName; });
module.exports = {
    small: maps.get(0)
};
//# sourceMappingURL=maps.js.map