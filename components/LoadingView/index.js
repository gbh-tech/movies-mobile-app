import React, { Component } from 'react'
import style from './style';
import {
    View,
    ActivityIndicator
} from 'react-native';

class LoadingView extends Component {
    render() {
        return (
            <View style={style.loadingView}>
                <ActivityIndicator size="large" color="rgb(64,137,214)" />
            </View>
        )
    }
}

export default LoadingView;