async function loadTasks() {

    const response = await fetch("/api/tasks");
    const tasks = await response.json();

    const list = document.getElementById("taskList");

    list.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.textContent = task.name;

        const btn = document.createElement("button");

        btn.textContent = "Delete";

        btn.onclick = () => deleteTask(task.id);

        li.appendChild(btn);

        list.appendChild(li);

    });
}

async function addTask() {

    const input = document.getElementById("taskInput");

    await fetch("/api/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: input.value })
    });

    input.value = "";

    loadTasks();
}

async function deleteTask(id) {

    await fetch("/api/tasks/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();