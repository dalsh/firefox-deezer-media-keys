self.port.on("sendControl", function(key) {
    if(unsafeWindow.dzPlayer) {
        var player = unsafeWindow.dzPlayer;
        if (key.match(/MediaPlayPause/)) {
            player.control.togglePause();
        }

        if (key.match(/MediaNextTrack|MediaTrackNext/)) {
            player.control.nextSong();
            sendNotificationText(player)
        }

        if (key.match(/MediaPreviousTrack|MediaTrackPrevious/)) {
            player.control.prevSong();
            sendNotificationText(player)
        }
    }
});

function sendNotificationText(player) {
    self.port.emit("getNotificationText", {"artistName": player.getArtistName(), "album": player.getAlbumTitle(), "title": player.getSongTitle()});
}