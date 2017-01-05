var { ul, li, form, input, button } = jsHTML;

var collection = [
  {id: 1, name: "Learn JavaScript"}, 
  {id: 2, name: "Learn JavaScript even better"},
  {id: 3, name: "Learn Test-Driven Development"},
  {id: 4, name: "Build something meaningful"}
];

var inputEl = input({}, null);
var buttonEl = button({}, "Add");
var formEl = form({}, [inputEl, buttonEl]);

var list = collection.map(task => li({"data-id": task.id}, task.name));
var ulEl = ul({}, list);

function render(arr) {
  document.body.innerHTML = "";
  arr.forEach(el => document.body.appendChild(el));
}

render([formEl, ulEl]);
