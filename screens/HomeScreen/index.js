import React from 'react';
import Header from '../../components/Header';
import MovieList from '../../components/MovieList';
import {getMovies} from '../../services/movies';
import {connect} from 'react-redux';
import sortOptions from './sortOptions';
import {queryMovie} from '../../services/movies';

class HomeScreen extends React.Component {
    state = {
        sort: 'vote_average.desc',
        searchData: [],
        isSearching: false,
        isLoading: true,
        searchBarVisible: false
    }

    componentDidMount() {
        this.fetchMovies();
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
    
    fetchMovies = async () => {
        const sort = this.state.sort;
        const newPage = this.props.pages + 1;
        const movies = await getMovies(newPage, sort);
        this.setState({
            isLoading: false
        }, () => this.setMovieList(newPage, movies))
    }
    
    setSorting = (sortOption) => {
        this.setState({ isLoading: true })
        this.props.resetData();
        this.props.sortMovies(sortOption)
        this.setState({
            sort: sortOption.sortPath
        }, () => this.fetchMovies())
    }
    
    setMovieList = (newPage, movies) =>{
        const data = {
            movies,
            pages: newPage
        }
        this.props.setData(data);
    }

    onSearchChange = async (query) => {
        if (query.length > 0) {
            const data = await queryMovie(query)
            this.setState({ searchData: data });
        }
    }

    handleSearchScreenVisibility = (state) => {
        this.setState({ isSearching: state });
    }

    isFavorite = (movie) => {
        const result = this.props.favorites.find((favorite) => (
            favorite.id == movie.id
        ))
        if (result === undefined) {
            return false;
        }
        return true;
    }

    render() {
        const { data } = this.props;
        return (
            <>
                <Header title="Main menu" 
                    toggleSearchBar={this.toggleSearchBar}
                />
                <MovieList 
                    data={data}
                    fetchMovies={this.fetchMovies}
                    toggleFavorite={this.props.toggleFavorite}
                    setSorting={this.setSorting}
                    sortOptions={sortOptions}
                    sortMode={this.props.sortMode}
                    onSearchChange={this.onSearchChange}
                    searchData={this.state.searchData}
                    isSearching={this.state.isSearching}
                    toggleSearchScreenVisibility={this.handleSearchScreenVisibility}
                    isFavorite={this.isFavorite}
                    isLoading={this.state.isLoading}
                    searchBarVisible={this.state.searchBarVisible}
                    showSearchBar={this.showSearchBar}
                    hideSearchBar={this.hideSearchBar}
                />
            </>
        )
    }
}

const mapStateToProps = state => ({
    data: state.home.data,
    pages: state.home.pages,
    sortMode: state.home.sortMode,
    favorites: state.favorites.favorites
})

const mapDispatchToProps = dispatch => ({
    toggleFavorite: movie => dispatch({ type: 'TOGGLE_FAVORITE', payload: movie }),
    setData: (data) => dispatch({ type: 'SET_DATA', payload: data }),
    resetData: () => dispatch({ type: 'RESET_DATA' }),
    sortMovies: (sortOption) => dispatch({ type: 'SET_SORTING', payload: sortOption })
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);