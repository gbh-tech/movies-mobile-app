
const sortByName = (movieList) => (
    movieList.sort((a, b) => {
        if (a.title < b.title) {return -1};
        if (a.title > b.title) {return  1};
        return 0;
    })
)

const sortByDate = (movieList) =>  (
    movieList.sort((a, b) => {
        if (parseFloat(a.year) > parseFloat(b.year)) {return -1};
        if (parseFloat(a.year) < parseFloat(b.year)) {return  1};
        return 0;
    }) 
)

const sortByRating = (movieList) => (
    movieList.sort((a, b) => {
        let rating1 = a.rating.substring(8);
        let rating2 = b.rating.substring(8);
        if (parseFloat(rating1) > parseFloat(rating2)) {return -1};
        if (parseFloat(rating1) < parseFloat(rating2)) {return  1};
        return 0;
    }) 
)

export {
    sortByName,
    sortByDate,
    sortByRating
}