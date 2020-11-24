import React from "react";
import LibrarySong from "./LibrarySong";

function Library({ songs, setCurrentSong }) {
    return (
        <div>
            <div className="library">
                <h2>Library</h2>
                <div className="library-songs">
                    {songs.map((song) => {
                        return (
                            <LibrarySong
                                key={song.id}
                                song={song}
                                setCurrentSong={setCurrentSong}
                                songs={songs}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Library;
