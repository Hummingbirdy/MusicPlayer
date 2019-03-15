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
                                <li className="tag" >
                                    {tag.tag  }                                   
                                </li>
                            )
                        })}
                        <IconButton
                            iconProps={{ iconName: 'AddTo' }}
                            onClick={() => this.props.openModal(song.name)}
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
                <div className="ms-ListGhostingExample-container" data-is-scrollable={true}>
                    <List
                        items={this.props.songs}
                        onRenderCell={this._onRenderCell}
                    />
                </div>
            </FocusZone>
        );
    }
}
