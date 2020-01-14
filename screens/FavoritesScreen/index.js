import React from 'react';
import MovieList from '../../components/MovieList';
import Header from '../../components/Header';
import {connect} from 'react-redux';
import sortOptions from './sortOptions';

class FavoritesScreen extends React.Component {
    state = {
        isSearching: false,
        searchBarVisible: false
    }

    handleSearchScreenVisibility = (state) => {
        this.setState({
            isSearching: state
        })
    }

    showSearchBar = () => {
        this.setState({ searchBarVisible: true })
    }

    hideSearchBar = () => {
        this.setState({ searchBarVisible: false })
    }

    toggleSearchBar = () => {
        this.setState(
            (prevState) => {
                return {searchBarVisible: !prevState.searchBarVisible}
            }
        )
    }


    handleSearchChange = (text) => {
        this.props.searchFavorite(text);
    }

    handleSort = (sortOption) => {
        this.props.sortFavorites(sortOption)
    }

    setMovieListData = () => (
        this.state.isSearching 
        ? this.props.searchData
        : this.props.data
    )

    isFavorite = (movie) => {
        const result = this.props.data.find((favorite) => (
            favorite.id == movie.id
        ))
        if (result === undefined) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <>
                <Header title="Favorites"
                    toggleSearchBar={this.toggleSearchBar}
                />
                <MovieList 
                    data={this.setMovieListData()}
                    toggleFavorite={this.props.toggleFavorite} 
                    setSorting={this.handleSort}
                    sortMode={this.props.sortMode}
                    isFavorite={this.isFavorite}
                    searchBarVisible={this.state.searchBarVisible}
                    showSearchBar={this.showSearchBar}
                    hideSearchBar={this.hideSearchBar}
                />
            </>

        )
    }
}

const mapStateToProps = state => ({
    data: state.favorites.favorites,
    searchData: state.favorites.searchResults,
    sortMode: state.favorites.sortMode
})

const mapDispatchToProps = dispatch => ({
    toggleFavorite: movie => dispatch({ type: 'TOGGLE_FAVORITE', payload: movie }),
    searchFavorite: text => dispatch({ type: 'SEARCH_FAVORITE', payload: text}),
    sortFavorites: sortOption => dispatch({ type: 'SORT', payload: sortOption })
})

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesScreen);