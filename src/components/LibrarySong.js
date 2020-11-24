import React from "react";

function LibrarySong({ song, songs, setCurrentSong }) {
    function songSelect() {
        console.log("single song --->", song);
        setCurrentSong(song);
    }

    return (
        <div>
            <div className="library-song" onClick={songSelect}>
                <img src={song.cover} alt={song.name} />
                <div className="song-description">
                    <h3>{song.name}</h3>
                    <h4>{song.artist}</h4>
                </div>
            </div>
        </div>
    );
}

export default LibrarySong;
