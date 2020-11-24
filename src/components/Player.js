import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, isPlaying, setIsPlaying }) => {
    //!----------- REF ------------
    const audioRef = useRef(null);
    //!----------------------------

    //*-----------STATE------------
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0,
    });
    //*----------------------------

    //?-----------FUNCTIONS---------

    const playSongHandler = () => {
        //se isPlaying e' true metto in pausa senno metto in play
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        //ricorda di cambiare lo stato di isPlaying
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = (e) => {
        //!questa funzione scatta su <audio onTimeUpdate...> cioe' ogni volta che cambia
        // console.log(e.target.currentTime);
        // console.log(e.target.duration);
        const { currentTime, duration } = e.target;
        setSongInfo({ ...songInfo, currentTime, duration });
    };

    const getTimeInMinutes = (timeInSeconds) => {
        return (
            Math.floor(timeInSeconds / 60) +
            ":" +
            ("0" + Math.floor(timeInSeconds % 60)).slice(-2)
        );
    };

    const handleDrag = (e) => {
        //!questa funzione scatta all' onChange
        // console.log(e.target.value);
        // console.log(audioRef);
        const currentPoint = e.target.value;
        audioRef.current.currentTime = currentPoint; //?sposto il tempo della canzone nel punto in cui sto draggando il pallino, senno la canzone rimarrebbe al tempo che sta scorrendo
        setSongInfo({ ...songInfo, currentTime: currentPoint });
    };
    //?----------------------------

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTimeInMinutes(songInfo.currentTime)}</p>
                <input
                    value={songInfo.currentTime}
                    onChange={handleDrag}
                    min={0}
                    max={songInfo.duration}
                    type="range"
                />
                <p>{getTimeInMinutes(songInfo.duration)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                />
            </div>
            <audio
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleTimeUpdate} //!mi serve per caricare subito la duration senza aspettare il click sul bottone play
                ref={audioRef}
                src={currentSong.audio}
            />
        </div>
    );
};

export default Player;
