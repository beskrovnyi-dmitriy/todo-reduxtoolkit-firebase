import { useState } from "react";

import TodoEdit from "./TodoEdit";
import TodoItem from './TodoItem';

function TodoList({ todos }) {
    const [showEditTodo, setShowEditTodo] = useState("");
    const [editTodo, setEditTodo] = useState("");
    const [editDone, setEditDone] = useState(false);

    return (
        <div>
            <h3>ToDos:</h3>
            {todos.map(todo => (
                <div key={todo.id} onKeyDown={(e)=>e.key=="Escape"? setShowEditTodo(""): null}>
                    {showEditTodo===todo.id ?
                        <TodoEdit id={todo.id} done={editDone} editTodo={editTodo} setEditTodo={setEditTodo} setShowEditTodo={setShowEditTodo}/>
                        : <div>
                            <TodoItem id={todo.id} text={todo.text} done={todo.done} setShowEditTodo={setShowEditTodo} setEditTodo={setEditTodo} setEditDone={setEditDone}/>
                            <hr />
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}
export default TodoList;