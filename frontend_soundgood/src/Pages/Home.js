import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '../Icons/PersonIcon.png';
import RecordIcon from '../Icons/RecordIcon.png';
import ForumIcon from '../Icons/ForumIcon.png';
import RecordButton from '../Icons/RecordButton.png';

class Home extends Component {
  constructor() {
    super()

    this.state = {
      isRecording: false
    }
  }

  recordAudio = () => {
    // Start Recording process
    this.setState({isRecording: true})
  }

  stopRecording = () => {
    // Stop Recording process
    this.setState({isRecording: false})
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