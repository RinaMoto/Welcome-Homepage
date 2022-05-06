import  React, { useState , useEffect } from 'react'

export default function Main() {
    var [date, setDate] = useState(new Date());
    const [name, setName] = useState(() => {
        const saved = localStorage.getItem('name');
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });

    const [goal, setGoal] = useState(() => {
        const saved = localStorage.getItem("goal");
        const initialValue = JSON.parse(saved);
        return initialValue || '';
    })
    
   
    useEffect(() => {
        localStorage.setItem('name', JSON.stringify(name));
      }, [name]);

    useEffect(() => {
    localStorage.setItem('goal', JSON.stringify(goal));
    }, [goal]);

    useEffect(() => {
        var timer = setInterval(() => setDate(new Date()), 1000)
        return function cleanup() {
            clearInterval(timer)
        }
    }) 

    return (
        <div>
            <div className="mb-8">
                <p className="mb-5 text-3xl">{date.toLocaleDateString()}</p>
                <p className="mb-5 text-3xl">{date.toLocaleTimeString()}</p>
                <p className="w-full ml-8">How are you doing today,<input className="bg-transparent text-sky-300 placeholder:text-sky-300 focus:outline-none mb-3 ml-2"
                        type="text" 
                        onChange={(e) => setName(e.target.value)} 
                        onClick={() => setName("")}
                        value={name}
                        placeholder="[ENTER NAME]"
                        >
                    </input></p>
            </div>
            <p>What's your goal for the day?</p>
            <input className="bg-transparent text-sky-400 placeholder:text-sky-300 block focus:outline-none w-full text-center py-2 border-b-2"
                    type="text" 
                    onChange={(e) => setGoal(e.target.value)} 
                    onClick={() => setGoal("")}
                    value={goal}
                    placeholder="[ENTER GOAL]">
            </input>
            
        </div>
    )
}