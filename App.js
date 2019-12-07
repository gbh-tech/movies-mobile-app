import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import FavoritesScreen from "./screens/FavoritesScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingView from './components/LoadingView';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { store, persistor } from "./configureStore";
import Icon from "react-native-vector-icons/Ionicons";

Icon.loadFont();

const TabNavigator = createBottomTabNavigator(
  {
    MainMenu: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Main menu",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-home" color={tintColor} size={24} />
        )
      }
    },
    Favorites: {
      screen: FavoritesScreen,
      navigationOptions: {
        tabBarLabel: "Favorites",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-star" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    initialRouteName: "MainMenu",
    order: ["MainMenu", "Favorites"],
    navigationOptions: {
      tabBarVisible: true
    }
  }
);

const Navigation = createAppContainer(TabNavigator);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<LoadingView />} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
