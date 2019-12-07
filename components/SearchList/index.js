import React from 'react';
import style from './style';
import SearchListItem from '../SearchListItem';
import {
    FlatList,
    View
} from 'react-native';

class SearchList extends React.Component {

    renderListItem = ({ item }) => (
        <SearchListItem 
            item={item}
            openModal={this.props.openModal}
        />
    )

    render() {
        return (
            <View style={style.searchList}>
                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item.id}
                    renderItem={this.renderListItem}
                    contentContainerStyle={{ paddingBottom: 200 }}
                />
            </View>
        )
    }
}

export default SearchList;