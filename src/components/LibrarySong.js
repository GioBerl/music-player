import React from "react";

function LibrarySong({ song, songs, setCurrentSong, audioRef, isPlaying }) {
    function songSelect() {
        console.log("single song --->", song);
        setCurrentSong(song);
        //!controllo che la canzone sia in play
        if (isPlaying) {
            //* devo anche controllare che la canzone sia stata caricata
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then((audio) => {
                    audioRef.current.play();
                });
            }
        }
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
