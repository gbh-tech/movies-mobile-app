import {StyleSheet} from 'react-native';
import {vh} from 'react-native-viewport-units';

const style = StyleSheet.create({
    loadingView: {
        position: 'absolute',
        top: 35*vh,
        left: '50%'
    }
})

export default style;