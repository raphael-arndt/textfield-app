import React, { useState } from 'react';

const DataInput = ({ addData,deleteData }) => {
    const [input, setInput] = useState('');
    const handleChange = (e) => {
        setInput(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
        } else {
            addData(input);
            setInput('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                className="textarea resize-ta"
                value={input}
                cols="40"
                rows="10"
                onChange={handleChange}
                placeholder="Enter data"
            />
            <br/>
            <button type="submit" style={{background: "#991355"}}>Submit</button>

            <button onClick={deleteData}>Delete</button>
        </form>
    );
};

export default DataInput;