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
                {
                    songs.length > 0 &&
                    (
                        <div>
                            <strong>Playing: {songs[index - 1].name}</strong>
                            <IconButton
                                iconProps={{ iconName: 'AddTo' }}
                                onClick={() => this.props.openModal(songs[index - 1])}
                            />
                            <ReactPlayer
                                playing
                                url={url}
                                controls={true}
                                onEnded={this.props.goNext}
                            />
                            <br />
                            <ul className="tags">
                                {songs[index - 1].tags.map((tag, i) => {
                                    return (
                                        <li className="tag"
                                            style={{
                                                color: tag.color,
                                                'fontWeight': 'bold'
                                            }}
                                        >
                                            {tag.tag}
                                            {
                                                tag.fixed ?
                                                    (
                                                        <span
                                                            style={{
                                                                width: '15px',
                                                                display: 'inline-block'
                                                            }}
                                                        >{}</span>
                                                    )
                                                    :
                                                    (
                                                        <IconButton
                                                            iconProps={{
                                                                iconName: "StatusCircleErrorX"
                                                            }}
                                                            style={{
                                                                'height': '26px'
                                                            }}
                                                            onClick={() => this.props.delete(tag.tagReferenceId)}
                                                            disabled={tag.fixed}
                                                        />
                                                    )
                                            }

                                        </li>
                                    )
                                })}
                            </ul>
                            {
                                songs.length > 1 &&
                                (
                                    <div>
                                        Up next: {songs[index].name}
                                        <IconButton
                                            iconProps={{
                                                iconName: 'Next'
                                            }}
                                            onClick={this.props.goNext}
                                        />
                                    </div>
                                )
                            }

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
                                        <ul className="tags">
                                            {s.tags.map((tag, i) => {
                                                return (
                                                    <li className="tag"
                                                        style={{
                                                            color: tag.color,
                                                            'fontWeight': 'bold'
                                                        }}
                                                    >
                                                        {tag.tag}
                                                        {
                                                            tag.fixed ?
                                                                (
                                                                    <span
                                                                        style={{
                                                                            width: '15px',
                                                                            display: 'inline-block'
                                                                        }}
                                                                    >{}</span>
                                                                )
                                                                :
                                                                (
                                                                    <IconButton
                                                                        iconProps={{
                                                                            iconName: "StatusCircleErrorX"
                                                                        }}
                                                                        style={{
                                                                            'height': '26px'
                                                                        }}
                                                                        onClick={() => this.props.delete(tag.tagReferenceId)}
                                                                        disabled={tag.fixed}
                                                                    />
                                                                )
                                                        }

                                                    </li>
                                                )
                                            })}
                                        </ul>
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