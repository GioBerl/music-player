import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleLeft,
    faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { playAudio } from "../utils";

function Player({
    currentSong,
    setCurrentSong,
    isPlaying,
    setIsPlaying,
    audioRef,
    handleTimeUpdate,
    songInfo,
    setSongInfo,
    songs,
    setSongs,
}) {
    //*----------USEEFFECT---------
    useEffect(() => {
        //!change active state
        const newSongs = songs.map((song) => {
            return song.id === currentSong.id
                ? { ...song, active: true }
                : { ...song, active: false };
        });
        setSongs(newSongs);
    }, [currentSong]);
    //*----------------------------

    //?----------FUNCTIONS---------

    const playSongHandler = () => {
        //se isPlaying e' true metto in pausa senno metto in play
        isPlaying ? audioRef.current.pause() : audioRef.current.play();
        //ricorda di cambiare lo stato di isPlaying
        setIsPlaying(!isPlaying);
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

    const handleSkip = (direction) => {
        // indivduo l'indice della canzone corrente
        let currentIndex = songs.findIndex(
            (song) => song.id === currentSong.id
        );
        //! caso skip forward
        if (direction === "forward") {
            //ES ultima canzone avra' index 5 => songs[6%6] == 0
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }
        //! caso skip back
        if (direction === "back") {
            //ES prima canzone avra' index 0 => songs[-1%6] == -1
            if ((currentIndex - 1) % songs.length === -1) {
                setCurrentSong(songs[songs.length - 1]);
                playAudio(isPlaying, audioRef);
                return;
            }
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);
        }

        playAudio(isPlaying, audioRef);
    };

    //?----------------------------

    // CALC animation percentage (usato nello style di .animated track)
    const animationPercentage =
        (songInfo.currentTime / songInfo.duration) * 100;

    return (
        <div className="player">
            <div className="time-control">
                <p>{getTimeInMinutes(songInfo.currentTime)}</p>
                {/* wrappo l'input in un div per le animazioni            */}
                <div
                    className="track"
                    style={{
                        background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`,
                    }}
                >
                    <input
                        value={songInfo.currentTime}
                        onChange={handleDrag}
                        min={0}
                        max={songInfo.duration || 0}
                        type="range"
                    />
                    <div
                        className="animated-track"
                        style={{
                            transform: `translateX(${animationPercentage}%)`,
                        }}
                    ></div>
                </div>

                <p>
                    {songInfo.duration
                        ? getTimeInMinutes(songInfo.duration)
                        : "0:00"}
                </p>
            </div>
            <div className="play-control">
                {/* BACK */}
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                    onClick={() => handleSkip("back")}
                />
                {/* PAUSE */}
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                {/* FORWARD */}
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={() => handleSkip("forward")}
                />
            </div>
        </div>
    );
}

export default Player;
