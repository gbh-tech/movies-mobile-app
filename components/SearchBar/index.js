import React from 'react';
import {SearchBar as RNSearchBar} from 'react-native-elements';

class SearchBar extends React.Component {
    state = {
        term: ''
    }
    
    onChangeText = (text) => {
        let visible = text.length > 0 ? true : false
        this.setState({ term: text }, 
            () => {
                this.props.toggleSearchScreenVisibility(visible)
                this.props.onChange(this.state.term);
            });
    }
    
    render() {
        return (
            <RNSearchBar 
                onChangeText={this.onChangeText}
                placeholder="Search" 
                lightTheme 
                value={this.state.term}
                round
            />
        )
    }
}

export default SearchBar;