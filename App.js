import React, { Component } from 'react'
import { 
  Image, 
  TouchableHighlight, 
  TouchableOpacity, 
  StyleSheet, 
  Text, 
  FlatList,
  View 
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import YouTube from 'react-native-youtube'
import YouTubeVideo from './Components/YouTubeVideo'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {RkCard, RkText} from 'react-native-ui-kitten';

const apiKey = 'AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw'
const channelId = 'UCbCmjCuTUZos6Inko4u57UQ'
const playlistId = 'LLFeYEx4ISl6TnxobHgOZcrQ'
const results = 30

console.disableYellowBox = true;


class App extends Component {
   static navigationOptions = {
    headerStyle: {
      backgroundColor: '#84c550',
      borderWidth: 0,
      borderBottomWidth: 0,
      shadowColor: 'transparent',
      shadowRadius: 0,
      elevation:0,
      shadowOffset: {
            height: 0,
        }

    },
    headerLeft: (
      <TouchableOpacity>
        <Image 
          style={{height: 22, width: 98, color: '#fff', marginLeft: 25}} 
          source={require('./images/logo-2.png')} />
      </TouchableOpacity>
    ),
    headerRight: (
      <View style={{ flexDirection: 'row', marginRight: 20 }}>
        <TouchableOpacity style={{paddingHorizontal: 5}}>
          <Icon name='search' size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
    )
  }

  constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }

  componentDidMount(){
    fetch(`https://www.googleapis.com/youtube/v3/playlistItems/?key=${apiKey}&playlistId=${playlistId}&part=snippet,id&order=date&maxResults=${results}`)
    //fetch('https://www.googleapis.com/youtube/v3/search/?key=AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw&channelId=UCQzdMyuz0Lf4zo4uGcEujFw&part=snippet,id&order=date&maxResults=30')
    .then(res => res.json())
    .then(res => {
      const videoId = []
      res.items.forEach(item => {
        videoId.push(item)
      })
      this.setState({
        data: videoId
      }) 
    })
    .catch(error => {
      console.error(error)
    })
  }

 

  render() {
    return (
      <FlatList
      showsVerticalScrollIndicator={false}
        data={this.state.data}
       renderItem={({ item }) => {
        return (
            <TouchableOpacity
              delayPressIn={70}
              activeOpacity={0.8}
              key={item.snippet.resourceId.videoId} 
              onPress={() => this.props.navigation.navigate('YouTubeVideo', {youtubeId: item.snippet.resourceId.videoId, youtubeTitle: item.snippet.title})}>
              <RkCard rkType='imgBlock' style={styles.card}>
                <Image rkCardImg style={styles.image}
                  source={{uri: item.snippet.thumbnails.medium.url}} 
                  />
             <View rkCardFooter>
            <RkText>{item.snippet.title}</RkText>
          </View>
              </RkCard>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
        style={styles.container} />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
    borderRadius: 20,
        overflow: 'hidden' 

  },

  image: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden' 
  },

 
})

export default App = StackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo  }
})