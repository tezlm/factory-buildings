module.exports = {
  events: {},
  id: 0,
  create: function (event, func) {
    var id = this.id++;
    this.events[id] = func;
    Events.on(event, () => {
      if (!this.events.hasOwnProperty(id)) return;
      this.events[id](this.events[id]);
    });
    return id;
  },
  remove: function (id) {
    delete events[id];
  }
};