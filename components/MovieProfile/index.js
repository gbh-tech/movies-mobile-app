import React, { Component } from 'react'
import style from './style';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    Text,
    Modal,
    ScrollView,
    Image,
    View
} from 'react-native';

 class MovieProfile extends Component {
    onFavoritePress = () => {
       this.props.onPress(this.props.movie);
    }

    render() {
        return (
            <Modal animationType="slide" visible={this.props.modalVisible} transparent={true}>
                <TouchableWithoutFeedback onPress={this.props.closeModal} style={style.modalHeader}/>
                <ScrollView style={{backgroundColor: 'white', height: '100%'}}>
                    <View style={{margin: 10}}>
                        <Button
                            icon={  
                                <>
                                    <Icon name="ios-clock" color={'rgba(255,255,255,0.2)'} style={{position: "absolute"}} size={50}/>
                                    {
                                        this.props.isFavorite(this.props.movie)
                                        ? <Icon name="ios-star" color={'#D4AF37'} size={39}/>
                                        : <Icon name="ios-star" color={'rgba(0,0,0,0.8)'} size={39}/>
                                    }
                                </> 
                            }
                            type={'clear'}
                            style={style.starButton}
                            onPress={this.onFavoritePress}
                        />
                        <Image 
                            style={style.poster}
                            source={{uri: this.props.movie.poster}}
                        />
                        <Text style={style.movieTitle}>
                            {this.props.movie.title}
                        </Text>
                        <Text style={style.movieYear}>
                            Release year: {this.props.movie.year}
                        </Text>
                        <Text>
                            {this.props.movie.rating}
                        </Text>
                        <Text style={style.movieOverview}>
                            {this.props.movie.overview}
                        </Text>
                    </View>
                </ScrollView>
            </Modal>
        )
    }
}

export default MovieProfile;