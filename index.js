import express  from "express";
import mongoose  from "mongoose";
import cors from "cors";
import Agenda from "agenda";
import dotenv from 'dotenv';
import todoRoutes from './routes/todos.js'
import Todo from "./models/todo.js";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/todo', todoRoutes);
app.get('/',(req,res)=>{
    res.send('Hello to Todo API')
})
const PORT = process.env.PORT || 5000;
const agenda = new Agenda({ db: { address: process.env.CONNECTION_URL } });
mongoose.connect(process.env.CONNECTION_URL).then(()=> app.listen(PORT, ()=> console.log(`Server running on Port: http://localhost:${PORT}`))).catch((error)=> console.log(error.message));

const sevenDaysOlder=new Date(Date.now() - 7*24*60*60 * 1000);

let todayDate= new Date();

agenda.define('UPDATE STATUS', async job => {
	await Todo.updateMany({due_Date:{$lt:todayDate}},{status:"COMPLETED"});

    await Todo.deleteMany({createdAt:{$lte:sevenDaysOlder}});
});

(async function () {
	await agenda.start();

	await agenda.every('0 0 * * *', 'UPDATE STATUS');
})();