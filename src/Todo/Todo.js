import React from "react";
import { useState } from "react";
export const Todo = () => {
    const [input, setInput] = useState({
        item: "",
        isComplete: false
    })
    const [showItem, setShowItem] = useState([])
    const [error, setError] = useState(false)
    const handleChange = (e) => {
        const { name, value } = e.target
        setInput((data) => {
            return { ...data, [name]: value }
        })
        setError(false)
    }

    const submit = (e) => {
        e.preventDefault()
        if (input.item.trim() === "") {
            setError("Please enter a text.");
            return;
        }

        setShowItem([...showItem, input]);
        setInput({ item: "" });
        setError(false);
    }

    const handleCheckBox = (currentIndex) => {
        let data = [...showItem]
        data[currentIndex].isComplete = !data[currentIndex].isComplete
        setShowItem([...data])
    }

    return (
        <div className="container-md">
            <h1 className="text-center my-2">Todo App</h1>
            <div className="showItem">
                {showItem.map((element, index) => {
                    return (
                        <div key={index} className="container-md py-2 mt-4 d-flex flex-row justify-content-between align-items-center text-center border rounded border-dark">
                            <div className="d-flex ">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" checked={element.isComplete} id="flexCheckDefault" onChange={() => handleCheckBox(index)} />
                                </div>
                                <p className="px-2 m-0">{element.item}</p>
                            </div>
                            <div className="">
                                {element.isComplete ? <span className="border rounded-pill text-center bg-success text-white py-1 px-2">Completed</span> : ''}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="my-5">
                <form>
                    <div className="container-md p-0">
                        <h2>Todo</h2>
                        <input type="text" className="container-md py-2 rounded border border-dark" placeholder="Enter a text" id="item" name="item" value={input.item} onChange={handleChange} />
                        {error && (
                            <div className="text-danger">
                                {error}
                            </div>
                        )}
                    </div>
                </form>
                <button className="btn btn-outline-dark mt-4" onClick={submit}>Submit</button>
            </div>
        </div>
    )
}
