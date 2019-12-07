import React, { Component } from 'react'
import style from './style';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button } from 'react-native-elements';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

class MovieCard extends Component {
    onCardPress = () => {
        this.props.onPress(this.props.movie);
    }

    onFavoritePress = () => {
        this.props.toggleFavorite(this.props.movie)
    }

    render() {
        return (
            <TouchableOpacity 
                style={style.movieCardContainer}
                onPress={this.onCardPress}
            >
                <Button
                    icon={  
                        <>
                            <Icon name="ios-clock" color={'rgba(255,255,255,0.2)'} style={{position: "absolute"}} size={30}/>
                        {
                            this.props.isFavorite(this.props.movie)
                            ? <Icon name="ios-star" color={'#D4AF37'} size={22}/>
                            : <Icon name="ios-star" color={'rgba(0,0,0,0.8)'} size={22}/>
                        }
                        </> 
                    }
                    type={'clear'}
                    style={style.starButton}
                    onPress={this.onFavoritePress}
                />
                <Image 
                    source={{uri: this.props.movie.poster}}
                    style={style.movieCardPoster}
                />
                <View style={style.movieCardDesc}>
                    <Text style={style.mainCardText}>
                        {this.props.movie.title}
                    </Text>
                    <Text style={style.secondaryCardText}>
                        {this.props.movie.year}
                    </Text>
                    <Text style={style.secondaryCardText}>
                        {this.props.movie.rating}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default MovieCard;