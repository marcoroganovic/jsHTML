var jsHTML = (function() {

  "use strict";

  var ELEMENTS = ['address', 'applet', 'area', 'article', 'aside', 'base', 
    'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'caption', 
    'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 
    'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 
    'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 
    'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 
    'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 
    'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'script', 
    'section', 'select', 'source', 'style', 'summary', 'table', 'tbody', 'td', 
    'template', 'textarea', 'tfoot', 'th', 'thead', 'title', 'tr', 'track', 
    'ul', 'wbr', 'xmp'];

  function is(type, arg) {
    return typeof arg === type;
  }

  function isString(arg) {
    return is("string", arg);
  }

  function isFunction(arg) {
    return is("function", arg);
  }

  function isArray(arg) {
    return Array.isArray(arg);
  }
  
  function assignAttrs(el, attrs) {
    for(let prop in attrs) {
      if(Object.hasOwnProperty.call(attrs, prop)) {
        el.setAttribute((prop === "className" ? "class" : prop), attrs[prop]);
      }
    }
    return el;
  }

  function appendNodes(el, textOrNodes) {
    if(textOrNodes === null) {
      return el;
    } else if(isString(textOrNodes)) {
      var text = document.createTextNode(textOrNodes);
      el.appendChild(text);
    } else if(isArray(textOrNodes)) {
      textOrNodes.forEach(node => {
        if(node.nodeType) el.appendChild(node);
      });
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
  ELEMENTS.forEach(tag => api[tag] = createNode(tag));

  return api;
})();
