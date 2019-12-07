import {StyleSheet} from 'react-native';
import {vh} from 'react-native-viewport-units';

const style = StyleSheet.create({
    modalHeader: {
        height: 13*vh,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    poster: {
        width: '100%',
        height: 500,
        zIndex: -1
    },
    movieTitle: {
        fontSize: 20,
        paddingTop: 5

    },
    movieYear: {
        paddingTop: 5
    },
    movieOverview: {
        paddingTop: 10
    },
    starButton: {
        width: 56,
        position: 'absolute',
        zIndex: 2
    },
})

export default style;

