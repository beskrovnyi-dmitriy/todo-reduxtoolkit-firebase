import { useDispatch } from "react-redux";
import { editOneTodo } from '../store/todoSlice';

function TodoEdit({id, done, editTodo, setEditTodo, setShowEditTodo}) {
    const dispatch = useDispatch();

    function editHandle(id, editTodo, done){
        if(!editTodo) return;
        dispatch(editOneTodo({id, editTodo, done}));
        setShowEditTodo("");
    } 
    function enterHandle(e, id, editText, done){
        return e.key=="Enter"? editHandle(id, editText, done) : null;
    }
    return (
        <div>
        <div id={id} className="todoItem">
            <input autoFocus className="inputEditTodo" type="input" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} onKeyDown={(e) => enterHandle(e, id, editTodo, done)} />
            <img className="accept" src="accept.png" alt="no pic" title="accept" onClick={() => editHandle(id, editTodo, done)} />
        </div>
        <hr />
        </div>
    )
}
export default TodoEdit;