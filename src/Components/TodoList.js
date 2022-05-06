import  React, {useState, useEffect} from 'react';
import {MdDone} from 'react-icons/md';
import {FiTrash2} from 'react-icons/fi';
import {HiPlus} from 'react-icons/hi';
import {IoIosArrowUp} from 'react-icons/io';
import {IoIosArrowDown} from 'react-icons/io';
import {BsExclamation} from 'react-icons/bs';
import {useReward} from 'react-rewards';



function Todo({ index, todo, markTodo, makePriority, removeTodo}) {
    const { reward } = useReward('rewardId', 'confetti');
    const priorityColor = todo.isPriority === true ? "text-red-400" : "text-gray-400";
    const checkColor = todo.isDone === true ? "text-green-400" : "text-gray-400";

    function partyTime() {
        markTodo(index);
        return( todo.isDone === true ? reward() : null )
    }

   

    const styled = {
        textDecoration: todo.isDone === true ? "line-through" : ""
    }

    return (
        <ol className="marker:text-sky-400 text-lg px-5 pt-5 space-y-3 text-slate-500 list-none list-inside">
            <li className="inline-flex items-center" style={styled}>{todo.text}
                <div className="inline-flex items-center pl-3">
                    <button className={`text-2xl hover:text-red-700 ${priorityColor}`} onClick={() => makePriority(index)}><BsExclamation /></button>
                    <button className={`hover:text-green-700 ${checkColor} font-bold py-auto px-2 mx-2"`} variant="text" onClick={() => partyTime()}><span id="rewardId"/><MdDone /></button>{' '}
                    <button className="hover:text-sky-700 text-sky-400 font-bold py-auto mx-2" variant="text" onClick={() => removeTodo(index)}><FiTrash2 /></button>
                </div>
            </li>   
        </ol>
    )
}

function FormTodo({ addTodo }) {
    const [value, setValue] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        if (!value) return;
        addTodo(value);
        setValue("");
    }
    return (
        <form className="flex items-stretch px-5 m-2" onSubmit={handleSubmit}>
            <input 
                className="text-sky-400 text-sm placeholder:text-sky-300 placeholder:italic block bg-white w-full border border-slate-300 rounded-md px-2 py-1 h-min shadow-sm"
                value={value}
                onChange={e => setValue(e.target.value)}
                onSubmit={handleSubmit}
                placeholder="add todo">
            </input>
            <button className=" hover:text-sky-700 text-sky-400 font-bold px-1 py-0 h-min ml-4 rounded-md" type="submit"><HiPlus /></button>
        </form>
    );
}

export default function TodoList() {
    const [setActive, setActiveState] = useState("");


    function toggleAccordion() {
        setActiveState(setActive === "" ? "active" : "");
    }

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        const initialValue = JSON.parse(saved);
        return initialValue || [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
      }, [todos]);

    const addTodo = text => {
        const newTodos = [...todos, { text, isDone: false, isPriority: false }];
        console.log(newTodos);
        setTodos(newTodos);
    };
    
    const markTodo = index => {
        const newTodos = [...todos];
        newTodos[index].isDone === true ? newTodos[index].isDone = false : newTodos[index].isDone = true;
        console.log(newTodos);
        setTodos(newTodos);
    };

    const makePriority = index => {
        const newTodos = [...todos];
        newTodos[index].isPriority === true ? newTodos[index].isPriority = false : newTodos[index].isPriority = true;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };
   

    return (
        <div className={`bg-gray-100 shadow-2xl absolute resize border bottom-0 right-0 md:w-1/3 rounded-lg`}>
            <div className="sticky p-5 top-0">
                <button className={`absolute bg-transparent hover:text-gray-400 text-gray-800 font-bold p-3 top-3 right-4 rounded-lg`} type="button" onClick={toggleAccordion}>
                    {setActive === "active" ? <IoIosArrowUp /> : <IoIosArrowDown />}</button>
                <h1 className="text-slate-800 font-medium">Todo List</h1>
                
            </div>
            { setActive === "active" ? null :
            <div>
                <FormTodo addTodo={addTodo} /> 
                    <div className="overflow-y-auto h-72 pb-8">
                        {todos.map((todo, index) => {
                            return (
                                <div>
                                    <Todo
                                        key = {index} 
                                        index = {index}
                                        todo = {todo}
                                        markTodo = {markTodo}
                                        makePriority = {makePriority}
                                        removeTodo = {removeTodo}
                                    />
                                </div> 
                            )
                        })}
                    </div> 
            </div> }
        </div>
    )
}