class todo {
  constructor(task, date, priority) {
    this.task = task;
    this.priority = priority;
    this.date = new Date(date);
  }
}

var todo_list = [];

$(document).ready(function () {
  $(document).on("click", ".remove_task", function () {
    $(this).parent().remove();
  });

  setInterval(() => {
    var elementsList = $("#list").children();
    if (elementsList.length == 0) {
      $(".no_tasks").css({
        display: "block",
      });
    } else {
      $(".no_tasks").css({
        display: "none",
      });
    }
  }, 10);

  $("#list").on("click", ".task button", function () {
    var index = $(this).closest(".task").index(); // Get the index of the clicked child
    todo_list.splice(index, 1);
  });
});

function addTask() {
  var colors = ["lightgreen", "lightyellow", "pink"];
  console.log("add task called")

  var task = $("#task-text").val();
  var date = $("#date").val();
  var pri = parseInt($("#priority").val());



  todo_list.push(new todo(task, date, pri));





  todo_list.sort(function (a, b) {
    return a.priority - b.priority;
  });
  todo_list.sort(function (a, b) {
    return a.date - b.date;
  });




  $("#list").empty();

  for (let i in todo_list) {
    var newElement = `    <li class="task" style = 'background-color:${
      colors[todo_list[i].priority - 1]
    }'>
                            <div class="task-details">
                                <h1>${todo_list[i].task}</h1>
                                <p>Deadline: ${
                                  todo_list[i].date.getDate() +
                                  "-" +
                                  todo_list[i].date.getMonth() +
                                  "-" +
                                  todo_list[i].date.getFullYear()
                                }</p>
                            </div>
                            <button class="remove_task"><i class="fa-solid fa-x"></i></button>
                        </li>`;
    $("#list").append(newElement);
  }
  $("#task-text").val("");
  $("#date").val("");
  $("#priority").val("");
}
