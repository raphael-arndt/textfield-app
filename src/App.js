import React, {useEffect, useState} from 'react';
import './App.css';
import DataInput from './components/DataInput';
import DataView from './components/DataView';
import FavoriteView from "./components/FavoritesView";

const App = () => {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [input, setInput] = useState('');


    const addData = async (data) => {
        let body = data
        if(!data.startsWith('{')){
            body = JSON.stringify({ data: {text: data } });
        }
        await fetch('http://localhost:5000/data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: body
        });

        await fetchData();
    };

    const deleteDataAndFavorites = async () => {
        console.log('test')
        await fetch(`http://localhost:5000/data`, {
            method: 'DELETE'
        });
        await fetch(`http://localhost:5000/favorites`, {
            method: 'DELETE'
        });

        await fetchData();
        await fetchFavorites();

    };

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/data');
        const result = await response.json()
        setData(result);
    };

    useEffect(() => {
        document.title = "NeoCoreSim";
        loadInitialData()
    }, []);

    const addFavorite = async (data, name) => {

        await fetch('http://localhost:5000/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: data, name: name })
        });
        await fetchFavorites();
    };

    const fetchFavorites = async () => {
        const response = await fetch('http://localhost:5000/favorites');
        const result = await response.json();
        setFavorites(result)
    };

    const loadInitialData = async () => {
        await fetchData();
        await fetchFavorites();
    };

    return (

        <div className="App">
            <h1>NeoCoreSimulator</h1>
            <DataInput addData={addData} deleteData={deleteDataAndFavorites} addFavorite={addFavorite}
                       input={input} setInput={setInput} />
            <div className="data-favorite-container">
                <DataView data={data}/>
                <FavoriteView favorites={favorites} setInput={setInput}/>
            </div>
        </div>
    );
}

export default App;
