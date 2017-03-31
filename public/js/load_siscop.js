/* globals Vue */
window.siscop = {
  index: '/siscop/cpf_senha.asp',
  vsStr: 'name=viewstate value=\'',
  captchaStr: 'robô\' src=\'',
  captcha: null,
  vs: null,
  vm: null,
  updateData: function(callback, v) {
    this.vs = window.aux.between(v, this.vsStr, "'");
    this.captcha = window.aux.between(v, this.captchaStr, "'");
    this.updateLogin();
    if (callback instanceof Function()) {
      callback();
    }
  },
  load: function(callback) {
    return window.aux.getPage(this.updateData.bind(this, callback), this.index);
  },
  updateLogin: function() {
    if (this.vm === null) {
      this.component();
    } else {
      this.vm.vs = this.vs;
      this.vm.captcha = this.captcha;
    }
  },
  component: function() {
    this.vm = new Vue({
      el: '#siscop',
      data: {
        vs: this.vs,
        captcha: this.captcha
      }
    });
  }
};
