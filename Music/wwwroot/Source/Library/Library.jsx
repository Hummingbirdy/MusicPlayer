import * as React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import { SongList } from './Components/SongList.jsx';
import { TagModal } from './Components/TagModal.jsx';
import { DropdownMenuItemType } from 'office-ui-fabric-react';

initializeIcons(/* optional base url */);

export default class Library extends React.Component {
    constructor(props) {
        super(props);
        this._load = this._load.bind(this);
        this.addTag = this.addTag.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

        this.state = {
            songs: [],
            tags: [],
            colors: [],
            showModal: false,
            modalSong: null
        }
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
                });
            });

        fetch("/Library/GetColors")
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    colors: result.colors
                });
            });

        fetch("/Library/GetAllTags")
            .then(res => res.json())
            .then((result) => {
                let keyedTags = [];
                result.tags.map(r => {
                    if (r.tagType != 1) {
                        keyedTags.push({
                            key: r.tagId,
                            text: r.tag,
                            data: {}
                        });
                    }
                });
                if (keyedTags.length > 0) {
                    keyedTags.push({
                        key: 'divider',
                        text: '-',
                        itemType: DropdownMenuItemType.Divider
                    });
                }
                keyedTags.push({
                    key: 'add',
                    text: 'Add a new Tag',
                    data: { icon: 'Add' }
                });
                this.setState({
                    tags: keyedTags
                });
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
                        showModal: false
                    });
            });
    }

    openModal(song) {
        this.setState({
            showModal: true,
            modalSong: song
        });
    }

    closeModal() {
        this.setState({
            showModal: false
        })
    }


    render() {
        return (
            <div>
                <br />
                <h2>Library</h2>
                <hr />
                <SongList
                    songs={this.state.songs}
                    tags={this.state.tags}
                    openModal={this.openModal}
                />
                <TagModal
                    showModal={this.state.showModal}
                    closeModal={this.closeModal}
                    song={this.state.modalSong}
                    tags={this.state.tags}
                    colors={this.state.colors}
                    save={this.addTag}
                />
            </div>
        )
    }

}
