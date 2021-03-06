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
import YouTubeVideo from '../YouTubeVideo'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'

const apiKey = 'AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw'
const channelId = 'UCbCmjCuTUZos6Inko4u57UQ'
const playlistId = 'LLu_YxSSRu1vbuNViVqyWFLQ'
const results = 30

class App extends Component {
   static navigationOptions = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTitle: ( 
      <View style={{ flex: 1, alignItems: "center" }}> 
      <Image source={require('../../images/logo-1.jpg')} style={{ height: 22, width: 100 }} /> 
      </View> 
      ), 
    headerLeft: null, 
    headerRight: null 
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
      <View style={styles.container}>
       
        <ScrollView>
          <RkCard rkType='shadowed' >
            {this.state.data.map((item, i) => 
           	<TouchableHighlight 
              key={item.snippet.resourceId.videoId} 
              onPress={() => navigate('YouTubeVideo', {youtubeId: item.snippet.resourceId.videoId})}>
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
    flex: 1
  },
  menu: {
    flexDirection: 'row',
    padding: 20,
     backgroundColor: '#fff',
    justifyContent: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 30,
    paddingTop: 0,
  },
  vids: {
    paddingBottom: 30,
    width: 320,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
    borderBottomWidth: 0.6,
    borderColor: '#aaa'
  },
  vidItems: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10
  },
  vidText: {
    padding: 20,
    color: '#000'
  },
  tabBar: {
    backgroundColor: '#fff',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderColor: '#bbb'
  },
  tabItems: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5
  },
  tabTitle: {
    fontSize: 11,
    color: '#333',
    paddingTop: 4,
    textDecorationLine: 'underline'
  }
})

export default screens = StackNavigator({
  Home: { screen: App },
  YouTubeVideo: { screen: YouTubeVideo }
})