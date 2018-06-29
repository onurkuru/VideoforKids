import React, { Component } from 'react'
import { 
  Image, 
  TouchableHighlight, 
  TouchableOpacity, 
  ScrollView, 
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
import {RkCard, RkText,RkStyleSheet} from 'react-native-ui-kitten';

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
      <FlatList style={styles.container}>
      {this.state.data.map((item, i) => 
      <TouchableOpacity
        delayPressIn={70}
        activeOpacity={0.8}
        key={item.snippet.resourceId.videoId} 
        onPress={() => navigate('YouTubeVideo', {youtubeId: item.snippet.resourceId.videoId, youtubeTitle: item.snippet.title})}>
        <RkCard rkType='imgBlock' style={styles.card}>
          <Image rkCardImg source={{uri: item.snippet.thumbnails.medium.url}}/>

          <View rkCardImgOverlay rkCardContent style={styles.overlay}>
            <RkText rkType='header4 inverseColor'>{item.snippet.title}</RkText>
            <RkText style={styles.time}
                    rkType='secondary2 inverseColor'>de</RkText>
          </View>
          <View rkCardFooter>
            <RkText>dlee</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
            )}
            </FlatList>

    )
  }

}


let styles = RkStyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.colors.screen.scroll,
    paddingVertical: 8,
    paddingHorizontal: 14
  },
  card: {
    marginVertical: 8,
  },
  time: {
    marginTop: 5
  },

  image: {
   borderRadius: 10,
  },

  vidItems: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 10
  }
}));

export default App = StackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo }
})