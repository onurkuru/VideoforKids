import React, { Component } from 'react'
import { StyleSheet, View,Text } from 'react-native'
import { StackNavigator } from 'react-navigation'
import YouTube from 'react-native-youtube'
import Related from './RelatedComponent'


class YoutubeVideo extends Component {
    static navigationOptions = {
        headerTitle: '',
        headerStyle: {
            backgroundColor: '#7ed4d2'
        }, 
        headerTitleStyle: {
            color: '#fff'
        }
    }

 constructor(props){
    super(props)
    this.state = {
      VideoId: this.props.navigation.state.params.youtubeId,
    }
  }


    render() {
        return (
          <View style={styles.container}>
<Text>{this.state.VideoId}  </Text>
            <YouTube
                videoId={this.state.VideoId}  
                play={false}             
                loop={false}            
                apiKey={'AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw'}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 250 }}
            />
            <Related videoId={this.state.VideoId}  onVideoClick={(videoID) => { this.setState({ VideoId: videoID }) }}
  /> 
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})
export default YoutubeVideo 


