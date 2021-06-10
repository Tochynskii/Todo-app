// localStorage.clear()
const taskInput = document.querySelector('.input')
const addBtn = document.querySelector('.addtask__add-btn')
const todoList = document.querySelector('.todo-list')

addBtn.addEventListener('click', addTask)
todoList.addEventListener('click', deleteTodo)
todoList.addEventListener('click', checked)
document.addEventListener('DOMContentLoaded', getTodos)
document.addEventListener('DOMContentLoaded', getTodosFromApi)

function getTodosFromApi() {
	return fetch('https://jsonplaceholder.typicode.com/users/1/todos')
		.then(response => response.json())
		.then(data => {
			if (Array.isArray(data)) {
				data.map(item => {
					createTodoFromApi(item.title, item.completed)
				})
			} else {
				createTodoFromApi(data.title, data.completed)
			}
		}
		)
}

const createTodoFromApi = (txt, checkValue) => {
	const newTodo = document.createElement('li')
	newTodo.classList.add('todo-list__item')
	newTodo.classList.add('item-api')


	const check = document.createElement('button')
	check.classList.add('todo-list__check')
	newTodo.appendChild(check)


	const text = document.createElement('p')
	text.classList.add('todo-list__text')
	text.innerText = txt
	newTodo.appendChild(text)

	const delBtn = document.createElement('button')
	delBtn.classList.add('todo-list__btn-delete')
	newTodo.appendChild(delBtn)

	todoList.appendChild(newTodo)
	if (checkValue) {
		check.classList.add('completed')
		newTodo.style.borderColor = 'rgb(3, 190, 134)'
		text.style.color = 'gray'
		text.style.textDecoration = 'line-through'
	}
}

function addTask(e) {
	e.preventDefault()
	const todoText = taskInput.value
	if (todoText) {
		const newTodo = document.createElement('li')
		newTodo.classList.add('todo-list__item')


		const check = document.createElement('button')
		check.classList.add('todo-list__check')
		newTodo.appendChild(check)

		const text = document.createElement('p')
		text.classList.add('todo-list__text')
		text.innerText = todoText
		newTodo.appendChild(text)

		const delBtn = document.createElement('button')
		delBtn.classList.add('todo-list__btn-delete')
		newTodo.appendChild(delBtn)

		todoList.insertBefore(newTodo, todoList.firstChild)
		taskInput.value = ''
		toStorage()
	}

}

function checked(e) {
	const item = e.target
	if (item.classList.contains('todo-list__check')) {
		const todo = item.parentElement
		item.classList.toggle('completed')
		if (item.classList.contains('completed')) {
			todo.style.borderColor = 'rgb(3, 190, 134)'
			todo.children[1].style.textDecoration = 'line-through'
			todo.children[1].style.color = 'gray'
		} else {
			todo.style.borderColor = 'rgb(0, 142, 216)'
			todo.children[1].style.textDecoration = 'none'
			todo.children[1].style.color = '#000'
		}
		toStorage()
	}
}


function deleteTodo(e) {
	const item = e.target
	if (item.classList.contains('todo-list__btn-delete')) {
		const todo = item.parentElement
		todo.classList.add('delete')
		setTimeout(() => {
			if (todo.classList.contains('delete')) {
				todo.remove()
			}
		}, 300)
		if (!todo.classList.contains('item-api')) {	
			removeLocalTodo(todo)
		}
	}

}

function toStorage() {
	const todosEl = document.querySelectorAll('li')
	const todos = []
		todosEl.forEach(todoEl => {
			if (!todoEl.classList.contains('item-api')) {
			todos.push({
				text: todoEl.innerText,
				completed: todoEl.children[0].classList.contains('completed')
			})
		}
		})
		localStorage.setItem('todos', JSON.stringify(todos))
	}


function getTodos() {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	todos.forEach(todo => {
		const newTodo = document.createElement('li')
		newTodo.classList.add('todo-list__item')

		const check = document.createElement('button')
		check.classList.add('todo-list__check')
		newTodo.appendChild(check)

		const text = document.createElement('p')
		text.classList.add('todo-list__text')
		text.innerText = todo.text
		newTodo.appendChild(text)

		const delBtn = document.createElement('button')
		delBtn.classList.add('todo-list__btn-delete')
		newTodo.appendChild(delBtn)

		if (todo.completed) {
			check.classList.add('completed')
			newTodo.style.borderColor = 'rgb(3, 190, 134)'
			text.style.color = 'gray'
			text.style.textDecoration = 'line-through'
		}
		todoList.appendChild(newTodo)
	})
}


function removeLocalTodo(todo) {
	let todos
	if (localStorage.getItem('todos') === null) {
		todos = []
	} else {
		todos = JSON.parse(localStorage.getItem('todos'))
	}
	const arrTodo = todos.map(todo => todo.text)
	todos.splice(arrTodo.indexOf(todo.children[1].innerText), 1)
	localStorage.setItem('todos', JSON.stringify(todos))
}








