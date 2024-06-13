import React from 'react';

const FavoritesView = ({ favorites, setInput }) => {
    return (
        <div>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id}>
                        <button
                            style={{width: "100%"}}
                            onClick={() => {
                                setInput(favorite.data);
                            }}
                        >
                            {favorite.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FavoritesView;