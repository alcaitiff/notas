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
  }
};
