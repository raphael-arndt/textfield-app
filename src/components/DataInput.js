import React, {useState} from 'react';

const DataInput = ({ addData, deleteData, addFavorite, input, setInput }) => {
    const [favoriteName, setFavoriteName] = useState('');
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

         addData(input)
         setInput('');
     };

     const handleFavoriteSubmit = async (e) => {
         e.preventDefault();
         if (input.trim() === '')
             return;

         setShowPopup(true);
         setCurrentData(input)
         document.body.style.overflow = 'hidden';
     };

    const handleFavoriteNameSubmit = async (e) => {
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
        document.body.style.overflow = 'auto';
    };

    return (
        <>
            <form>
                <textarea
                    className="textarea resize-ta"
                    value={input}
                    cols="40"
                    rows="10"
                    onChange={handleChange}
                    placeholder="Enter data"
                />
                <br/>
                <button type="button" onClick={handleSubmit}>Submit</button>
                <button type="button" onClick={handleFavoriteSubmit}>Submit as Favorite</button>
                <button type="button" onClick={deleteData} className="delete-button">Delete</button>
            </form>

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <form onSubmit={handleFavoriteNameSubmit}>
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