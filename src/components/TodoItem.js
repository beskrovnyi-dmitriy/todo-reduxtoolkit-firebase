import { useDispatch } from "react-redux";
import { deleteOneTodo, doneTodo } from '../store/todoSlice';

function TodoItem({ id, text, done, setShowEditTodo, setEditTodo, setEditDone }) {
    const dispatch = useDispatch();

    return (
        <>
            <div id={id} className="todoItem" >
                    <div className="textTodo">
                        <input type="checkbox" checked={done? true : false} onChange={()=>dispatch(doneTodo(id))} style={{accentColor:'black'}}/>
                        <span style={done? {textDecoration: 'line-through'}: {textDecoration: 'none'}}>{text}</span>
                    </div>
                    <div className='editButtons'>
                        <img className="edit" src="edit.png" alt="no pic" title="edit" onClick={() =>{ setEditTodo(text); setShowEditTodo(id); setEditDone(done)}} />
                        <img className="trash" src="trash.png" alt="no pic" title="delete" onClick={()=>dispatch(deleteOneTodo(id))} />
                    </div>
            </div>
        </>
    )
}
export default TodoItem;