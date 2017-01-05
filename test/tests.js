var { 
  describe, isTrue, isFalse, equal, 
  arraysEqual, objectsEqual, nodesEqual,
  nodesNotEqual, run 
} = Assert;


describe("jsHTML", function() {
  var testTree = document.createElement("header");
  var h1 = document.createElement("h1");
  var nav = document.createElement("nav");
  testTree.appendChild(h1);
  testTree.appendChild(nav);
  
  var tree = jsHTML.header({}, [jsHTML.h1({}, null), jsHTML.nav({}, null)]);
  nodesEqual(tree, testTree, "it should pass since both trees contain same structure and elements");

  var span = jsHTML.span({}, "hello");
  var testSpan = document.createElement("span");
  var testTextNode = document.createTextNode("hello");
  testSpan.appendChild(testTextNode);

  nodesEqual(span, testSpan, "it should pass since both are span elements and have word 'hello' in it");

  var p = jsHTML.p({className: "description"}, "Lorem ipsum dolor sit amet adipisicing...")
  var testP = document.createElement("p");
  testP.setAttribute("class", "description");
  var testPTextNode = document.createTextNode("Lorem ipsum dolor sit amet adipisicing...");
  testP.appendChild(testPTextNode);

  nodesEqual(p, testP, "it should pass since both elements have class 'description' and same content");

  var section = jsHTML.section({className: "intro"}, "Intro content");
  console.log(section);
  var testSection = document.createElement("section");

  nodesNotEqual(section, testSection, "it should pass since elements are different");
});

run("#container");
