import React, {useEffect, useState} from 'react';
import './App.css';
import DataInput from './components/DataInput';
import DataView from './components/DataView';
import FavoriteView from "./components/FavoritesView";

const App = () => {
    const [data, setData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [favoriteData, setFavoriteData] = useState('');

    const addData = async (data) => {
        let body = data
        if(!data.startsWith('{')){
            body = JSON.stringify({ data: {text: data } });
        }
        let res = await fetch('http://localhost:5000/data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: body
        });

        let id = -1

        if(res.status === 201){
            let json = await res.json();
            id = json['id'];
        }


        const updatedData = await fetchData();
        setData(updatedData);
        return id
    };

    const deleteDataAndFavorites = async () => {
        console.log('test')
        await fetch(`http://localhost:5000/data`, {
            method: 'DELETE'
        });
        await fetch(`http://localhost:5000/favorites`, {
            method: 'DELETE'
        });

        const updatedData = await fetchData();
        const updatedFavorites = await fetchFavorites();
        setData(updatedData);
        setFavorites(updatedFavorites);
    };

    const fetchData = async () => {
        const response = await fetch('http://localhost:5000/data');
        const result = await response.json()

        return await result;
    };

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         loadInitialData();
    //     }, 1000); // 1000 milliseconds = 1 second
    //     return () => clearInterval(interval); // This represents the cleanup function
    // }, []);

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
        const favorites =  await fetchFavorites();
        setFavorites(favorites);
    };

    const fetchFavorites = async () => {
        const response = await fetch('http://localhost:5000/favorites');
        const result = await response.json();
        return await result
    };

    const loadInitialData = async () => {
        const initialData = await fetchData();
        const initialFavorites = await fetchFavorites();
        setData(initialData);
        setFavorites(initialFavorites);
    };

    return (

        <div className="App">
            <h1>NeoCoreSimulator</h1>
            <DataInput addData={addData} deleteData={deleteDataAndFavorites} addFavorite={addFavorite}
                       favoriteData={favoriteData} setFavoriteData={setFavoriteData} />
            <div className="data-favorite-container">
                <DataView data={data}/>
                <FavoriteView favorites={favorites} setFavoriteData={setFavoriteData}/>
            </div>
        </div>
    );
}

export default App;
