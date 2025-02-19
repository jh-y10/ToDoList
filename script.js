let $taskInput = document.getElementById("task-input");
let $addButton = document.getElementById("add-button");
let $taskTabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let filterList = [];
let list = [];
let mode = "all";

$addButton.addEventListener("click", addTask);
for (let i = 1; i < $taskTabs.length; i++) {
  $taskTabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}
console.log($taskTabs);

function addTask() {
  if (!$taskInput.value || $taskInput.value.includes(" ")) {
    alert("할 일을 입력해주세요.");
    $taskInput.value = "";
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: $taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  $taskInput.value = "";
  render();
}

function render() {
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      resultHTML += `<div class="task">
          <div class="task-item task-done">${list[i].taskContent}</div>
          <div>
            <button class="task-button check-button" onclick="toggleComplete('${list[i].id}')">
              <i class="fa-solid fa-rotate-left"></i>
            </button>
            <button class="task-button delete-button" onclick="deleteTask('${list[i].id}')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>`;
    } else {
      resultHTML += `<div class="task">
          <div class="task-item">${list[i].taskContent}</div>
          <div>
            <button class="task-button check-button" onclick="toggleComplete('${list[i].id}')">
              <i class="fa-solid fa-check"></i>
            </button>
            <button class="task-button delete-button" onclick="deleteTask('${list[i].id}')">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice([i], 1);
      break;
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    mode = event.target.id;
  }
  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
