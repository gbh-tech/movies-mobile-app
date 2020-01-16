import React from "react";
import style from "./style";
import { Header as RNHeader, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Platform } from "react-native";

Icon.loadFont();

class Header extends React.Component {
    render() {
        return (
          <RNHeader
            leftComponent={{ text: this.props.title, style: style.headerTitle }}
            barStyle="light-content"
            rightComponent={
              Platform.OS === "android" ? (
                <Button
                  icon={<Icon name="search" color={"white"} size={24} />}
                  onPress={this.props.toggleSearchBar}
                />
              ) : null
            }
          />
        );
      }
    }
    
export default Header;