import React from "react";
import { useState } from "react";

export const Todo = () => {
    const [input, setInput] = useState({
        item: "",
        isComplete: false
    })
    const [showItem, setShowItem] = useState([])
    const [error, setError] = useState(false)
    const [edit, setEdit] = useState(-1)
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
        if (edit >= 0) {
            setShowItem((prevoiusItem) => {
                const updatedItems = prevoiusItem.map((item, index) => {
                    if (index === edit) {
                        return { ...item, item: input.item };
                    }
                    return item;
                });
                return updatedItems;
            });
            setInput({ item: "" });
            setEdit(-1);
        } else {
            setShowItem([...showItem, input]);
            setInput({ item: "" });
        }
        setError(false);
    }

    const handleCheckBox = (currentIndex) => {
        let data = [...showItem]
        data[currentIndex].isComplete = !data[currentIndex].isComplete
        setShowItem([...data])
    }

    const handleEditChange = (index) => {
        const currentTask = showItem.find((item, ind) => {
            return ind === index
        })
        setInput({ item: currentTask.item })
        setEdit(index)
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

                            <div className="d-flex align-items-center">
                                {element.isComplete ? <span className="border mt-1 rounded-pill text-center bg-success text-white py-1 px-2">Completed</span> : ''}
                                <div className="ml-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.2em" viewBox="0 0 512 512" onClick={() => handleEditChange(index)}><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" /></svg>
                                </div>
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
