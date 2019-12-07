const initialState = {
    data: [],
    pages: 0,
    sortMode: 'Default (By Popularity)'
}

const home = (state = initialState, action) => {
    const data = action.payload;
    const currentData = [...state.data];
    switch (action.type) {
        case 'SET_DATA':
            return ({ 
                ...state,
                data: [...currentData, ...data.movies], 
                pages: data.pages,
            });
        case 'RESET_DATA':
            return ({
                ...state,
                data: [],
                pages: 0
            })
        case 'SET_SORTING':
            return ({
                ...state,
                sortMode: action.payload.name
            })
        default:
            return state;
    }
}

export default home;