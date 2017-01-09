(function(lib) {
  if(typeof module === "object" && typeof exports === "object") {
    module.exports = lib();
  } else if(typeof define === "function" && define.amd) {
    return define([], lib);
  } else {
    window.jsHTML = lib();
  }
})(function() {

  "use strict";

  var ELEMENTS = ['a', 'address', 'applet', 'area', 'article', 'aside', 'base', 
    'basefont', 'bgsound', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 
    'center', 'col', 'colgroup', 'dd', 'details', 'dir', 'div', 'dl', 'dt', 
    'embed', 'fieldset', 'figcaption', 'figure', 'footer', 'form', 'frame', 
    'frameset', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 
    'hr', 'html', 'iframe', 'img', 'input', 'isindex', 'li', 'link', 'listing', 
    'main', 'marquee', 'menu', 'menuitem', 'meta', 'nav', 'noembed', 'noframes', 
    'noscript', 'object', 'ol', 'p', 'param', 'plaintext', 'pre', 'span', 'script',
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

  function text(content) {
    return document.createTextNode(content);
  }

  function addElement(tag) {
    tag = tag.toLowerCase();
    this[tag] = this[tag] || createNode(tag);
    return this;
  }

  function addEvents(node, events) {
    if(node && events) {
      for(let prop in events) {
        node.addEventListener(prop, events[prop]);
      }
    }
  }

  function renderIfDifferent(newNodes, container) {
    if(newNodes.outerHTML === container.innerHTML) {
      return;
    } else {
      container.innerHTML = "";
      container.appendChild(newNodes);
    }
  }

  function render(node, selector) {
    var element = (
        typeof selector === "string" ? 
        document.querySelector(selector) : selector
    );

    if(element) {
      renderIfDifferent(node, element);
    } else {
      console.log("Couldn't find DOM node based on provided selector " + selector);
    }
  }

  var Dispatcher = {
    handlers: {},

    subscribe: function(name, cb) {
      this.handlers[name] = this.handlers[name] || [];
      this.handlers[name].push(cb);
    },

    dispatch: function(name, data) {
      if(this.handlers[name]) {
        this.handlers[name].forEach(function(cb) {
          cb(data);
        });
      }
    },

    flush: function(name) {
      if(this.handlers[name]) {
        this.handlers[name] = [];
      }
    }
  }

  var API = {
    addTag: addElement,
    text: text,
    addEvents: addEvents,
    dispatcher: Dispatcher,
    render: render
  }

  ELEMENTS.forEach(tag => API[tag] = createNode(tag));

  return API;

});
