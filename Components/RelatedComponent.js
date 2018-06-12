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
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/MaterialCommunityIcons'
import {RkCard, RkText} from 'react-native-ui-kitten';

const apiKey = 'AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw'
const channelId = 'UCwZrpRCU4MotIIzhl5_6KBQ'
const results = 30



class Related extends Component {


 constructor(props){
    super(props)
    this.state = {
      data: []
    }
  }
componentDidMount(){
    fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&relatedToVideoId=${this.props.videoId}&part=snippet&type=video`)
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

  render(){
    return (
      
      <View>

<ScrollView>
         <RkCard rkType='shadowed' >
            {this.state.data.map((item, i) => 
            <TouchableHighlight 
              key={item.id.videoId} 
              onPress={() => navigate('YouTubeVideo', {youtubeId: item.id.videoId})}>
              {/* onPress={() => this.props.navigation.navigate('YoutubeVideo', {youtubeId: item.id.videoId})}> */}
              <View rkCardContent>
                <Image  rkCardImg
                  source={{uri: item.snippet.thumbnails.medium.url}} 
                  style={styles.image}/>
                <View style={styles.vidItems}>
                  
                  <Text style={styles.vidText}>{item.snippet.title}</Text>
                  <Icon name='more-vert' size={20} color='#555'/> 
                </View>
              </View>
            </TouchableHighlight>
            )}
          </RkCard>
        </ScrollView>
      </View>
    );
  }
}
export default Related;


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
 
});

