# Small library for create DOM structure via function calls

### Example

```javascript
var data = [ 
  { id: 1, task: "Learn JavaScript" },
  { id: 2, task: "Learn JavaScript even better" },
  { id: 3, task: "Learn to test cdoe" }
];

var list = data.map(task => jsHTML.li({"data-id": task.id}, task.name));
var ul = jsHTML.ul({ className: "todo" }, list);

// Should result in

<ul class="todo">
  <li data-id="1">Learn JavaScript</li>
  <li data-id="2">Learn JavaScript even better</li>
  <li data-id="3">Learn to test code</li>
</ul>
```
