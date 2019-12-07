import {API_IMAGES_BASEURL} from 'react-native-dotenv'

const movieMapper = (response) => {
    const mappedData = response.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        year: movie.release_date.substring(0, 4),
        poster: `${API_IMAGES_BASEURL}/${movie.poster_path}`,
        overview: movie.overview,
        rating: `Rating: ${movie.vote_average}`
    }))

    return mappedData
}

export {
    movieMapper
}