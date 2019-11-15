import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { TagPickerComponent } from "../../shared/TagPicker.jsx";
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class Search extends React.Component {

    constructor(props) {
        super(props);

        this._onSearch = this._onSearch.bind(this);
        this._updateNames = this._updateNames.bind(this);
        this._updateTags = this._updateTags.bind(this);

        this.state = {
            items: [{ name: '' }],
            nameTerms: [],
            tagTerms: []
        }
    }

    _updateNames(terms) {
        this.setState({
            nameTerms: terms
        });
    }

    _updateTags(terms) {
        this.setState({
            tagTerms: terms
        });
    }

    _onSearch(terms) {
        this.setState({
            items: [{ name: '' }]
        })
        let searchTerms = {
            Names: this.state.nameTerms,
            Tags: this.state.tagTerms
        }
        this.props.search(searchTerms);
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.showModal}
                    onDismiss={this.props.closeModal}
                    isBlocking={false}
                    containerClassName="modal-container -xwide"
                >
                    <div className="header">
                        <span class="title">Create your playlist</span>
                    </div>
                    <div className="body">
                        <div
                            style={{
                                'marginBottom': '5px'
                            }}
                        >
                            Search by song or artist
                    </div>
                        <TagPickerComponent
                            items={this.state.items}
                            update={this._updateNames}
                        />
                        <br />
                        <div
                            style={{
                                'marginBottom': '5px'
                            }}
                        >
                            Search by Tag
                        </div>
                        <TagPickerComponent
                            items={this.props.tags}
                            update={this._updateTags}
                        />
                    </div>
                    <div className="footer-button">
                        <div className="button">
                            <DefaultButton
                                className={'default-button'}
                                text='Search'
                                onClick={() => this._onSearch()}
                                style={{
                                    'width': '100%'
                                }}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }

}