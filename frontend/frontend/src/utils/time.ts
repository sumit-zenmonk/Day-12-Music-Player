export function formatTime(seconds: any) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    let formattedSeconds = secs < 10 ? "0" + secs : secs;
    return minutes + ":" + formattedSeconds;
}
export function formatDuration(ms: any) {
    const minutes = Number(Math.floor(ms / 60000));
    const seconds = Number(((ms % 60000) / 1000).toFixed(0));
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
};