export const playAudio = (isPlaying, audioRef) => {
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
};
