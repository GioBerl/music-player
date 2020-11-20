//STYLE
import "./styles/app.scss";
//DATA
import data from "./data";

import Player from "./components/Player";
import Song from "./components/Song";
import { useState } from "react";

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
            />
        </div>
    );
}

export default App;
