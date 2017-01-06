var { 
  describe, isTrue, isFalse, equal, 
  arraysEqual, objectsEqual, nodesEqual,
  nodesNotEqual, run 
} = Assert;

var p = jsHTML.p({}, null);
var pTest = document.createElement("p");

var ul = jsHTML.ul({}, []);
var ulTest = document.createElement("ul");

var li1 = jsHTML.li({}, "Task 1");
var li2 = jsHTML.li({}, "Task 2");

var li1Test = document.createElement("li");
li1Test.appendChild(document.createTextNode("Task 1"));

var li2Test = document.createElement("li");
li2Test.appendChild(document.createTextNode("Task 2"));

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

  nodesEqual(ul, ulTest, "it should return empty ul  when second artument is empty array");

  ul = jsHTML.ul({}, [li1, li2]);
  ulTest.appendChild(li1Test);
  ulTest.appendChild(li2Test);
  console.log(ul);
  console.log(ulTest);
  nodesEqual(ul, ulTest, "it should append elements to parent when second argument is array that contains DOM nodes");
});

run("#container");
