var COLLECTION = [
  {id: 1,  name: "Generate some ideas", completed: true },
  {id: 2, name: "Learn JavaScript", completed: false}, 
  {id: 3, name: "Learn JavaScript even better", completed: false},
  {id: 4, name: "Learn Test-Driven Development", completed: false},
  {id: 5, name: "Build something meaningful", completed: false}
];

for(var i = 6; i <= 500; i++) {
  COLLECTION.push({id: i, name: "TASK " + i, completed: false});
}
var Input = ()  => {
  return jsHTML.input({type: "text", placeholder: "Task name"}, null);
}

var Button = () => {
  return jsHTML.button({}, "Add task");
}

var Form = (props) => {
  
  function pushTask(val) {
    COLLECTION.push({
      id: COLLECTION.length + 1,
      name: val,
      completed: false
    });
  }

  function handleAddTask(e) {
    e.preventDefault();
    var value = e.target[0].value;
    if(value) {
      pushTask(value);
      pubsub.triggerEvent("render", COLLECTION);
    }
  }

  var componentEvents = {
    "submit": handleAddTask
  };

  var form = jsHTML.form({}, [Input(), Button()]);
  jsHTML.addEvents(form, componentEvents);

  return form;
}

var StateButton = (props) => {
  return jsHTML.button({
    className: props.cssClass, 
    "data-id": props.id
  }, props.symbol);
}

var Task = (props) => {
  var buttonsData = [
    { cssClass: "complete", symbol: "✓", id: props.id },
    { cssClass: "remove", symbol: "x", id: props.id }
  ];

  var list = buttonsData.map(data => StateButton(data));
  list.unshift(jsHTML.text(props.name + " "));

  return jsHTML.li({className: props.completed ? "completed" : "false"}, list);
}

var TaskList = (props) => {
  var list = props.collection.map(task => {
    return Task(task);
  });

  function removeElement(id) {
    if(confirm("Are you sure?")) {
      COLLECTION = COLLECTION.filter(task => {
        if(task.id !== id) return task;
      });
    }
  }

  function handleRemoveElement(e) {
    var id = +e.target.dataset.id;
    removeElement(id);
    jsHTML.dispatcher.dispatch("render", COLLECTION);
  }

  function completeTask(id) {
    COLLECTION = COLLECTION.map((task) => {
      if(task.id === id) {
        task.completed = true;
      }
      return task;
    });
  }

  function handleCompletedTask(e) {
    var id = +e.target.dataset.id;
    completeTask(id);
    jsHTML.dispatcher.dispatch("render", COLLECTION);
  }

  function handleTaskChange(e) {
    var name = e.target.className;
    switch(name) {
      case "complete":
        handleCompletedTask(e);
        break;
      case "remove":
        handleRemoveElement(e);
        break;
    }
  }
  
  var componentEvents = {
    "click": handleTaskChange
  };

  var ul = jsHTML.ul({}, list);
  jsHTML.addEvents(ul, componentEvents);

  return ul;
}

var DetailSpan = (props) => {
  return jsHTML.span({}, props.name + ": " + props.status);
}

var TaskDetails = (props) => {

  var total = props.collection.length;
  var completed = props.collection.reduce((count, curr) => {
    return curr.completed ? count + 1 : count;
  }, 0);

  var uncompleted = props.collection.reduce((count, curr) => {
    return !curr.completed ? count + 1 : count;
  }, 0);

  var buttonContent = [
    { name: "Total", status: total },
    { name: "Completed", status: completed },
    { name: "Uncompleted", status: uncompleted }
  ];
  
  var list = buttonContent.map((button) => {
    return DetailSpan(button);
  });

  return jsHTML.div({className: "details"}, list);
}

var App = (props) => {
  return (
      jsHTML.div({}, [
        Form(), 
        TaskList({collection: props.collection}),
        TaskDetails({ collection: props.collection })
      ])
  );
}

jsHTML.dispatcher.subscribe("render", function(collection) {
  console.time();
  jsHTML.render(App({ collection }), ".container");
  console.timeEnd();
});

jsHTML.dispatcher.dispatch("render", COLLECTION);
