import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ currentSong, libraryStatus, setLibraryStatus }) {
    return (
        <nav>
            <h1>{currentSong.name}</h1>
            <button onClick={() => setLibraryStatus(!libraryStatus)}>
                Library <FontAwesomeIcon icon={faMusic} />
            </button>
        </nav>
    );
}

export default Nav;
