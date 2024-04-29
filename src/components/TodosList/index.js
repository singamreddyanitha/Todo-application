import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import {HiBadgeCheck} from 'react-icons/hi'
import TodoItem from '../TodoItem'
import './index.css'

class TodosList extends Component {
  state = {
    inputTask: '',
    todoList: [],
    isSaveEdit: false,
    favTab: false,
    showTick: false,
  }

  componentDidMount = () => {
    const stringifiedTodoList = localStorage.getItem('todoList')
    const parsedTodoList = JSON.parse(stringifiedTodoList)
    if (parsedTodoList === null) {
      this.setState({todoList: []})
    } else {
      this.setState({todoList: parsedTodoList})
    }
  }

  onInputChange = event => {
    this.setState({inputTask: event.target.value})
  }

  onAdd = () => {
    const {inputTask} = this.state
    if (inputTask === '') {
      // eslint-disable-next-line no-alert
      alert('Enter valid Text')
      return
    }
    const todoItem = {
      inputTask,
      id: uuid(),
      isChecked: false,
      isLiked: false,
      isEdit: false,
    }
    this.setState(prevState => ({
      inputTask: '',
      todoList: [...prevState.todoList, todoItem],
    }))
  }

  onCheckbox = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isChecked: !eachTodo.isChecked}
        }
        return eachTodo
      }),
    }))
  }

  onLikeIcon = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isLiked: !eachTodo.isLiked}
        }
        return eachTodo
      }),
    }))
  }

  onEditIcon = (id, text) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachTodo => {
        if (eachTodo.id === id) {
          return {...eachTodo, isEdit: !eachTodo.isEdit}
        }
        return eachTodo
      }),
      inputTask: text,
      isSaveEdit: true,
    }))
  }

  onSaveEdit = () => {
    const {inputTask} = this.state
    this.setState(prevState => ({
      todoList: prevState.todoList.map(eachTodo => {
        if (eachTodo.isEdit === true) {
          return {...eachTodo, inputTask, isEdit: false}
        }
        return eachTodo
      }),
      inputTask: '',
      isSaveEdit: false,
    }))
  }

  onDeleteIcon = id => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(eachTodo => eachTodo.id !== id),
    }))
  }

  onSave = () => {
    const {todoList} = this.state
    localStorage.setItem('todoList', JSON.stringify(todoList))
    this.setState({showTick: true})

    setTimeout(() => {
      this.setState({showTick: false})
    }, 500)
  }

  displayMyTasks = () => {
    this.setState({favTab: false})
  }

  displayFavTasks = () => {
    this.setState({favTab: true})
  }

  render() {
    const {inputTask, todoList, isSaveEdit, favTab, showTick} = this.state
    const favList = todoList.filter(eachTodo => eachTodo.isLiked === true)
    const headClass = favTab ? '' : 'active-tab'
    const favClass = favTab ? 'active-tab' : ''
    return (
      <div className="todos-bg-container">
        <h1 className="todos-heading">Todos</h1>
        <h1 className="create-task-heading">
          Create <span className="create-task-heading-subpart">Task</span>
        </h1>
        <input
          type="text"
          className="todo-user-input"
          placeholder="What needs to be done?"
          onChange={this.onInputChange}
          value={inputTask}
        />
        {!isSaveEdit && (
          <button className="button" type="button" onClick={this.onAdd}>
            Add
          </button>
        )}
        {isSaveEdit && (
          <button className="button" type="button" onClick={this.onSaveEdit}>
            Save Edit
          </button>
        )}
        <div className="head-container">
          <button
            className={`task-heading ${headClass}`}
            type="button"
            onClick={this.displayMyTasks}
          >
            My Tasks
          </button>
          <button
            className={`task-heading ${favClass}`}
            type="button"
            onClick={this.displayFavTasks}
          >
            Favorite Tasks
          </button>
        </div>
        {!favTab && (
          <ul className="list-container">
            {todoList.map(eachTodo => (
              <TodoItem
                key={eachTodo.id}
                todoDetails={eachTodo}
                onCheckbox={this.onCheckbox}
                onEditIcon={this.onEditIcon}
                onDeleteIcon={this.onDeleteIcon}
                onLikeIcon={this.onLikeIcon}
              />
            ))}
          </ul>
        )}
        {favTab && (
          <ul className="list-container">
            {favList.length === 0 ? (
              <p className="no-fav">No Favorites</p>
            ) : (
              favList.map(eachTodo => (
                <TodoItem
                  key={eachTodo.id}
                  todoDetails={eachTodo}
                  onCheckbox={this.onCheckbox}
                  onEditIcon={this.onEditIcon}
                  onDeleteIcon={this.onDeleteIcon}
                  onLikeIcon={this.onLikeIcon}
                />
              ))
            )}
          </ul>
        )}

        <div className="tick-container">
          <button className="button" type="button" onClick={this.onSave}>
            Save
          </button>
          {showTick && <HiBadgeCheck className="icon-tick" />}
        </div>
      </div>
    )
  }
}
export default TodosList
