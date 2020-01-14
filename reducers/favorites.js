import {
    sortByName,
    sortByDate,
    sortByRating
} from '../helpers/sortMovies';

const initialState = {
    favorites: [],
    searchResults: [],
    sortMode: 'Sort Default (by Rating)'
}

const favorites = (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            return ({
                ...state,
                favorites: state.favorites.find((favorite) => favorite.id == action.payload.id) === undefined 
                    ? [...state.favorites, action.payload ]
                    : state.favorites.filter(favorite => (favorite.id !== action.payload.id)),
                searchResults: state.favorites.find((favorite) => favorite.id == action.payload.id) === undefined 
                    ? state.searchResults
                    : state.searchResults.filter(favorite => (favorite.id !== action.payload.id))
            });
        case 'SEARCH_FAVORITE':
            return ({
                ...state,
                searchResults: state.favorites.filter(favorite => 
                    favorite.title.match(new RegExp(action.payload)))
            });
        case 'SORT':
            let data = [...state.favorites];
            switch (action.payload.by) {
                case 'def':
                    data = sortByRating(data);
                break;
                case 'date':
                    data = sortByDate(data);
                break;
                case 'name':
                    data = sortByName(data);
                break;
            }
            return ({
                ...state,
                favorites: data,
                sortMode: action.payload.label
            })
        default:
            return state;
    }
}

export default favorites; 