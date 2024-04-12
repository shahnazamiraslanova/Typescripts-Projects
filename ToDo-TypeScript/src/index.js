var form = document.querySelector("form");
var input = document.querySelector('input');
var div = document.querySelector("div");
var tasks = JSON.parse((localStorage === null || localStorage === void 0 ? void 0 : localStorage.getItem("TASKS")) || "[]");
function addTask() {
    if (input) {
        var task = {
            id: Date.now().toString(),
            title: input.value,
            isCompleted: false
        };
        tasks.push(task);
        console.log(tasks);
        localStorage.setItem("TASKS", JSON.stringify(tasks));
    }
}
function showTasks() {
    if (div) {
        div.innerHTML = '';
        tasks.map(function (item) {
            div.innerHTML += "<div class= \"".concat(item.isCompleted ? "complatedCard" : "card", "\">\n            <h1>").concat(item.title, "</h1>\n           <div class=\"buttons\"> \n           <button class=\"complate\" onclick=\"complateTask(").concat(item.id, ")\"> ").concat(item.isCompleted ? "Complated!" : "Complate", " </button>\n           <button class=\"delete\" onclick=\"deleteTask(").concat(item.id, ")\"> Delete! </button>\n           </div>\n            </div>\n            ");
        });
    }
}
function complateTask(ID) {
    tasks.forEach(function (item) {
        if (item.id == ID) {
            item.isCompleted = !item.isCompleted;
            console.log(item);
            localStorage.setItem("TASKS", JSON.stringify(tasks));
        }
    });
    showTasks();
}
function deleteTask(ID) {
    tasks = tasks.filter(function (item) { return item.id != ID; });
    localStorage.setItem("TASKS", JSON.stringify(tasks));
    showTasks();
}
form === null || form === void 0 ? void 0 : form.addEventListener("submit", function (e) {
    e.preventDefault();
    addTask();
    if (input)
        input.value = "";
    showTasks();
});
showTasks();
