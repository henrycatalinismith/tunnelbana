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
