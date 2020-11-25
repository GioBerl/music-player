//STYLE
import "./styles/app.scss";
//DATA
import data from "./data";

import Player from "./components/Player";
import Song from "./components/Song";
import { useRef, useState } from "react";
import Library from "./components/Library";

function App() {
    //!----------- REF ------------
    const audioRef = useRef(null);
    //!----------------------------

    //*-----------STATE------------
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    //*----------------------------

    //?----------FUNCTIONS---------
    const handleTimeUpdate = (e) => {
        //!questa funzione scatta su <audio onTimeUpdate...> cioe' ogni volta che cambia
        // console.log(e.target.currentTime);
        // console.log(e.target.duration);
        const { currentTime, duration } = e.target;
        setSongInfo({ ...songInfo, currentTime, duration });
    };
    //?----------------------------

    return (
        <div className="App">
            <Song currentSong={currentSong} />
            <Player
                songInfo={songInfo}
                setSongInfo={setSongInfo}
                handleTimeUpdate={handleTimeUpdate}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                currentSong={currentSong}
            />
            <Library
                songs={songs}
                setCurrentSong={setCurrentSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
            />

            <audio
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate} //!mi serve per caricare subito la duration senza aspettare il click sul bottone play
                ref={audioRef}
                src={currentSong.audio}
            />
        </div>
    );
}

export default App;
