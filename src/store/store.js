import { configureStore } from '@reduxjs/toolkit';
import reducer from './todoSlice';

//Создаем глобальный стейт, 
//первым свойством является rootReducer
//вторым струтктура для мидлваров
export const globalStore = configureStore({reducer: {todoReducer: reducer, }, });
