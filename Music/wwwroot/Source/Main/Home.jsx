import * as React from 'react';
import ReactDOM from 'react-dom';
import { stringify } from 'querystring';
import {
    initializeIcons,
    DefaultButton,
    DropdownMenuItemType,
    IconButton
} from 'office-ui-fabric-react';
import { Search } from "./Components/Search.jsx";
import { Player } from "./Components/Player.jsx";
import { TagModal } from '../shared/TagModal.jsx';

initializeIcons(/* optional base url */);

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this._load = this._load.bind(this);
        this.goNext = this.goNext.bind(this);
        this.playSong = this.playSong.bind(this);
        this.search = this.search.bind(this);
        this.shuffle = this.shuffle.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.openTagModal = this.openTagModal.bind(this);
        this.closeTagModal = this.closeTagModal.bind(this);

        this.state = {
            songs: [],
            url: null,
            index: 0,
            nextSongName: null,
            showModal: false,
            tags: [],
            showTagModal: false,
            colors: [],
            modalSong: null,
            modalTags: []
        };
    }

    componentDidMount() {
        this._load();
    }

    _load() {
        fetch("/Player/Songs")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    songs: result.songs,
                    url: 'https://www.youtube.com/watch?v=' + result.songs[this.state.index].youTubeId,
                    nextSongName: result.songs[this.state.index + 1].name,
                    index: this.state.index + 1
                });
            });

        fetch("/Library/GetAllTags")
            .then(res => res.json())
            .then((result) => {
                let keyedTags = [];
                result.tags.map(r => {
                    keyedTags.push({
                        key: r.tagId,
                        name: r.tag,
                    });
                });
                this.setState({
                    tags: keyedTags
                });

                let modalTags = [];
                result.tags.map(r => {
                    if (r.tagType != 1) {
                        modalTags.push({
                            key: r.tagId,
                            text: r.tag,
                            data: {}
                        });
                    }
                });
                if (modalTags.length > 0) {
                    modalTags.push({
                        key: 'divider',
                        text: '-',
                        itemType: DropdownMenuItemType.Divider
                    });
                }
                modalTags.push({
                    key: 'add',
                    text: 'Add a new Tag',
                    data: { icon: 'Add' }
                });
                this.setState({
                    modalTags: modalTags
                });
            });

        fetch("/Library/GetColors")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    colors: result.colors
                });
            });
    }

    search(searchTerms) {
        fetch(`/Player/Search`, {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(searchTerms),

        })
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    songs: result.songs,
                    url: 'https://www.youtube.com/watch?v=' + result.songs[0].youTubeId,
                    index: 1,
                    showModal: false
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

    openModal() {
        this.setState({
            showModal: true
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        });
    }

    addTag(tagDetails) {
        fetch('/Library/AddTagReference', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tagDetails),
        })
            .then(res => res.json())
            .then((result) => {
                this._load(),
                    this.setState({
                        showTagModal: false
                    });
            });
    }

    deleteTag(referenceId) {
        fetch('/Library/DeleteTagReference', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(referenceId),
        })
            .then(res => res.json())
            .then((result) => {
                this._load(),
                    this.setState({
                        showTagModal: false
                    });
            });

    }

    openTagModal(song) {
        this.setState({
            showTagModal: true,
            modalSong: song
        });
    }

    closeTagModal() {
        this.setState({
            showTagModal: false
        })
    }

    render() {
        return (
            <div>
                <div style={{ 'textAlign': 'right' }}>
                    <DefaultButton
                        className={'default-button'}
                        text='M'
                        onClick={() => this.openModal()}
                    />
                  
                </div>
               
                <Search
                    search={this.search}
                    showModal={this.state.showModal}
                    openModal={this.openModal}
                    closeModal={this.closeModal}
                    tags={this.state.tags}
                />
                {this.state.songs.length > 0 &&
                    <Player
                        songs={this.state.songs}
                        index={this.state.index}
                        url={this.state.url}
                        goNext={this.goNext}
                        shuffle={this.shuffle}
                        playSong={this.playSong}
                        openModal={this.openTagModal}
                    />
                }
                <TagModal
                    showModal={this.state.showTagModal}
                    closeModal={this.closeTagModal}
                    song={this.state.modalSong}
                    tags={this.state.modalTags}
                    colors={this.state.colors}
                    save={this.addTag}
                />
                
            </div>
        );
    }
}
