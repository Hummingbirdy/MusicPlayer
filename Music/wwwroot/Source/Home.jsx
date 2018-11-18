import * as React from 'react';
import { stringify } from 'querystring';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { Search } from "./Components/Search.jsx";
import { Player } from "./Components/Player.jsx";

initializeIcons(/* optional base url */);

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.goNext = this.goNext.bind(this);
        this.playSong = this.playSong.bind(this);
        this.search = this.search.bind(this);
        this.addSearchTerm = this.addSearchTerm.bind(this);
        this.shuffle = this.shuffle.bind(this);

        this.state = {
            songs: [],
            url: null,
            index: 0,
            nextSongName: null,
            searchTerms: []
        };
    }

    componentDidMount() {
        fetch("/Player/Songs")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    songs: result.songs,
                    url: 'https://www.youtube.com/watch?v=' + result.songs[this.state.index].youTubeId,
                    nextSongName: result.songs[this.state.index + 1].name,
                    index: this.state.index + 1
                });
            })
    }

    addSearchTerm(value) {
        let terms = this.state.searchTerms;
        terms.push(value);

        this.setState({
            searchTerms: terms
        });
    }

    search() {
        let values = this.state.searchTerms;
        fetch(`/Player/Search`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values),

        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    songs: result.songs,
                    url: 'https://www.youtube.com/watch?v=' + result.songs[0].youTubeId,
                    index: 1
                });
            })
    }

    shuffle() {
        let s = this.state.songs;
        var ctr = s.length, temp, index;

        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = s[ctr];
            s[ctr] = s[index];
            s[index] = temp;
        }

        this.setState({
            songs: s,
            url: 'https://www.youtube.com/watch?v=' + s[0].youTubeId,
            index: 1

        })
    }

    goNext() {
        this.setState({
            url: 'https://www.youtube.com/watch?v=' + this.state.songs[this.state.index].youTubeId,
            index: this.state.index + 1
        })
    }

    playSong(i) {
        this.setState({
            url: 'https://www.youtube.com/watch?v=' + this.state.songs[i].youTubeId,
            index: i + 1
        })
    }

    render() {
        return (
            <div>
                <Search
                    search={this.search}
                    addSearchTerm={this.addSearchTerm}
                    searchTerms={this.state.searchTerms}
                />
                {this.state.songs.length > 0 &&
                    <Player
                        songs={this.state.songs}
                        index={this.state.index}
                        url={this.state.url}
                        goNext={this.goNext}
                        shuffle={this.shuffle}
                        playSong={this.playSong}
                    />
                }
            </div>
        );
    }
}