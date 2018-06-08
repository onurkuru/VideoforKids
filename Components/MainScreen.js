import React, {Component}  from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TabBarBottom
} from 'react-native';

import HomeTab from './AppTabNavigator/HomeTab'
import MusicTab from './AppTabNavigator/MusicTab'
import LearnTab from './AppTabNavigator/LearnTab'
import AnimalTab from './AppTabNavigator/AnimalTab'


import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

import {TabNavigator} from 'react-navigation'

class MainScreen extends Component {


   static navigationOptions = {
      header : null
  }

	render(){
		return (
			<AppTabNavigator />
		);
	}
}
export default MainScreen;

const AppTabNavigator = TabNavigator({
  HomeTab: {
    screen: HomeTab,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => <Icons name='youtube-tv' size={45} color={'#ff6f00'} />,
    },

  },
   MusicTab: {
    screen: MusicTab,
    navigationOptions: {
      tabBarLabel: 'Music',
      tabBarIcon: () => <Icons name='music-box' size={45} color={'#e91e63'} />,
    },
  },
   LearnTab: {
    screen: LearnTab,
    navigationOptions: {
      tabBarLabel: 'Learn',
      tabBarIcon: () => <Icons name='brush' size={45} color={'#2a36b1'} />,
    },
  },
   AnimalTab: {
    screen: AnimalTab,
    navigationOptions: {
      tabBarLabel: 'Animals',
      tabBarIcon: () => <Icons name='cat' size={45} color={'#056f00'}/>,
    },
  },
  
}, {
  animationEnabled: false,
  swipeEnabled: false,
  tabBarPosition: 'bottom',
  navigationOptions: {
  header: { visible: true },
},
  tabBarOptions : {
    style : {
      ...Platform.select({
        android:{
          backgroundColor: 'white'
        }
      }),
    iconStyle: {
      width: 100,
      height: 100,
      paddingBottom: 10,
    },
      backgroundColor :"#fff",
      borderBottomWidth: 0,
      borderTopWidth: 0,
      borderBottomColor:'#DFE0E4',
      elevation: 0,
    },
    activeTintColor: '#000',
    inactiveTintColor: '#d1cece',
    showLabel : false,
    showIcon  : true,

  }


})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

 
});
