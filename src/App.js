import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './style.css';
import { getTodos } from './firebase';
import { showTodos, addOneTodo, cleanTodos } from './store/todoSlice';
import TodoList from './components/TodoList';

function App() {
  const todos = useSelector(state=>state.todoReducer.todos);
  const dispatch = useDispatch();
  const [inputTodo, setInputTodo] = useState('');

  useEffect(()=>{ getTodos().then(data=>dispatch(showTodos(data))).catch(er=>console.log(er)) }, []);

  function addSingleTodo(){
    if(!inputTodo) return;
    dispatch(addOneTodo(inputTodo));
    setInputTodo("");
  }
  function enterHandle(e){
    return e.key=="Enter"? addSingleTodo() : null;
  }
  return (
    <div className="app">
      <div className="addtodo">
        <input className="inputTodo" autoFocus type="text" value={inputTodo} onChange={(e)=>setInputTodo(e.target.value)} onKeyDown={enterHandle}/>
        <button onClick={addSingleTodo}>ADD</button>
        <button onClick={()=>dispatch(cleanTodos())}>CLEAN LIST</button>
      </div>
      <div className="todos">
        <TodoList todos={todos}/>
      </div>
    </div>
  );
}

export default App;
