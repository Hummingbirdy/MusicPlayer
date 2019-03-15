import * as React from 'react';
import ReactPlayer from 'react-player/lib/players/YouTube';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { DefaultButton, IconButton, Dropdown, Icon, TextField } from 'office-ui-fabric-react';

export class TagModal extends React.Component {
    constructor(props) {
        super(props);
        this._renderOption = this._renderOption.bind(this);
        this.state = {
            adding: false
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

    render() {
        let { adding } = this.state;
        return (
            <Modal
                isOpen={this.props.showModal}
                onDismiss={this.props.closeModal}
                isBlocking={false}
                containerClassName="modal-container -xwide"
            >
                <div className="header">
                    <span class="title">Add a tag to {this.props.song}</span>
                </div>
                <div className="body">
                    {
                        adding ?
                            (
                                <TextField
                                    label={'test'}
                                />
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
                                    }}
                                />
                            )
                    }
                </div>
                <div className="footer">
                    <div className="button">
                        <DefaultButton
                            text='Add'
                            onClick={() => this.props.save(tagDetails)}
                        />
                    </div>
                </div>
            </Modal>
        )
    }


}