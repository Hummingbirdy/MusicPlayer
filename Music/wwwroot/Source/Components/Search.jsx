import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class Search extends React.Component {
    searchBoxRef = null;

    constructor(props) {
        super(props);
        this._onFilterChanged = this._onFilterChanged.bind(this);
        this._getTextFromItem = this._getTextFromItem.bind(this);
        this._resolveSearchBoxRef = this._resolveSearchBoxRef.bind(this);
        this._onChange = this._onChange.bind(this);
        this._onSearch = this._onSearch.bind(this);

        this.state = {
            items: [{ name: '' }]
        }
    }

    _onChange() {
        var newList = this.state.items;
        newList.unshift({ name: '' });
        this.setState({
            items: newList
        });
    }

    _onFilterChanged(filterText, tagList) {
        if (filterText != '') {
            var newList = this.state.items;
            newList[0].name = filterText;
            this.setState({
                items: newList
            });
        }
        return filterText
            ? this.state.items
                .filter(tag => tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0)
            : [];
    };

    _listContainsDocument(tag, tagList) {
        if (!tagList || !tagList.length || tagList.length === 0) {
            return false;
        }
        return tagList.filter(compareTag => compareTag.key === tag.key).length > 0;
    };

    _getTextFromItem(item) {
        return item.name;
    }

    _resolveSearchBoxRef(el) {
        this.searchBoxRef = el;
    }

    _onSearch(terms) {
        this.setState({
            items: [{ name: '' }]
        })
        this.props.search(this.searchBoxRef.items)
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
                    <span class="title">Add search terms to create playlist</span>
                </div>
                <div className="body">
                    <TagPicker
                        componentRef={this._resolveSearchBoxRef}
                        onResolveSuggestions={this._onFilterChanged}
                        getTextFromItem={this._getTextFromItem}
                        pickerSuggestionsProps={{
                            suggestionsHeaderText: 'Suggested Tags',
                            noResultsFoundText: 'No Color Tags Found'
                        }}
                        itemLimit={20}
                        disabled={false}
                        inputProps={{
                            'aria-label': 'Tag Picker'
                        }}
                        onChange={this._onChange}
                    />
                </div>
                <div className="footer">
                    <div className="button">
                        <DefaultButton
                            text='Search'
                            onClick={() => this._onSearch()}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
}

}