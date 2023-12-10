import { clock } from './clock.js'
import { getUser } from './users.js'
import {
  ulContainerElements,
  selectUserElement,
  selectEditUserElement,
  formElementAdd,
  sectionTodoElement,
  sectionProgressElement,
  sectionDoneElement,
  btnDeleteAllDoneElement,
  formElementEdit,
} from './dom.js'
import {
  handleClickBtnSave,
  handleClickBtnSaveEdit,
  handleChangeSelectStatus,
  handleClickBtnDelete,
  handleClickBtnEdit,
  handleClickBtnDeleteAllDone,
} from './handlers.js'

const [ulTodo, ulInProgress, ulDone] = ulContainerElements

function buildTemplateTodo(todo) {
  let className = ''
  let liElementColor = ''
  if (todo.status == 'Todo') {
    className = 'todo__ul__li'
    liElementColor = todo.bgColor
  } else if (todo.status == 'Progress') {
    className = 'in-progress__ul__li'
  } else if (todo.status == 'Done') {
    className = 'done__ul__li'
  }
  return `
  <li id="${todo.id}" class="${className}" style="background-color:${liElementColor}">
  <h6>${todo.title}</h6>
  <p class="description">${todo.description}</p>
  <div class="wrapper">
    <p class="pt-1">${todo.user}</p>
    <h6 class="clock">${todo.createdAt}</h6>
  </div>
  <div class="btn__group">
    <button class="btn__group__btn-edit" type="button" data-bs-toggle="modal" data-bs-target="#TodoEditModal">Edit</button>
    <button class="btn__group__btn-delete">Delete</button>
    <select class="btn__group__status" >
      <option>${todo.status}</option>
      <option>Todo</option>
      <option>Progress</option>
      <option>Done</option>
    </select>
  </div>
</li>
  `
}

const date = new Date()
class Todo {
  id = Date.now()
  createdAt = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  status = 'Todo'
  constructor(formData) {
    this.title = formData.get('title')
    this.description = formData.get('description')
    this.user = formData.get('user')
    this.bgColor = formData.get('bgColor')
  }
}

clock()
getUser(selectUserElement)
getUser(selectEditUserElement)

formElementAdd.addEventListener('submit', handleClickBtnSave)
formElementEdit.addEventListener('submit', handleClickBtnSaveEdit)

sectionTodoElement.addEventListener('change', handleChangeSelectStatus)
sectionProgressElement.addEventListener('change', handleChangeSelectStatus)
sectionDoneElement.addEventListener('change', handleChangeSelectStatus)

ulTodo.addEventListener('click', handleClickBtnEdit)
ulInProgress.addEventListener('click', handleClickBtnEdit)
ulDone.addEventListener('click', handleClickBtnEdit)
ulTodo.addEventListener('click', handleClickBtnDelete)
ulInProgress.addEventListener('click', handleClickBtnDelete)
ulDone.addEventListener('click', handleClickBtnDelete)

btnDeleteAllDoneElement.addEventListener('click', handleClickBtnDeleteAllDone)

export { buildTemplateTodo, Todo }
