import * as React from 'react';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { TagPicker } from 'office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Modal } from 'office-ui-fabric-react/lib/Modal';
import { Label } from 'office-ui-fabric-react/lib/Label';

export class TagPickerComponent extends React.Component {
    constructor(props) {
        super(props);

        this._onFilterChanged = this._onFilterChanged.bind(this);
        this._getTextFromItem = this._getTextFromItem.bind(this);
        this._onChange = this._onChange.bind(this);

        this.state = {
            items: []
        }

    }

    componentDidMount() {
        this.setState({
            items: this.props.items
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.items != this.props.items) {
            this.setState({
                items: this.props.items
            });
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
        this.props.update(tagList);
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


    render() {
        return (
            <div>
                <TagPicker
                    select
                    onResolveSuggestions={this._onFilterChanged}
                    getTextFromItem={this._getTextFromItem}
                    pickerSuggestionsProps={{
                        suggestionsHeaderText: 'Suggested Tags',
                        noResultsFoundText: 'No Tags Found'
                    }}
                    itemLimit={20}
                    disabled={false}
                    inputProps={{
                        'aria-label': 'Tag Picker'
                    }}
                    onChange={this._onChange}
                    placeholder={this.props.placeHolder}
                />
            </div>
        )
    }
}
