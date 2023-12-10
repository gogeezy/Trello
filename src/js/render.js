import { todos } from './localStorage.js'
import { buildTemplateTodo } from './app.js'
import { ulContainerElements } from './dom.js'

const [ulTodo, ulInProgress, ulDone] = ulContainerElements

function render() {
  let htmlTodo = ''
  let htmlProgress = ''
  let htmlDone = ''
  const cloneTodos = structuredClone(todos)
  cloneTodos.forEach((todo) => {
    if (todo.status == 'Todo') {
      const templateTodo = buildTemplateTodo(todo)
      htmlTodo += templateTodo
    } else if (todo.status == 'Progress') {
      const templateProgress = buildTemplateTodo(todo)
      htmlProgress += templateProgress
    } else if (todo.status == 'Done') {
      const templateDone = buildTemplateTodo(todo)
      htmlDone += templateDone
    }
  })

  ulTodo.innerHTML = htmlTodo
  ulInProgress.innerHTML = htmlProgress
  ulDone.innerHTML = htmlDone
}

export { render }
