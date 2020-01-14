import React from "react";
import style from "./style";
import Icon from 'react-native-vector-icons/Ionicons';
import { 
    Text, 
    ActionSheetIOS,
    TouchableOpacity,
    View,
    Platform,
    Picker
} from "react-native";

class SortPicker extends React.Component {
    sortOptions = this.props.sortOptions;

    componentDidUpdate() {
        console.log(this.state);
    }

    onSortPress = () => {
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: this.sortOptions.map(sortOption => sortOption.label),
                    cancelButtonIndex: 0
                },
                (buttonIndex) => {
                    if (buttonIndex != 0) {
                        this.setState({ sortingBy: this.sortOptions[buttonIndex].label }, 
                            () => this.props.setSorting(this.sortOptions[buttonIndex])
                        )
                    }
                }
            );
        }
    };

    renderIosPicker = () => (
        <TouchableOpacity
            style={style.sortPicker}
            onPress={this.onSortPress}
        >
            <View>
                <Text style={style.sortText}>
                    <Icon name="md-funnel" size={24} />
                    Sort {this.props.sortMode}
                </Text>
            </View>
        </TouchableOpacity>
    )

    renderAndroidPicker = () => (
        <Picker
            selectedValue={this.props.sortMode}
            style={{height: 50, color: 'rgb(28,126,215)'}}
            onValueChange={(itemValue, itemIndex) => (
                this.setState({sortingBy: this.sortOptions[itemIndex + 1].label },
                    () => {
                        return this.props.setSorting(this.sortOptions[itemIndex + 1])
                    }
                )
            )}>
                {
                    this.sortOptions.map((option) => {
                        if (option.label !== "Cancel") {
                            return <Picker.Item label={`Sort ${option.label}`} value={option.by}/>
                        }
                    })
                }
        </Picker>
    )
    

    render() {
        return (
            Platform.OS === 'ios' 
            ? this.renderIosPicker()
            : this.renderAndroidPicker()
        );
    }
}

export default SortPicker;