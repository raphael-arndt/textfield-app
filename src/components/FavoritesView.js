import React from 'react';

const FavoritesView = ({ favorites, setFavoriteData }) => {
    return (
        <div>
            <h2>Favorites</h2>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite.id}>
                        <button
                            style={{width: "100%"}}
                            onClick={() => {
                                setFavoriteData(favorite.data);
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