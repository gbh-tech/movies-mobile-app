import React from 'react';
import style from './style';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import { Divider } from 'react-native-elements';

class SearchListItem extends React.Component {

    openModal = () => {
        this.props.openModal(this.props.item);
    }
    
    render() {
        return (
            <>
                <TouchableOpacity style={style.searchListItem} onPress={this.openModal}>
                    <Text style={style.itemTitle}>
                        {this.props.item.title}
                    </Text>
                </TouchableOpacity>
                <Divider/>
            </>
        )
    }
}

export default SearchListItem;