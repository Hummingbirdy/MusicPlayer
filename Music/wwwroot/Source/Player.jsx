import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ReactPlayer from 'react-player/lib/players/YouTube';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { DefaultButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { stringify } from 'querystring';
import { Label } from 'office-ui-fabric-react/lib/Label';

initializeIcons(/* optional base url */);


export default class Player extends React.Component {
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
                {this.state.songs.length > 0 &&
                    (
                        <div>
                            <div>
                                <SearchBox
                                    placeholder="Search for Songs"
                                    onSearch={value => {
                                        this.addSearchTerm(value)
                                    }}
                                />
                                <div>
                                    {this.state.searchTerms.map((v, i) => (
                                        <span>{v} </span>
                                    ))}
                                </div>
                                <div style={{ 'textAlign': 'right' }}>
                                    <DefaultButton
                                        text='Search'
                                        onClick={() => this.search()}
                                    />
                                </div>
                            </div>
                            <hr />
                            <strong>Playing: {this.state.songs[this.state.index - 1].name}</strong>
                            <ReactPlayer
                                playing
                                url={this.state.url}
                                controls={true}
                                onEnded={this.goNext}
                            />
                            Up next: {this.state.songs[this.state.index].name}
                            <IconButton
                                iconProps={{
                                    iconName: 'Next'
                                }}
                                onClick={this.goNext}
                            />
                            <hr />
                            <div>
                                <span><Label>Current Playlist...</Label></span>
                                <div style={{ 'textAlign': 'right' }}>
                                    <DefaultButton
                                        text="Shuffle"
                                        onClick={this.shuffle}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    overflow: 'scroll',
                                    height: '500px'
                                }}
                            >
                                {this.state.songs.map((s, i) => (
                                    <div
                                    >
                                        {s.name}
                                        <IconButton
                                            iconProps={{
                                                iconName: 'Play'
                                            }}
                                            onClick={() => { this.playSong(i) }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
        )


    }
}