/* global Vue */
var runner = {
  vm: null,
  start: function(siscop) {
    document.getElementById('month').value = window.aux.toMonthInputValue();
    document.getElementById('loginButton').onclick = window.aux.sendForm.bind(
      this, 'loginForm');
    document.getElementsByName('pass_equal').forEach((e) => {
      e.onchange = window.aux.changePasswordInputs;
    });
    window.messages.start();
    siscop.load();
    Vue.nextTick();
  },
};
runner.start(this.siscop);
