import React from "react";
import LibrarySong from "./LibrarySong";

function Library({
    songs,
    setSongs,
    setCurrentSong,
    audioRef,
    isPlaying,
    libraryStatus,
}) {
    return (
        <div>
            <div className={`library ${libraryStatus ? "active-library" : ""}`}>
                <h2>Library</h2>
                <div className="library-songs">
                    {songs.map((song) => {
                        return (
                            <LibrarySong
                                key={song.id}
                                id={song.id}
                                song={song}
                                setCurrentSong={setCurrentSong}
                                songs={songs}
                                audioRef={audioRef}
                                isPlaying={isPlaying}
                                setSongs={setSongs}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Library;
