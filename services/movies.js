import {API_KEY, API_BASEURL} from 'react-native-dotenv'
import {movieMapper} from './mapper';

const getMovies = async (page, sort) => {
    const response = await fetch(`${API_BASEURL}/movie/?api_key=${API_KEY}&sort_by=${sort}&page=${page}`)
        .then((res) => res.json())
        .then((resJson) => resJson);
    
    const data = movieMapper(response);
    return data;
}

const queryMovie = async (term) => {
    const response = await fetch(`${API_BASEURL}/search/movie?api_key=${API_KEY}&query=${term}`)
        .then((res) => res.json())
        .then((resJson) => resJson);

    const data = movieMapper(response);

    return data;
}

export {
    getMovies, queryMovie
}