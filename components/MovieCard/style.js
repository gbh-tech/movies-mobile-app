import {StyleSheet} from 'react-native';

const style = StyleSheet.create({
    movieCardContainer: {
        padding: 4,
        flex: 3,
        maxWidth: '33.3%'
    },
    starButton: {
        width: 35,
        position: 'absolute'
    },
    movieCardPoster: {
        backgroundColor: '#e6e6e6',
        minHeight: 180,
        zIndex: -1
    },
    movieCardDesc: {
        marginTop: 2
    },
    mainCardText: {
        fontWeight: '500'
    },
    secondaryCardText: {
        color: '#303030'
    },
})

export default style;