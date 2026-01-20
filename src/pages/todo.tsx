import { useState } from "react";

type TodoProps = {
    text: string;
    id: number;
    completed: boolean;

}

export default function TodoPage() {
    const [todo, setTodo] = useState<TodoProps[]>([])
    const [input, setInput] = useState<string>("")

    const addToDo = () => {
        if (!input.trim()) return;
        setTodo((prev) => [...prev, { text: input.trim(), id: Date.now(), completed: false, }])
        setInput("");
    }

    const toggleToDo = (id: number) => {
        setTodo((prev) => prev.map((todo) => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    }

    return (
        <>
            <div className="w-[500px] mx-auto">
                <h2 className="text-2xl font-bold">To Do App</h2>
                <ul className="border border-gray-200 rounded overflow-hidden shadow-md">
                    {todo.map((item) => (

                        <li key={item.id} className="flex  px-4 py-2 bg-white  border-b last:border-none border-gray-200 transition-all duration-300 ease-in-out">
                            <label><span key={item.id} style={{ textDecoration: item.completed ? "line-trough" : "none" }}>{item.text}</span><input checked={item.completed} onChange={() => toggleToDo(item.id)} type="checkbox"></input></label>
                        </li>


                    ))}
                </ul>
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Place your todo here"></input>
                    <button type="button" onClick={addToDo} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add To</button>
                </form>
            </div >
        </>
    )
}

