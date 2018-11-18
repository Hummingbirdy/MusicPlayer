import * as React from 'react';
import ReactPlayer from 'react-player/lib/players/YouTube';
import { DefaultButton, IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';


export class Player extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { songs, index, url } = this.props;
        return (
            <div>
                <strong>Playing: {songs[index - 1].name}</strong>
                <ReactPlayer
                    playing
                    url={url}
                    controls={true}
                    onEnded={this.props.goNext}
                />
                Up next: {songs[index].name}
                <IconButton
                    iconProps={{
                        iconName: 'Next'
                    }}
                    onClick={this.props.goNext}
                />
                <hr />
                <div>
                    <span><Label>Current Playlist...</Label></span>
                    <div style={{ 'textAlign': 'right' }}>
                        <DefaultButton
                            text="Shuffle"
                            onClick={this.props.shuffle}
                        />
                    </div>
                </div>
                <div
                    style={{
                        overflow: 'scroll',
                        height: '500px'
                    }}
                >
                    {songs.map((s, i) => (
                        <div
                        >
                            {s.name}
                            <IconButton
                                iconProps={{
                                    iconName: 'Play'
                                }}
                                onClick={() => { this.props.playSong(i) }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}