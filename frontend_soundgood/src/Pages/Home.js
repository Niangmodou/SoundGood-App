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
      blobURL: '',
      permissionGranted: false
    }
  }

  componentDidMount() {
    // Check for permission
    navigator.getUserMedia({audio: true}), 
      () => {
        console.log("Permission Granted!")
        this.setState({permissionGranted: true})
      }, 
      () => {
        console.log("Permission Denied!")
        this.setState({permissionGranted: false})
      },
    )
  }

  recordAudio = () => {
    if (!this.state.permissionGranted) return

    // Start Recording process
    MP3Recorder.start().then(() => {
     this.setState({isRecording: true})

    }).catch((err) => console.error(err))
  }

  stopRecording = () => {
    // Stop Recording process
    MP3Recorder.stop().getMp3().then(([bugger, blob]) => {
      const file = new File(buffer, 'me-at-thevoice.mp3', {type: blob.type, lastModified: Date.now()})

      const player = new Audio(URL.createObjectURL(file))

      player.play()
      this.setState({isRecording: false})
    })
  }

  signOut = () => {
    localStorage.setItem("userToken", null)
  }

  render() {
      return (
        <div>
          {this.state.isRecording ? (
            <div>
              Currently recording.......

              <button onClick={stopRecording}>Stop Recording</button>
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
                <img src={RecordButton} onClick={recordAudio}/>
              </div>
      
            <a href="/login">
              <button onClick={signOut}>
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