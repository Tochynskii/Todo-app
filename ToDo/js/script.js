// localStorage.clear()
const taskInput = document.querySelector('.input')
const addBtn = document.querySelector('.addtask__add-btn')
const todoList = document.querySelector('.todo-list')

addBtn.addEventListener('click', addTask)
todoList.addEventListener('click', deleteTodo)
document.addEventListener('DOMContentLoaded', getTodos)


function addTask(e) {
	e.preventDefault()
	const todoText = taskInput.value
	if (todoText) {
		const newTodo = document.createElement('li')
		newTodo.classList.add('todo-list__item')

		const check = document.createElement('button')
		check.classList.add('todo-list__check')
		newTodo.appendChild(check)
		check.addEventListener('click', () => {
			check.classList.toggle('completed')
			text.style.color = 'rgb(179, 179, 179)'
			text.style.textDecoration = 'line-through'
			todoList.appendChild(newTodo)
			toStorage()

			if (!check.classList.contains('completed')) {
				text.style.color = '#000'
				text.style.textDecoration = 'none'
			}
		})
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

function deleteTodo(e) {
	const item = e.target
	if (item.classList[0] === 'todo-list__btn-delete') {
		const todo = item.parentElement
		todo.classList.add('delete')
		setTimeout(() => {
			if (todo.classList.contains('delete')) {
				todo.remove()
			}
		}, 300)
		removeLocalTodo(todo)

	}

}

function toStorage() {
	const todosEl = document.querySelectorAll('li')
	const todos = []
	todosEl.forEach(todoEl => {

		todos.push({
			text: todoEl.innerText,
			completed: todoEl.children[0].classList.contains('completed')
		})
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
		check.addEventListener('click', () => {
			check.classList.toggle('completed')
			text.style.color = 'rgb(179, 179, 179)'
			text.style.textDecoration = 'line-through'
			todoList.appendChild(newTodo)

			toStorage()

			if (!check.classList.contains('completed')) {
				text.style.color = '#000'
				text.style.textDecoration = 'none'
			}
		})
		

		const text = document.createElement('p')
		text.classList.add('todo-list__text')
		text.innerText = todo.text
		newTodo.appendChild(text)

		const delBtn = document.createElement('button')
		delBtn.classList.add('todo-list__btn-delete')
		newTodo.appendChild(delBtn)
		delBtn.addEventListener('click', () => {
			newTodo.classList.add('delete')
			setTimeout(() => {
				if (newTodo.classList.contains('delete')) {
					newTodo.remove()
				}
			}, 300)

		})
		if (todo.completed) {
			check.classList.add('completed')
			text.style.color = 'rgb(179, 179, 179)'
			text.style.textDecoration = 'line-through'
		} else {
			text.style.color = '#000'
			text.style.textDecoration = 'none'
		}
		// todoList.insertBefore(newTodo, todoList.firstChild)
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








