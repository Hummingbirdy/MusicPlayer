import * as React from 'react';
import ReactPlayer from 'react-player/lib/players/YouTube';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import {
    DefaultButton, IconButton,
    Dropdown, DropdownMenuItemType,
    Icon,
    TextField,
    SwatchColorPicker,
    Label
} from 'office-ui-fabric-react';

export class TagModal extends React.Component {
    constructor(props) {
        super(props);
        this._renderOption = this._renderOption.bind(this);
        this._onClick_Save = this._onClick_Save.bind(this);
        this._onClick_Close = this._onClick_Close.bind(this);
        this.state = {
            adding: false,
            newTagName: null,
            tagId: null,
        }
    }

    _renderOption(option) {
        return (
            <div>
                {
                    option.data && option.data.icon && (
                        <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} aria-hidden="true" title={option.data.icon} />
                    )
                }
                < span > {option.text}</span >
            </div>
        );
    }

    _onClick_Save() {
        let tagDetails = {
            TagId: this.state.adding ? null : this.state.tagId,
            YouTubeId: this.props.song.youTubeId,
            Tag: this.state.newTagName,
            Color: this.state.selectedHex
        }
        this.props.save(tagDetails);
    }

    _onClick_Close() {
        this.setState({
            adding: false,
            newTagName: null,
            tagId: null,
        }),
            this.props.closeModal()
    }

    render() {
        let { adding } = this.state;
        return (
            <Modal
                isOpen={this.props.showModal}
                onDismiss={this._onClick_Close}
                isBlocking={false}
                containerClassName="modal-container -xwide"
            >
                <div className="header">
                    {
                        this.props.song != undefined &&
                        <span class="title">Add a tag to {this.props.song.name}</span>
                    }
                </div>
                <div className="body">
                    {
                        adding ?
                            (
                                <div>
                                    <TextField
                                        label={'Tag'}
                                        placeholder={'Enter tag name...'}
                                        onChange={(ev, value) => {
                                            this.setState({
                                                newTagName: value
                                            });
                                        }}
                                    />
                                    <hr />
                                    <Label> Select tag color... </Label>
                                    <SwatchColorPicker
                                        selectedId={this.state.color}
                                        onCellHovered={(id, color) => this.setState({ previewColor: color })}
                                        onCellFocused={(id, color) => this.setState({ previewColor: color })}
                                        columnCount={4}
                                        cellShape={'circle'}
                                        cellHeight={35}
                                        cellWidth={35}
                                        cellBorderWidth={3}
                                        colorCells={this.props.colors}
                                        onColorChanged={(id, color) => {
                                            this.setState({
                                                selectedHex: color
                                            })
                                        }}
                                    />
                                </div>
                            )
                            :
                            (
                                <Dropdown
                                    label="Select tag"
                                    onRenderOption={this._renderOption}
                                    options={this.props.tags}
                                    onChange={(ev, option) => {
                                        if (option.key === 'add') {
                                            this.setState({
                                                adding: true
                                            });
                                        }
                                        else {
                                            this.setState({
                                                tagId: option.key
                                            });
                                        }
                                    }}
                                />
                            )
                    }
                </div>
                <div className="footer">
                    <div className="button">
                        <DefaultButton
                            text='Add'
                            onClick={() => this._onClick_Save()}
                        />
                    </div>
                </div>
            </Modal>
        )
    }


}