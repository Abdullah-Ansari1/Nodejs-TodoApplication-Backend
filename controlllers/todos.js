import express from 'express';
import mongoose from 'mongoose';
import Todo from '../models/todo.js';

const router = express.Router();

//Get All Todos
export const getTodos = async (req, res) => { 
    try {
        const Todos = await Todo.find();
                
        res.status(200).json(Todos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Get Single Todo
export const getTodo = async (req, res) => { 
    const { id } = req.params;

    try {
        const todo = await Todo.findById(id);
        
        res.status(200).json(todo);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//Create a New Todo
export const createTodo = async (req, res) => {
    const { title, status,due_Date} = req.body;

    const newTodo = new Todo({ title, status,due_Date })

    try {
        await newTodo.save();

        res.status(201).json({todo:newTodo,message:"Todo created successfully"});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// Delete The todo
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Todo with id: ${id}`);

    await Todo.findByIdAndRemove(id);

    res.json({ message: "Todo deleted successfully." });
}

//Update Todo
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, status,due_Date } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No todo with id: ${id}`);

    const updatedTodo = { title, status,due_Date, _id: id };

    await Todo.findByIdAndUpdate(id, updatedTodo, { new: true });

    res.json({updateTodo:updatedTodo,message:"Todo Updated Successfully"});
}



export default router;