import {HiHeart, HiOutlineHeart} from 'react-icons/hi'
import {BiEdit} from 'react-icons/bi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import './index.css'

const TodoItem = props => {
  const {todoDetails, onCheckbox, onEditIcon, onDeleteIcon, onLikeIcon} = props
  const {inputTask, id, isChecked, isLiked} = todoDetails
  const checkboxIcon = () => {
    onCheckbox(id)
  }
  const editIcon = () => {
    onEditIcon(id, inputTask)
  }
  const deleteIcon = () => {
    onDeleteIcon(id)
  }
  const likeIcon = () => {
    onLikeIcon(id)
  }
  return (
    <li className="list-item">
      <input
        type="checkbox"
        id={id}
        className="checkbox-input"
        checked={isChecked}
        onChange={checkboxIcon}
      />
      <div className="label-container">
        <label className="checkbox-label" htmlFor={id}>
          {inputTask}
        </label>
        <div className="icons-container">
          {isLiked && <HiHeart className="icon" onClick={likeIcon} />}
          {!isLiked && <HiOutlineHeart className="icon" onClick={likeIcon} />}
          <BiEdit className="icon" onClick={editIcon} />
          <RiDeleteBin6Line className="icon" onClick={deleteIcon} />
        </div>
      </div>
    </li>
  )
}
export default TodoItem
