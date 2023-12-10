import { todos } from './localStorage.js'
import { getCount, countProgress } from './counterTodo.js'
import { setData } from './localStorage.js'
import { render } from './render.js'
import { Todo } from './app.js'
import {
  inputTitleElement,
  textareaDescriptionElement,
  selectUserElement,
  inputColorElement,
  inputEditTitleElement,
  textareaEditDescriptionElement,
  selectEditUserElement,
  inputEditColorElement,
  formElementAdd,
  modalError,
} from './dom.js'
let todoEditId = 0

function handleClickBtnSave(event) {
  event.preventDefault()
  const formData = new FormData(formElementAdd)
  const todo = new Todo(formData)
  todos.push(todo)
  render()
  getCount()
  setData()
  textareaDescriptionElement.value = ''
  inputTitleElement.value = ''
  selectUserElement.value = ''
  inputColorElement.value = '#e2d2f9'
}

function handleChangeSelectStatus(event) {
  if (event.target.tagName === 'SELECT') {
    const liElement = event.target.closest('li')
    if (event.target.value == 'Progress' && countProgress == 6) {
      modalError.show()
    } else {
      todos.forEach((todo) => {
        if (todo.id == liElement.getAttribute('id')) {
          todo.status = event.target.value
        }
      })
    }
  }
  render()
  setData()
  getCount()
}

function handleClickBtnDelete(event) {
  if (event.target.tagName === 'BUTTON') {
    const btn = event.target
    if (btn.classList.contains('btn__group__btn-delete')) {
      const liElementDelete = event.target.closest('li')
      const liElementDeleteId = liElementDelete.getAttribute('id')
      todos.forEach((todo, index) => {
        if (todo.id == liElementDeleteId) {
          todos.splice(index, 1)
        }
      })
    }
    render()
    setData()
    getCount()
  }
}

function handleClickBtnEdit(event) {
  if (event.target.tagName === 'BUTTON') {
    const btn = event.target
    if (btn.classList.contains('btn__group__btn-edit')) {
      const liElementEdit = event.target.closest('li')
      const liElementEditId = liElementEdit.getAttribute('id')
      let todoList = todos.find((todo) => {
        return todo.id == liElementEditId
      })
      todoEditId = liElementEditId
      inputEditTitleElement.value = todoList.title
      textareaEditDescriptionElement.value = todoList.description
      selectEditUserElement.value = todoList.user
      inputEditColorElement.value = todoList.bgColor
    }
    render()
    setData()
    getCount()
  }
}

function handleClickBtnSaveEdit(event) {
  event.preventDefault()
  todos.forEach((todo) => {
    if (todo.id == todoEditId) {
      todo.title = inputEditTitleElement.value
      todo.description = textareaEditDescriptionElement.value
      todo.user = selectEditUserElement.value
      todo.bgColor = inputEditColorElement.value
    }
  })
  render()
  setData()
}

function handleClickBtnDeleteAllDone() {
  let firstIndex = todos.findIndex((todo) => todo.status == 'Done')
  while (firstIndex != -1) {
    todos.splice(firstIndex, 1)
    firstIndex = todos.findIndex((todo) => todo.status == 'Done')
  }
  getCount()
  render()
  setData()
}

export { handleClickBtnSave, handleClickBtnSaveEdit, handleChangeSelectStatus, handleClickBtnDelete, handleClickBtnEdit, handleClickBtnDeleteAllDone }
