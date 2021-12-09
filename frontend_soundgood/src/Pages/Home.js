import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PersonIcon from '../Icons/PersonIcon.png'
import RecordIcon from '../Icons/RecordIcon.png'
import ForumIcon from '../Icons/ForumIcon.png'
import RecordButton from '../Icons/RecordButton.png'
import MicRecorder from 'mic-recorder-to-mp3'
import axios from 'axios'

const MP3Recorder = new MicRecorder({ bitRate: 128 });

class Home extends Component {
  constructor() {
    super();

    this.state = {
      isRecording: false,
      blobURL: '',
      recorded: false,
      description: '',
      title: '',
    };
    console.log('We are in home');
  }

  recordAudio = () => {
    // Start Recording process
    MP3Recorder.start()
      .then(() => {
        this.setState({ isRecording: true });
      })
      .catch((err) => console.error(err));
  };

  stopRecording = () => {
    // Stop Recording process
    MP3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        // const file = new File(buffer, 'audio.mp3', {
        //   type: blob.type,
        //   lastModified: Date.now(),
        // });
        this.setState({ recorded: true });
        console.log(this.state.recorded);

        const blobURL = URL.createObjectURL(blob);

        const player = new Audio(blobURL);
        player.play();

        this.setState({ blobURL: blobURL });
      });
  };

  createPost = () => {
    this.setState({ isRecording: false });
    const data = {
      title: this.state.title,
      description: this.state.description,
      soundUrl: this.state.blobURL,
    };

    const config = {
      headers: { Authorization: `Bearer ${localStorage['userToken']}` },
    };
    console.log('CREATE POST');
    axios
      .post('http://127.0.0.1:5000/api/createpost', data, config)
      .then((promise) => {
        if (promise['data']['status'] === 'success') {
          this.setState({ recorded: false });
        }
      });
  };

  signOut = () => {
    localStorage.setItem('userToken', null);
  };

  render() {
    return (
      <div>
        {this.state.isRecording ? (
          this.state.recorded ? (
            <div>
              <input
                placeholder='Title'
                className='input'
                type='text'
                id='email'
                name='email'
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              />
              <input
                placeholder='Description'
                className='input'
                type='text'
                id='email'
                name='email'
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
              <button onClick={this.createPost}>Submit</button>
            </div>
          ) : (
            <div>
              Currently recording.......
              <button onClick={this.stopRecording}>Stop Recording</button>
            </div>
          )
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
                <img src={RecordButton} onClick={this.recordAudio} />
              </div>

              <a href='/login'>
                <button onClick={this.signOut}>Logout</button>
              </a>
            </main>
          </div>
        )}
      </div>
    );
  }
}

export default Home;
