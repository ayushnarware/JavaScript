document.getElementById('add-task-btn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('task-input');
    const imageInput = document.getElementById('image-input');
    const taskText = taskInput.value;
    const imageFile = imageInput.files[0];

    if (taskText && imageFile) {
        const taskList = document.getElementById('task-list');
        
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        const reader = new FileReader();
        reader.onload = function () {
            const imgElement = document.createElement('img');
            imgElement.src = reader.result;
            taskItem.appendChild(imgElement);

            const taskTextElement = document.createElement('span');
            taskTextElement.classList.add('task-text');
            taskTextElement.textContent = taskText;
            taskItem.appendChild(taskTextElement);

            const iconsContainer = document.createElement('div');
            iconsContainer.classList.add('task-icons');
            
            const completeIcon = document.createElement('span');
            completeIcon.textContent = '✔';
            completeIcon.addEventListener('click', () => taskItem.classList.toggle('completed'));
            iconsContainer.appendChild(completeIcon);

            const deleteIcon = document.createElement('span');
            deleteIcon.textContent = '✖';
            deleteIcon.addEventListener('click', () => taskList.removeChild(taskItem));
            iconsContainer.appendChild(deleteIcon);

            taskItem.appendChild(iconsContainer);
            taskList.appendChild(taskItem);

            taskInput.value = '';
            imageInput.value = '';
        };

        reader.readAsDataURL(imageFile);
    } else {
        alert('Please enter a task and select an image.');
    }
}
