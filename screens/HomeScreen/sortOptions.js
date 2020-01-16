
const sortOptions = [
    {label: 'Cancel'},
    {label: 'Default (By Rating)', sortPath: 'vote_average.desc'},
    {label: 'By Release Date', sortPath: 'release_date.desc'},
    {label: 'By Name', sortPath: 'original_title.asc'}
];

export default sortOptions;