var { 
  describe, isTrue, isFalse, equal, 
  arraysEqual, objectsEqual, nodesEqual,
  nodesNotEqual, run 
} = Assert;

var p = jsHTML.p({}, null);
var pTest = document.createElement("p");

describe("jsHTML", function() {

  nodesEqual(p, pTest, "it should return plain element when first argument is empty object and second is null");
  
  p = jsHTML.p({}, "hello");
  pTest.appendChild(document.createTextNode("hello"));

  nodesEqual(p, pTest, "it should pass since both elements have same content in them but no attributes");

  p = jsHTML.p({className: "description"}, "hello");
  pTest.setAttribute("class", "description");
  
  nodesEqual(p, pTest, "it should pass since both elements have class attribute with same value and same inner content");

  p = jsHTML.p({}, jsHTML.span({}, "Span Element"));
  pTest = document.createElement("p");
  span = document.createElement("span");
  spanText = document.createTextNode("Span Element");
  span.appendChild(spanText);
  pTest.appendChild(span);

  nodesEqual(p, pTest, "it should nest element inside when second argument is actual DOM node");

  p = jsHTML.p({}, "");
  pTest = document.createElement("p");
  pTest.appendChild(document.createTextNode(""));

  nodesEqual(p, pTest, "it should return empty element when first argument is empty object and second is empty string");
  nodesNotEqual(p, span, "it should return false when we are comparing different elements");
});

run("#container");
