import * as React from 'react';
import ReactPlayer from 'react-player/lib/players/YouTube';
import { DocumentCard, DocumentCardActivity, DocumentCardPreview, DocumentCardTitle, IDocumentCardPreviewProps } from 'office-ui-fabric-react/lib/DocumentCard';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { FocusZone, FocusZoneDirection } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IconButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';

export class SongList extends React.Component {
    constructor(props) {
        super(props);
        this._onRenderCell = this._onRenderCell.bind(this);
    }

    _onRenderCell(song, index, isScrolling) {
        return (
            <div className="ms-ListGhostingExample-itemCell" data-is-focusable={true} >
                <Image
                    className="ms-ListGhostingExample-itemImage"
                    src={isScrolling ? undefined : song.thumbnail}
                    width={120}
                    height={90}
                    imageFit={ImageFit.cover}
                />
                <div className="ms-ListGhostingExample-itemContent">
                    <div className="ms-ListGhostingExample-itemName">
                        {song.name}
                    </div>
                    <ul className="tags">
                        {song.tags.map((tag, i) => {
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
                                                    className={'tag-icon'}
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
                        <IconButton
                            iconProps={{ iconName: 'AddTo' }}
                            onClick={() => this.props.openModal(song)}
                        />
                    </ul>
                </div>
                <br />
                <hr />
            </div>
        )
    }

    render() {
        return (
            <FocusZone direction={FocusZoneDirection.vertical} >
                <div className="ms-ListGhostingExample-container scrollbar" id="style-2">
                    <div className="force-overflow">
                        <List
                            items={this.props.songs}
                            onRenderCell={this._onRenderCell}
                        />
                    </div>
                </div>
            </FocusZone>
        );
    }
}
