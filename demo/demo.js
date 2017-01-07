var { ul, li, form, input, button } = jsHTML;

var COLLECTION = [
  {id: 1, name: "Learn JavaScript"}, 
  {id: 2, name: "Learn JavaScript even better"},
  {id: 3, name: "Learn Test-Driven Development"},
  {id: 4, name: "Build something meaningful"}
];

var pubsub = {

  handlers: {},

  sub: function(type, cb) {
    this.handlers[type] = this.handlers[type] || [];
    this.handlers[type].push(cb);
  },
  
  trigger: function(type, obj) {
    if(this.handlers[type]) {
      this.handlers[type].forEach(fn => fn(obj));
    }
  }
}

var Input = ()  => {
  return jsHTML.input({type: "text", placeholder: "Task name"}, null);
}

var Button = () => {
  return jsHTML.button({}, "Add task");
}

var Form = (props) => {
  
  function addTask(e) {
    e.preventDefault();
    var value = e.target[0].value;
    if(value) {
      COLLECTION.push({
        id: collection.length + 1,
        name: value
      });

      pubsub.trigger("render", COLLECTION);
    }
  }

  var componentEvents = {
    "submit": addTask
  };

  var form = jsHTML.form({}, [Input(), Button()]);
  jsHTML.addEvents(form, componentEvents);

  return form;
}

var Task = (props) => {
  return jsHTML.li({"data-id": props.id}, props.name);
}

var TaskList = (props) => {
  var list = props.collection.map(task => {
    return Task(task);
  });

  function removeElement(e) {
    var name = e.target.nodeName.toLowerCase();
    if(name === "li") {
      var id = +e.target.dataset.id;
      if(confirm("Are you sure?")) {
        COLLECTION = COLLECTION.filter(task => {
          if(task.id !== id) return task
        });
      }
      pubsub.trigger("render", COLLECTION);
    }
  }
  
  var componentEvents = {
    "click": removeElement
  };

  var ul = jsHTML.ul({}, list);
  jsHTML.addEvents(ul, componentEvents);

  return ul;
}

var App = (props) => {
  return (
      jsHTML.div({}, [
        Form(), 
        TaskList({collection: props.collection})
      ])
  );
}

pubsub.sub("render", function(collection) {
  jsHTML.render(App({ collection }), ".container");
});

jsHTML.render(App({ collection: COLLECTION }), ".container");
