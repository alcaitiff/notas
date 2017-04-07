/* global Vue */
window.master = {
  siscop: null,
  vue: null,
  messages: null,
  start: function() {
    this.siscop = window.siscop;
    this.vue = Vue;
    this.messages = window.messages;
    this.messages.start();
    this.updateForm();
    this.siscop.load();
    this.vue.nextTick();
  },
  updateForm: function() {
    document.getElementById('month').value = window.aux.toMonthInputValue();
    document.getElementById('loginButton').onclick = this.sendForm.bind(
      this, 'loginForm');
    document.getElementsByName('pass_equal').forEach((e) => {
      e.onchange = this.changePasswordInputs;
    });
  },
  changePasswordInputs: () => {
    if (document.getElementById("equal").checked) {
      document.getElementById('pass_alm').value = null;
      for (const e of document.getElementsByClassName('secret')) {
        e.style.display = "none";
      }
      for (const e of document.getElementsByClassName('plabel')) {
        e.style.display = "inherit";
      }
    } else {
      for (const e of document.getElementsByClassName('secret')) {
        e.style.display = "inherit";
      }
      for (const e of document.getElementsByClassName('plabel')) {
        e.style.display = "none";
      }
    }
  },
  formFail: function(jsonResponse) {
    this.messages.showError(jsonResponse.msg);
    this.siscop.load();
  },
  formSuccess: function(jsonResponse) {
    document.getElementById('loginForm').classList.add('fadeOut');
    this.messages.hide();
    console.log(jsonResponse);
  },
  sendForm: function(id) {
    this.messages.hide();
    var form = document.getElementById(id);
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    var fail = this.formFail.bind(this);
    var success = this.formSuccess.bind(this);
    xhr.open(form.method, form.action, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse.error === "FAIL") {
          fail(jsonResponse);
        } else {
          success(jsonResponse);
        }
      }
    };
    xhr.send(data);
  }
};
