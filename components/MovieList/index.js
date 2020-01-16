import React from 'react';
import MovieCard from '../../components/MovieCard';
import MovieProfile from '../../components/MovieProfile';
import SearchBar from '../SearchBar';
import SearchList from '../SearchList';
import style from './style';
import LoadingView from '../../components/LoadingView';
import {
    FlatList,
    SafeAreaView,
    View,
    Text
} from 'react-native';
import SortPicker from '../SortPicker';

class MovieList extends React.Component {
    state = {
        modalVisible: false,
        modalData: {},
        searchBarVisible: false,
    };

    openModal = (modalData) => {
        this.setState({ modalData, modalVisible: true })
    }

    closeModal = () => {
        this.setState({ modalVisible: false })
    }

    _onScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        if (scrollPosition < -60) {
            this.props.showSearchBar();
        }
        if (scrollPosition > 40) {
            this.props.hideSearchBar()
        }
    }
    
    toggleFavorite = (movie) => {
        this.props.toggleFavorite(movie)
    }

    renderCard = ({ item }) => (
        <MovieCard
            movie={item}
            onPress={this.openModal}
            toggleFavorite={this.toggleFavorite}
            isFavorite={this.props.isFavorite}
        />
    )

    onEmptyList = () => (
        <View style={style.emptyListPlaceholder}>
            <Text style={style.emptyListMessage}>
                List is empty.
            </Text>
        </View>
    )
    
    render() {
        return (
            <SafeAreaView>
                { this.props.searchBarVisible && (
                    <View>
                        <SearchBar 
                            toggleSearchScreenVisibility={this.props.toggleSearchScreenVisibility}
                            onChange={this.props.onSearchChange}
                        />
                        { !this.props.isSearching && (
                            <SortPicker 
                                setSorting={this.props.setSorting}
                                sortOptions={this.props.sortOptions}
                                sortMode={this.props.sortMode}
                            />
                        )}
                    </View>
                )}
                {
                    this.props.isLoading
                    ? <LoadingView/>
                    : this.props.isSearching 
                        ? <SearchList 
                            data={this.props.searchData}
                            openModal={this.openModal}
                        />
                        : <FlatList
                            data={this.props.data}
                            numColumns={3}
                            renderItem={this.renderCard}
                            keyExtractor={item => item.id}
                            ListFooterComponent={View}
                            ListFooterComponentStyle={style.footer}
                            columnWrapperStyle={style.columns}
                            onEndReached={this.props.fetchMovies}
                            onScroll={this._onScroll}
                            ListEmptyComponent={this.onEmptyList}
                            style={style.list}
                        />
                }
                <MovieProfile 
                    modalVisible={this.state.modalVisible} 
                    closeModal={this.closeModal}
                    movie={this.state.modalData}
                    onPress={this.toggleFavorite}
                    isFavorite={this.props.isFavorite}
                />
            </SafeAreaView>
        )
    }
}

export default MovieList;