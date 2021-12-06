import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '../Icons/PersonIcon.png';
import RecordIcon from '../Icons/RecordIcon.png';
import ForumIcon from '../Icons/ForumIcon.png';
import RecordButton from '../Icons/RecordButton.png';
import MicRecorder from 'mic-recorder-to-mp3'


const MP3Recorder = new MicRecorder({bitRate: 128})

class Home extends Component {
  constructor() {
    super()

    this.state = {
      isRecording: false,
      blobURL: ''
    }
  }

  recordAudio = () => {
    // Start Recording process
    MP3Recorder.start().then(() => {
     this.setState({isRecording: true})

    }).catch((err) => console.error(err))
  }

  stopRecording = () => {
    // Stop Recording process
    MP3Recorder.stop().getMp3().then(([buffer, blob]) => {
      const file = new File(buffer, 'me-at-thevoice.mp3', {type: blob.type, lastModified: Date.now()})

      const blobURL = URL.createObjectURL(blob)

      const player = new Audio(blobURL)
      player.play()

      // Create a new post page/popup that user can enter information
      // When submit button is clicked you can make call to /api/createpost
      

      this.setState({isRecording: false, blobURL: blobURL})
    })
  }

  signOut = () => {
    localStorage.setItem("userToken", 'null')
  }

  render() {
      return (
        <div>
          {this.state.isRecording ? (
            <div>
              Currently recording.......
              <button onClick={this.stopRecording}>Stop Recording</button>
            </div>
          ) : (
            <div>
            <header className='navbar'>
              <Link to='/profile'>
                <img src={PersonIcon} />
              </Link>
              <Link to='/savedsongs'>
                <img src={RecordIcon} />
              </Link>
              <Link to='/forum'>
                <img src={ForumIcon} />
              </Link>
            </header>
            <main>
              <div>
                <h1>Tap to Record</h1>
                <img src={RecordButton} onClick={this.recordAudio}/>
              </div>
      
            <a href="/login">
              <button onClick={this.signOut}>
                Logout
              </button>
            </a>
      
            </main>
          </div>
          )}
        </div>
      );
  }
}

export default Home