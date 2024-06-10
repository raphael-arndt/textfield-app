import React, { useState } from 'react';

const DataInput = ({ addData }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');


    const handleChange = (e) => {
        setInput(e.target.value);
        if (e.target.value.trim() === '') {
            setError('Input cannot be empty');
        } else {
            setError('');
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') {
            setError('Input cannot be empty');
        } else {
            setError('');
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
            <button type="submit">Submit</button>
            {error && <p className={"error-text"}>{error}</p>}
        </form>
    );
};

export default DataInput;