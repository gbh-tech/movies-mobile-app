import React from 'react';
import style from './style';
import {Header as RNHeader} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();

class Header extends React.Component {
    render() {
        return (
            <RNHeader
                leftComponent={{ text: this.props.title, style: style.headerTitle }}
                barStyle="light-content"
            />
        )
    }
}

export default Header;