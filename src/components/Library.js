import React from "react";
import LibrarySong from "./LibrarySong";

function Library({ songs }) {
    return (
        <div>
            <div className="library">
                <h2>Library</h2>
                <div className="library-songs">
                    {songs.map((song) => {
                        return <LibrarySong song={song} />;
                    })}
                </div>
            </div>
        </div>
    );
}

export default Library;
