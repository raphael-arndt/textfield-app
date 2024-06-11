import React, {useEffect, useState} from 'react';
import './App.css';
import DataInput from './components/DataInput';
import DataView from './components/DataView';

const App = () => {
    const [data, setData] = useState([]);

    const addData = async (data) => {
        let body = data
        if(!data.startsWith('{')){
            body = JSON.stringify({ data: {text: data } });
        }
        await fetch('http://localhost:38080/Befund', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: body
        });

        const updatedData = await fetchData();
        setData(updatedData);
    };

    const deleteData = async () => {
        console.log('test')
        await fetch(`http://localhost:5000/data`, {
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

    const loadInitialData = async () => {
        const initialData = await fetchData();
        setData(initialData);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            loadInitialData();
        }, 1000); // 1000 milliseconds = 1 second
        return () => clearInterval(interval); // This represents the cleanup function
    }, []);

    useEffect(() => {
        document.title = "NeoCoreSim"
    }, []);

    return (

        <div className="App">
            <h1>NeoCoreSimulator</h1>
            <DataInput addData={addData} deleteData={deleteData} />
            <DataView data={data} />
        </div>
    );
}

export default App;
