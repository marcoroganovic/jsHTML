var jsHTML = (function() {
  
  var ELEMENTS = "p ul li h1 h2 h3 h4 h5 h6 ";
  ELEMENTS += "div section article header aside footer ";
  ELEMENTS += "span mark table th tr td form input button";
  ELEMENTS = ELEMENTS.split( );

  function assignAttrs(el, attrs) {
    for(let prop in attrs) {
      if(prop === "className") {
        el.setAttribute("class", attrs[prop]);
      } else {
        el.setAttribute(prop, attrs[prop]);
      }
    }
    return el;
  }

  function appendNodes(el, textOrNodes) {
    if(textOrNodes === null) {
      return el;
    } else if(typeof textOrNodes === "string") {
      var text = document.createTextNode(textOrNodes);
      el.appendChild(text);
    } else if(Array.isArray(textOrNodes)) {
      textOrNodes.forEach(node => el.appendChild(node));
    } else {
      el.appendChild(textOrNodes);
    }
    return el;
  }

  function createNode(el) {
    var elName = el;
    return function(attrs, textOrNodes) {
      var node = document.createElement(elName);
      node = assignAttrs(node, attrs);
      node = appendNodes(node, textOrNodes);
      return node;
    }
  }

  var api = {};
  ELEMENTS.forEach(element => api[element] = createNode(element));

  return api;

})();
