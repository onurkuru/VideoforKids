import React, { Component } from 'react'
import { 
  Image, 
  TouchableHighlight, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  Text, 
  View,
  FlatList,
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
      data: [],
      VideoId: this.props.videoId
    }
    }

onVideoClick(videoID) 
{ 
  this.setState({ VideoId: videoID }) 
}

componentDidMount(){

    fetch(`https://www.googleapis.com/youtube/v3/search/?key=${apiKey}&relatedToVideoId=${this.state.VideoId}&part=snippet&type=video&maxResults=30`)
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
        style={{marginTop: 20}}
        showsVerticalScrollIndicator={false}
        data={this.state.data}
        renderItem={({ item }) => {
          return (
              <TouchableOpacity
              delayPressIn={70}
              activeOpacity={0.8}
              key={item.id.videoId} 
              onPress={() => {this.props.onVideoClick(item.id.videoId)} }> 
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
      />
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



