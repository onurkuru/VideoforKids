import React, { Component } from 'react'
import { StyleSheet, View,Text,StatusBar } from 'react-native'
import { StackNavigator } from 'react-navigation'
import YouTube from 'react-native-youtube'
import Related from './RelatedComponent'
import Icon from 'react-native-vector-icons/MaterialIcons'
import App from '../App'

class YoutubeVideo extends Component {

static navigationOptions = { header: null };

 constructor(props){
    StatusBar.setHidden(true);
    super(props)
    this.state = {
      VideoId: this.props.navigation.state.params.youtubeId,
        }
    }


    render() {
        return (
          <View style={styles.container}>
          <View style={{ position: 'absolute', backgroundColor: 'rgba(52, 52, 52, 0.8)', borderRadius: 30, margin: 10  }}>
              <Icon
              style={{ zIndex: 99, fontSize: 32, color: '#FFF' }}
                name='arrow-back'
                onPress={() => this.props.navigation.navigate('Home')} />
          </View>
            <YouTube
                videoId={this.state.VideoId}  
                play={true}             
                loop={false}            
                apiKey={'AIzaSyBJ3ntReiv0L19H2RoYW62LpRdIuyPhIpw'}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 250, zIndex: -2 }}
            />
            <Related videoId={this.state.VideoId}  onVideoClick={(videoID) => { this.setState({ VideoId: videoID }) }} /> 
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})


export default YoutubeVideo;