import { createSlice } from "@reduxjs/toolkit";
import { setDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { database } from "../firebase";
const initialState = { todos: [], };

//Создаем объект со свойствами name, actions, reducer
const todoSlice = createSlice({
    name: 'todo', initialState, reducers: {
        showTodos(state, action) {
            state.todos = action.payload;
        },
        cleanTodos(state, action) {
            state.todos.map(todo => {
                deleteDoc(doc(database, "todos", todo.id.toString()));
            })
            state.todos = [];
        },
        addOneTodo(state, action) {
            const todoId = Date.now().toString();
            state.todos.push({
                id: todoId,
                text: action.payload,
                done: false
            });
            /* addDoc(collection(database, "todos"), {
                id: todoId,
                text: action.payload,
                done: false
              }); */
            setDoc(doc(database, "todos", todoId), {
                id: todoId,
                text: action.payload,
                done: false
            });
        },
        deleteOneTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            deleteDoc(doc(database, "todos", action.payload.toString()));
        },
        editOneTodo(state, action) {
            state.todos = state.todos.map(todo => {
                return todo.id == action.payload.id ? { id: action.payload.id, text: action.payload.editTodo, done: action.payload.done }
                    : todo;
            })
            const todoRef = doc(database, "todos", action.payload.id);
            updateDoc(todoRef, {
                id: action.payload.id,
                text: action.payload.editTodo,
                done: action.payload.done
            }).catch(error => {console.log(error); });
            /*  setDoc(doc(database, "todos", action.payload.id), {
                 id: action.payload.id,
                 text: action.payload.editTodo,
                 done: action.payload.done
               }); */
        },
        doneTodo(state, action) {
            const todo = state.todos.find(todo => todo.id == action.payload);
            todo.done = !todo.done;
        }
    }
});
//Извлекаем actions & reducer
//reducer будет использован для создания глобального стейта
//actions необходимы при возникновении событий
export const { showTodos, addOneTodo, deleteOneTodo, editOneTodo, doneTodo, cleanTodos } = todoSlice.actions;
export default todoSlice.reducer;