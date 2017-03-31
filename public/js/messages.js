window.messages = {
  start: () => {
    for (const e of document.getElementsByClassName('message')) {
      e.onclick = function() {
        this.classList.remove("fadeIn");
        this.classList.add("fadeOut");
      };
    }
  },
  hide: () => {
    window.messages.start();
  },
  showError: (msg) => {
    window.messages.show(msg, 'error');
  },
  show: (msg, type) => {

    document.getElementById(type + 'Message').textContent = msg;

    document.getElementById(type + 'Message').classList.add(
      "fadeIn");
    document.getElementById(type + 'Message').classList.remove(
      "hide");
    document.getElementById(type + 'Message').classList.remove(
      "fadeOut");

  }
};
