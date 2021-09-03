
export function importAsync(src, callback) {
  var s, r, t; r = false;
  s = document.createElement('script');
  // s.type = 'text/javascript';
  s.type = 'module';
  s.src = src;
  s.onload = s.onreadystatechange = function() {
    if ( !r && (!this.readyState || this.readyState == 'complete') )
    {
      r = true;
      callback();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

export function loadAsync(src, callback) {
  var s, r, t; r = false;
  s = document.createElement('script');
  s.type = 'text/javascript';
  s.src = src;
  s.onload = s.onreadystatechange = function() {
    if ( !r && (!this.readyState || this.readyState == 'complete') )
    {
      r = true;
      callback();
    }
  };
  t = document.getElementsByTagName('script')[0];
  t.parentNode.insertBefore(s, t);
}

export var QueryUrl = function () {
  var query_string = {};
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (typeof query_string[pair[0]] === 'undefined') {
      query_string[pair[0]] = decodeURIComponent(pair[1]);
    } else if (typeof query_string[pair[0]] === 'string') {
      var arr = [query_string[pair[0]], decodeURIComponent(pair[1])];
      query_string[pair[0]] = arr;
    } else {
      query_string[pair[0]].push(decodeURIComponent(pair[1]));
    }
  }
  return query_string;
};

export function isMobile() {
  const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
  ];
  
  return toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
  });
}

export let convert = {
  PER_TO_PIX: function(v) {
      var o = window.innerWidth / 100;
      return v * o;
  },
  PIX_TO_PER: function(v) {
      var o = window.innerWidth / 100;
      return v / o;
  },
  PER_TO_PIY: function(v) {
      var o = window.innerHeight / 100;
      return v * o;
  },
  PIY_TO_PER: function(v) {
      var o = window.innerHeight / 100;
      return v / o;
  }
};