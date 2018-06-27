import React, { Component } from 'react'
import { 
  Image, 
  TouchableHighlight, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Text, 
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
    const {navigate} = this.props.navigation
    return (
      <View  style={styles.container}>
        <ScrollView style={styles.container}>
          <RkCard rkType='shadowed' >
            {this.state.data.map((item, i) => 
            <TouchableHighlight  
              key={item.snippet.resourceId.videoId} 
              onPress={() => navigate('YouTubeVideo', {youtubeId: item.snippet.resourceId.videoId, youtubeTitle: item.snippet.title})}>
              {/* onPress={() => this.props.navigation.navigate('YoutubeVideo', {youtubeId: item.id.videoId})}> */}
              <View rkCardContent style={styles.container}>
             
                <Image rkCardImg
                  source={{uri: item.snippet.thumbnails.medium.url}} 
                  style={styles.image}
                  />
                <View style={styles.vidItems}>
                  <RkText>{item.snippet.title}</RkText>
                  <Icon name='more-vert' size={20} color='#555'/> 
                </View>
           
              </View>
            </TouchableHighlight>
            )}
          </RkCard>
        </ScrollView>
     
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
 
})

export default App = StackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo }
})