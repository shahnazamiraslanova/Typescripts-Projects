const form = document.querySelector<HTMLFormElement>("form");
const input = document.querySelector<HTMLInputElement>('input');
const div = document.querySelector<HTMLDivElement>("div");
let tasks: Task[] = JSON.parse(localStorage?.getItem("TASKS") || "[]");


interface Task {
    id: string;
    title: string;
    isCompleted: boolean;
}

function addTask(): void {
    if (input) {
        const task: Task = {
            id: Date.now().toString(),
            title: input.value,
            isCompleted: false
        };

        tasks.push(task);
        console.log(tasks);
        localStorage.setItem("TASKS", JSON.stringify(tasks));


    }

}
function showTasks(): void {
    if (div) {
        div.innerHTML = ''
        tasks.map((item) => {
            div.innerHTML += `<div class= "${item.isCompleted ? "complatedCard" : "card"}">
            <h1>${item.title}</h1>
           <div class="buttons"> 
           <button class="complate" onclick="complateTask(${item.id})"> ${item.isCompleted ? "Complated!" : "Complate"} </button>
           <button class="delete" onclick="deleteTask(${item.id})"> Delete! </button>
           </div>
            </div>
            `
        })
    }
}
function complateTask(ID: string): void {
    tasks.forEach((item) => {
        if (item.id == ID) {
            item.isCompleted = !item.isCompleted;
            console.log(item);
            localStorage.setItem("TASKS", JSON.stringify(tasks));


        }
    })
    showTasks()
}

function deleteTask(ID: string): void {
    tasks = tasks.filter((item) => item.id != ID)
    localStorage.setItem("TASKS", JSON.stringify(tasks));
    showTasks()

}

form?.addEventListener("submit", (e) => {
    e.preventDefault();
    addTask()
    if (input) input.value = "";
    showTasks()


});

showTasks();