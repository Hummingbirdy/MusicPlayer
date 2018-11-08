// Client ID and API key from the Developer Console
var CLIENT_ID = '803038318923-b61uu8gs8ksnvc5rk0sllacr9cr48sai.apps.googleusercontent.com';
var PLAYLIST_ID = 'PLYqwI0-aGKURnlh8uZYDxgD1F69fHHObl';
var SONG_ARRAY = [];

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

// Authorization scopes required by the API. If using multiple scopes,
// separated them with spaces.
var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var loadButton = document.getElementById('load-songs');
var uploadButton = document.getElementById('upload');

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
       // getPlaylists();
    } else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append text to a pre element in the body, adding the given message
 * to a text node in that element. Used to display info from API response.
 *
 * param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('content');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}

/**
 * Print files.
 */
function getPlaylists() {
    gapi.client.youtube.playlists.list({
        'maxResults': '50',
        'part': 'id, snippet',
        'mine': true
    }).then(function (response) {
        var playlists = response.result.items;

        playlists.forEach(function (playlist) {
            // PLAYLIST_ARRAY.push({ playlistId: playlist.id, name: playlist.snippet.title })
            //appendPre('***** PLAYLIST: ' + playlist.snippet.title + ' *****');
            getSongs(playlist.id, playlist.snippet.title, null);
        })

       // getSongs(playlist, null);
    });
}

function getSongs(playlistId, name, pageToken) {
    gapi.client.youtube.playlistItems.list({
        'maxResults': '50',
        'part': 'snippet, contentDetails',
        'playlistId': playlistId,
        'pageToken': pageToken
    }).then(function (response) {
        var songs = response.result.items;
        var nextPage = response.result.nextPageToken || null;

        songs.forEach(function (song) {
            appendPre('Playlist: ' + name);
            appendPre('Song Id: ' + song.contentDetails.videoId);
            appendPre('Title: ' + song.snippet.title);
           // appendPre('Thumbnail: ' + song.snippet.thumbnails.default.url);
            appendPre('Date: ' + song.contentDetails.videoPublishedAt);
            appendPre('---------------------------');
            appendPre('');

            ///////////////
            //var thumbnail = song.snippet.thumbnails.default.url == undefined ? "" : song.snippet.thumbnails.default.url;
            var thumbnail = "N/A";
            if (song.snippet.thumbnails != undefined) {
                thumbnail = song.snippet.thumbnails.default.url
            }
            SONG_ARRAY.push({
                YouTubeId: song.contentDetails.videoId,
                Name: song.snippet.title,
                Thumbnail: thumbnail,
                PublishedDate: song.contentDetails.videoPublishedAt,
                Playlist: name
            })

        })

        if (nextPage != null) {
            getSongs(playlistId, name, nextPage);
        } else {
            //send();
        }

    })
}

function send() {
    var Param1 = "Taylor";
    var Param2 = "LeMaster";
    $.ajax({
        type: "POST",
        url: "/Upload/Playlist",
        data: {
            songs: SONG_ARRAY
        },
        success: function (msg) {
            var test = msg;               
        },
        Error: function (x, e) {
            var test = x;
        }
    });
}
