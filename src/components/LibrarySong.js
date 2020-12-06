import React from "react";

function LibrarySong({
    song,
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    id,
}) {
    function songSelect() {
        // console.log("single song --->", song);
        //!change active state
        const newSongs = songs.map((song) => {
            return song.id === id
                ? { ...song, active: true }
                : { ...song, active: false };
        });
        setSongs(newSongs);

        setCurrentSong(song);
        //!controllo che la canzone sia in play
        if (isPlaying) {
            //* devo anche controllare che la canzone sia stata caricata
            //? Il metodo HTMLMediaElement play () tenta di avviare la riproduzione del media. Restituisce una promessa che viene risolta quando la riproduzione è stata avviata con successo. Il mancato avvio della riproduzione per qualsiasi motivo, ad esempio problemi di autorizzazione, comporta il rifiuto della promessa.
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    audioRef.current.play();
                });
            }
        }
    }

    return (
        <div>
            <div
                className={`library-song  ${song.active ? "selected" : ""}`}
                onClick={songSelect}
            >
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
