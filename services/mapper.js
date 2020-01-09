import {API_IMAGES_BASEURL} from 'react-native-dotenv'

const movieMapper = (response) => {
    const mappedData = response.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: getYear(movie.release_date),
        poster: `${API_IMAGES_BASEURL}/${movie.poster_path}`,
        overview: movie.overview,
        rating: `Rating: ${movie.vote_average}`
    }))

    return mappedData
}

const getYear = (date) => {
    if (!!date) {
        if (date.length > 0) {
            return date.substring(0, 4);
        }
    }
    return "No release date yet"
}

export {
    movieMapper
}