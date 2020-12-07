import React from "react";
import { playAudio } from "../utils";

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
        //!change active state
        const newSongs = songs.map((song) => {
            return song.id === id
                ? { ...song, active: true }
                : { ...song, active: false };
        });
        setSongs(newSongs);

        setCurrentSong(song);

        playAudio(isPlaying, audioRef);
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
