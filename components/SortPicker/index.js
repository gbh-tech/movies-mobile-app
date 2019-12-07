import React from "react";
import style from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    ActionSheetIOS,
    TouchableOpacity
} from "react-native";

class SortPicker extends React.Component {
    onSortPress = () => {
        const sortOptions = this.props.sortOptions;
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: sortOptions.map(sortOption => sortOption.name),
                cancelButtonIndex: 0
            },
            (buttonIndex) => {
                if (buttonIndex != 0) {
                    this.setState({ sortingBy: sortOptions[buttonIndex].name }, 
                        () => this.props.setSorting(sortOptions[buttonIndex])
                    )
                }
            }
        );
    };

    render() {
        return (
            <TouchableOpacity
                style={style.sortPicker}
                onPress={this.onSortPress}
            >
                <Text style={style.sortText}>
                    <Icon name="md-funnel" size={24} />
                    Sort {this.props.sortMode}
                </Text>
            </TouchableOpacity>
        );
    }
}

export default SortPicker;
