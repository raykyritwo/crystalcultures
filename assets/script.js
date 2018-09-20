function hash(str) {
  var hash = 5381;
  var i = str.length;
  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }
  return hash >>> 0;
}

function distribute(x) {
  return Math.atan(2 * Math.PI * (x - 0.5)) / 2 + 0.5;
}

function doLayout() {
  var containerWidth = $('.container').innerWidth();
  $('.item').each(function(index, item) {
    var $item = $(item);
    var text = $item.hasClass('new-item') ? $('.content').text() : $item.text();
    var width = $item.outerWidth();
    var randFloat = (hash(text) % 10000) / 10000;
    var offset = distribute(randFloat) * (containerWidth - width);
    $item.css({
      position: "relative",
      left: offset,
    }).addClass("visible");
  });
}

function debounce(fn, timeout) {
  return function() {
    if (window.timeoutActive) {
      window.callAgain = true;
    } else {
      window.timeoutActive = true;
      fn();
      setTimeout(function() {
        if (window.callAgain) fn();
        window.timeoutActive = false;
        window.callAgain = false;
      }, timeout);
    }
  }
}

// hmm, something that you start to realize after writing a lot of user
// interface code is that you can only think procedurally. but it's not
// very helpful to maximize chunked concept density when you're pushing
// around data structures three layers of abstraction deep while trying
// to implement an algorithm on top

$(document).ready(doLayout);
$(window).resize(debounce(doLayout, 200));
