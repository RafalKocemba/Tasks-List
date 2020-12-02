const form = document.querySelector('form')
const btnAddTask = document.querySelector('.add')
const inputAddTask = document.querySelector('.addTask input')
const ulTasks = document.querySelector('.tasks ul')
const ulDone = document.querySelector('.done ul')
const inputSearch = document.querySelector('.search input')
const ulSearchList = document.querySelector('.searchList ul')
const h1Done = document.querySelector('main h1')
let btnDelete;
let tasksList = [];
let doneList = [];
let searchList = [];

const refreshList = (ul, list) => {
    ul.textContent = '';
    list.forEach((li, key) => {
        ul.appendChild(li);
        li.dataset.key = key;
    })
}

const btnEvent = (el, cl, fn) => {
    el = [...document.getElementsByClassName(cl)]
    el.forEach(btn => btn.addEventListener('click', fn))
}

const btnAcceptAnimation = () => {
    if (h1Done.classList.contains('move')) return
    h1Done.classList.add('move')
    setTimeout(() => {
        h1Done.classList.remove('move')
    }, 2000);
}

const addTask = (e) => {
    e.preventDefault();
    if (inputAddTask.value == '') return
    const liTasks = document.createElement('li');
    liTasks.innerHTML = `<span class="accept">V</span><span class="delete">X</span>${inputAddTask.value}`
    tasksList.unshift(liTasks)
    inputAddTask.value = ''
    refreshList(ulTasks, tasksList);
    const btnDone = [...document.getElementsByClassName('accept')]
    btnDone.forEach(btn => btn.addEventListener('click', doneTask))
    btnEvent(btnDelete, 'delete', deleteTask)
    const btnAccept = [...document.getElementsByClassName('accept')]
    btnAccept.forEach(btn => btn.addEventListener('click', btnAcceptAnimation))


}

const doneTask = (e) => {
    const textTask = e.target.parentNode.textContent.slice(2);
    const indexTask = e.target.parentNode.dataset.key;
    const liDone = document.createElement('li');
    liDone.innerHTML = `<span class="delete">X</span>${textTask}`
    liDone.classList.add('doneList')
    doneList.unshift(liDone);
    refreshList(ulDone, doneList);
    tasksList.splice(indexTask, 1)
    refreshList(ulTasks, tasksList);
    btnEvent(btnDelete, 'delete', deleteTask)
}

const deleteTask = (e) => {
    const indexTask = e.target.parentNode.dataset.key;
    if (e.target.parentNode.classList.contains('doneList')) {
        doneList.splice(indexTask, 1)
        refreshList(ulDone, doneList);
    } else {
        tasksList.splice(indexTask, 1)
        refreshList(ulTasks, tasksList);
    }
}

const searchTask = (e) => {
    searchList = []
    ulSearchList.textContent = ''
    let inputValue = e.target.value.toLowerCase()
    if (inputValue == '') return
    const includeValue = tasksList.filter(li => li.textContent.toLowerCase().includes(inputValue))
    includeValue.forEach(li => {
        const text = li.textContent.slice(2)
        const listElement = document.createElement('li')
        listElement.textContent = text
        searchList.push(listElement)
    })
    const includeContent = doneList.filter(li => li.textContent.toLowerCase().includes(inputValue))
    includeContent.forEach(li => {
        const text = li.textContent.slice(1)
        const listEl = document.createElement('li')
        listEl.textContent = text
        listEl.classList.add('doneSearch')
        searchList.push(listEl)
    })
    refreshList(ulSearchList, searchList)
}

const btnAddAnimation = () => {
    if (inputAddTask.value == '' || btnAddTask.classList.contains('active')) return
    btnAddTask.classList.add('active')
    setTimeout(() => {
        btnAddTask.classList.remove('active')
    }, 1500);
}


inputSearch.addEventListener('input', searchTask)
form.addEventListener('submit', addTask)
btnAddTask.addEventListener('click', btnAddAnimation)
