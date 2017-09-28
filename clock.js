import pauseMe from "pause-me";

const timeouts = {};

class Clock {
  id = 0;
  timeouts = {};

  setTimeout(callback, delay) {
    const id = this.id;
    const timeout = pauseMe(() => {
      delete this.timeouts[id];
      callback();
    }, delay);
    this.timeouts[id] = timeout;
    this.id++;
  }

  pause() {
    // hahahahahahahahahahahahaha sometimes i remember i actually bloody did this
    // and this is actually how im implementing pause in this thing and lolololol
    for (var id in this.timeouts) {
      this.timeouts[id].pause();
    }
  }

  resume() {
    for (var id in this.timeouts) {
      this.timeouts[id].resume();
    }
  }
}

export default new Clock();
