const script = "[" + modName + "/" + scriptName + "] ";
var $ = (name, type) =>
  Vars.content.getByName(
    ContentType[type || "block"],
    this.modName + "-" + name
  );
$ = Object.assign($, {
  events: {
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
      delete this.events[id];
    },
  },
  insertAfter: function (index, obj) {
    var blocks = Vars.content.blocks();
    blocks.filter((i) => i != obj);
    blocks.insert((blocks.indexOf(index) || 0) + 1, obj);
    obj.category = index.category;
  },
  keys: (obj) => Object.keys(obj).toString(),
  timer: {
    executor: new java.util.Timer(),
    counter: 1,
    ids: {},

    setTimeout: function (fn, delay) {
      var id = this.counter;
      this.counter += 1;
      this.ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
      this.timer.schedule(this.ids[id], delay);
      return id;
    },

    clearTimeout: function (id) {
      this.ids[id].cancel();
      this.timer.purge();
      delete this.ids[id];
    },

    setInterval: function (fn, delay) {
      var id = this.counter;
      this.counter += 1;
      this.ids[id] = new JavaAdapter(java.util.TimerTask, { run: fn });
      this.timer.schedule(this.ids[id], delay, delay);
      return id;
    },

    _clearInterval: this.clearTimeout,
  },
  format: (name) => this.modName + "-" + name,
  console: {
    log: function (text) {
      Log.log(Log.LogLevel.info, script + text);
    },
    error: function (text) {
      Log.err(new Error(script + text));
    },
    assert: function (bool) {
      if (!bool) this.error("Assertion failed");
    },
    warn: function (text) {
      Log.log(Log.LogLevel.warn, script + text);
    },
    trace: () => {
      var obj = {};
      Error.captureStackTrace(obj, this.trace);
      print("You called trace " + obj.stack);
    },
  },
  seq: {
    toArray: function (seq) {
      return seq.toArray();
    },
    fromArray: function (array) {
      return Seq.of(array);
    },
  },
});
module.exports = $;
