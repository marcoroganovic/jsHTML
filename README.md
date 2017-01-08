## Small library for creating DOM elements via function calls

You can see how this library is used to build an application
[here](https://github.com/marcoroganovic/todo-app/).

### Example 1

```javascript
var data = [ 
  { id: 1, name: "Learn JavaScript" },
  { id: 2, name: "Learn JavaScript even better" },
  { id: 3, name: "Learn testing" }
];

var list = data.map(task => jsHTML.li({"data-id": task.id}, task.name));
var ul = jsHTML.ul({ className: "todo" }, list);

console.log(ul); // Should result in

<ul class="todo">
  <li data-id="1">Learn JavaScript</li>
  <li data-id="2">Learn JavaScript even better</li>
  <li data-id="3">Learn testing</li>
</ul>
```

### Example 2
```javascript
const Link = (props) => {
  return jsHTML.a({ href: `${props.href}.html` }, `${props.name}`);
}

const Navigation = (props) => {
  var links = props.links;
  var list = links.map(link => Link(link));
  
  return jsHTML.nav({ className: "navigation" }, list);
}

const props = {
  links: [
    { name: "Home", href: "index" }, 
    { name: "About", href: "about" }, 
    { name: "Contact", href: "contact" }
  ]
}

console.log(Navigation(props)); // Should result in

<nav class="navigation">
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
```
