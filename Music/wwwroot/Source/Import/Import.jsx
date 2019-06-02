import * as React from 'react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import {
    DefaultButton
} from 'office-ui-fabric-react/lib/Button';
import axios from 'axios';
import { setTimeout } from 'timers';

initializeIcons(/* optional base url */);

let CLIENT_ID = '803038318923-b61uu8gs8ksnvc5rk0sllacr9cr48sai.apps.googleusercontent.com',
    DISCOVERYDOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"],
    SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

async function retreivePlaylists() {
    return new Promise(resolve => {
        window.gapi.client.youtube.playlists.list({
            'maxResults': '50',
            'part': 'id, snippet',
            'mine': true
        }).then(async (response) => {

            var playlists = response.result.items;
            resolve(playlists);
        });
    });
}

async function retreivedPagedSongs(playlistId, name, pageToken) {
    return new Promise(resolve => {
        window.gapi.client.youtube.playlistItems.list({
            'maxResults': '50',
            'part': 'snippet, contentDetails',
            'playlistId': playlistId,
            'pageToken': pageToken
        }).then(async (response) => {
            var songs = response.result.items;
            var nextPage = response.result.nextPageToken || null;

            let newSongs = songs.map(song => {
                var thumbnail = "N/A";
                if (song.snippet.thumbnails != undefined) {
                    thumbnail = song.snippet.thumbnails.default.url
                }

                return ({
                    YouTubeId: song.contentDetails.videoId,
                    Name: song.snippet.title,
                    Thumbnail: thumbnail,
                    PublishedDate: song.contentDetails.videoPublishedAt,
                    Playlist: name
                });

            });
            resolve({
                newSongs,
                nextPage
            });
        });
    });
}

export default class Import extends React.Component {
    constructor(props) {
        super(props);
        this._load = this._load.bind(this);
        this._initClient = this._initClient.bind(this);
        this._updateSigninStatus = this._updateSigninStatus.bind(this);
        this._handleAuthClick = this._handleAuthClick.bind(this);
        this._handleSignoutClick = this._handleSignoutClick.bind(this);
        this._sync = this._sync.bind(this);

        this.state = {
            isSignedIn: false,
            syncing: false
        }
    }

    componentDidMount() {
        this._load();
    }

    _load() {
        window.gapi.load('client:auth2', this._initClient)
    }

    _initClient() {
        window.gapi.client.init({
            discoveryDocs: DISCOVERYDOCS,
            clientId: CLIENT_ID,
            scope: SCOPES
        }).then(() => {
            // Listen for sign-in state changes.
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(this._updateSigninStatus);

            // Handle the initial sign-in state.
            this._updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        })
    }

    _updateSigninStatus(isSignedIn) {
        this.setState({
            isSignedIn
        });
    }

    _handleAuthClick() {
        window.gapi.auth2.getAuthInstance().signIn();
    }

    _handleSignoutClick() {
        window.gapi.auth2.getAuthInstance().signOut();
    }

    _sync() {
        const config = {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        };

        retreivePlaylists().then(async playlists => {
            let songs = [];
            let finalArray = playlists.map(async p => {
                let name = p.snippet.title;

                let pageToken = null;
                do {
                    await retreivedPagedSongs(p.id, name, pageToken).then(result => {
                        pageToken = result.nextPage;
                        songs = [...songs, ...result.newSongs]
                    })
                }
                while (pageToken != null);
                return;
            });
            await Promise.all(finalArray);
            axios.post('/Upload/Playlist', JSON.stringify(songs), config)
                .then(res => { });
        });
    }

    render() {
        const { isSignedIn } = this.state;
        return (
            <div>
                Import
                <DefaultButton
                    text={isSignedIn ? 'Sign Out' : 'Sign In'}
                    onClick={isSignedIn ? this._handleSignoutClick : this._handleAuthClick}
                />
                <br />
                <hr />
                <br />
                {
                    isSignedIn &&
                    (
                        <div>
                            <DefaultButton
                                text='Sync'
                                onClick={() => this._sync()}
                            />
                        </div>
                    )
                }

            </div>
        )
    }
}