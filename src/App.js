import React, {useEffect, useState} from 'react';
import './App.css';
import DataInput from './components/DataInput';
import DataView from './components/DataView';

const App = () => {
    const [data, setData] = useState([]);

    const addData = async (data) => {
        await fetch('http://localhost:5000/data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data })
        });

        const updatedData = await fetchData();
        setData(updatedData);
    };

    const deleteData = async (id) => {
        await fetch(`http://localhost:5000/data/${id}`, {
            method: 'DELETE'
        });

        const updatedData = await fetchData();
        setData(updatedData);
    };

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/data');
        const result = await response.json()
        return await result;
    };

    useEffect(() => {
        const loadInitialData = async () => {
            const initialData = await fetchData();
            setData(initialData);
        };

        loadInitialData();
    }, []);

    console.log(data)
    return (
        <div className="App">
            <h1>My React App</h1>
            <DataInput addData={addData} />
            <DataView data={data} deleteData={deleteData}/>
        </div>
    );
}

export default App;
