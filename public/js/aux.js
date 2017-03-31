/* globals $ */
window.aux = {
  toMonthInputValue: (date) => {
    date = date || new Date();
    var local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 7);
  },
  getPage: (callback, url, params) => {
    var http = new XMLHttpRequest();
    if (params != null) {
      http.open("POST", url, true);
      http.setRequestHeader("Content-type",
        "application/x-www-form-urlencoded");
    } else {
      http.open("GET", url, true);
    }
    http.onreadystatechange = () => {
      if (http.readyState == 4 && http.status == 200) {
        callback(http.responseText);
      }
    };
    return http.send(params);
  },
  between: (str, begin, end) => {
    var i1 = str.indexOf(begin) + begin.length;
    var i2 = str.indexOf(end, i1);
    return str.substring(i1, i2);
  },
  serialize: (form) => {
    if (!form || form.nodeName !== "FORM") {
      return;
    }
    var i, j, q = [];
    for (i = form.elements.length - 1; i >= 0; i = i - 1) {
      if (form.elements[i].name === "") {
        continue;
      }
      switch (form.elements[i].nodeName) {
        case 'INPUT':
          switch (form.elements[i].type) {
            case 'text':
            case 'hidden':
            case 'password':
            case 'button':
            case 'reset':
            case 'submit':
              q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
                i].value));
              break;
            case 'checkbox':
            case 'radio':
              if (form.elements[i].checked) {
                q.push(form.elements[i].name + "=" + encodeURIComponent(
                  form.elements[i].value));
              }
              break;
            case 'file':
              break;
          }
          break;
        case 'TEXTAREA':
          q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
            i].value));
          break;
        case 'SELECT':
          switch (form.elements[i].type) {
            case 'select-one':
              q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
                i].value));
              break;
            case 'select-multiple':
              for (j = form.elements[i].options.length - 1; j >= 0; j = j -
                1) {
                if (form.elements[i].options[j].selected) {
                  q.push(form.elements[i].name + "=" + encodeURIComponent(
                    form.elements[i].options[j].value));
                }
              }
              break;
          }
          break;
        case 'BUTTON':
          switch (form.elements[i].type) {
            case 'reset':
            case 'submit':
            case 'button':
              q.push(form.elements[i].name + "=" + encodeURIComponent(form.elements[
                i].value));
              break;
          }
          break;
      }
    }
    return q.join("&");
  },
  sendForm: (id) => {
    document.getElementById('errorMessage').textContent = '';
    var form = document.getElementById(id);
    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        var jsonResponse = JSON.parse(xhr.responseText);
        if (jsonResponse.error === "FAIL") {
          document.getElementById('errorMessage').textContent =
            jsonResponse.msg;
          window.siscop.load();
        } else {
          console.log('Sucesso');
        }
      }
    };
    xhr.send(data);
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
  }
};
