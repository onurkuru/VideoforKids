/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React  from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation'
import MainScreen from './Components/MainScreen'

console.disableYellowBox = true;



export default class App extends React.Component {
  render() {
    return (
      <AppStackNavigator />
    );
  }
}

const AppStackNavigator = StackNavigator({

  Main: {
    screen: MainScreen
  }
})

const styles = StyleSheet.create({

});
