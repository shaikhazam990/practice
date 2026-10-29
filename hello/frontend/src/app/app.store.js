import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "../state/task.slice.js";


const store=configureStore({
    reducer:{
        task:taskReducer,
    }
});

export default store;




