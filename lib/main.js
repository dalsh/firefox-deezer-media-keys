// Register key event handlers in each browser window
var {observer} = require("sdk/keyboard/observer");
var data = require("sdk/self").data;
var self = require("sdk/self");
var pageMod = require("sdk/page-mod");
var notifications = require("sdk/notifications");
var deezerWorker = undefined;
var matchKeys = new RegExp('MediaNextTrack|MediaTrackNext|MediaPreviousTrack|MediaTrackPrevious|MediaPlayPause');


pageMod.PageMod({
    include: "*.deezer.com",
    contentScriptFile: data.url("dz-control.js"),
    contentScriptWhen: 'ready',
    attachTo: ["existing", "top"],
    onAttach: function (worker) {
        deezerWorker = worker;
        worker.port.on("getNotificationText", function (data) {
            var notificationTitle = data.title;
            var notificationText = data.artistName + " - " + data.album;
            notifications.notify({
                title: notificationTitle,
                text: notificationText,
                iconURL: "./deezer.png"
            });
        });
    }
});

observer.on("keyup", function (event) {
    if (deezerWorker && event.key.match(matchKeys))
        deezerWorker.port.emit("sendControl", event.key);
});

exports.onUnload = function(reason) {
    console.log(reason);
    observer.off("keyup");
};