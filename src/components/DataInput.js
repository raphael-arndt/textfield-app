import React, {useState} from 'react';

const DataInput = ({ addData, deleteData, addFavorite, input, setInput }) => {
    const [favoriteName, setFavoriteName] = useState('');
    const [toggleFavorite, setToggleFavorite] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [currentData, setCurrentData] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleFavoriteNameChange = (e) => {
        setFavoriteName(e.target.value);
    };

     const handleSubmit = async (e) => {
         e.preventDefault();
         if (input.trim() === '')
             return;


         if (toggleFavorite) {
             setShowPopup(true);
             setCurrentData(input)
             document.body.style.overflow = 'hidden';
         } else {
             addData(input)
             setInput('');
         }
     };

    const handleFavoriteSubmit = async (e) => {
        e.preventDefault();
        if (favoriteName.trim() === '') {
            return;
        }
        await addFavorite(currentData, favoriteName);
        closePopup();
    };

    const closePopup = () => {
        setShowPopup(false);
        setFavoriteName('');
        setInput('');
        setToggleFavorite(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <>
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
                <button onClick={() => setToggleFavorite(true)} type="submit">Submit as Favorite</button>
                {/*<button*/}
                {/*    className="favorite-button"*/}
                {/*    type="button"*/}
                {/*    onClick={() => setToggleFavorite(!toggleFavorite)}*/}
                {/*>*/}
                {/*    {toggleFavorite ? "⭐ ✅" : "⭐ ❌"}*/}
                {/*</button>*/}
                <button type="button" className="delete-button" onClick={deleteData}>Delete</button>
            </form>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <form onSubmit={handleFavoriteSubmit}>
                            <input
                                type="text"
                                value={favoriteName}
                                onChange={handleFavoriteNameChange}
                                placeholder="Enter favorite name"
                            />
                            <div>
                                <button type="submit">Save Favorite</button>
                                <button type="button" onClick={closePopup}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>


    );
};

export default DataInput;