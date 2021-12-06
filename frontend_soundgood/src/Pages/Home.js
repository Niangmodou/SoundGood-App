import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '../Icons/PersonIcon.png';
import RecordIcon from '../Icons/RecordIcon.png';
import ForumIcon from '../Icons/ForumIcon.png';
import RecordButton from '../Icons/RecordButton.png';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

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
    console.log('in stop');
    MP3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const file = new File(buffer, 'me-at-thevoice.mp3', {
          type: blob.type,
          lastModified: Date.now(),
        });
        this.setState({ recorded: true });
        console.log(this.state.recorded);

        const blobURL = URL.createObjectURL(blob);

        const player = new Audio(blobURL);
        player.play();

        // Create a new post page/popup that user can enter information
        // When submit button is clicked you can make call to /api/createpost

        this.setState({ blobURL: blobURL });
      });
  };

  createPost = () => {
    this.setState({ recording: false });
    let res = {};
    res['title'] = this.state.title;
    res['description'] = this.state.description;
    const config = {
      headers: { Authorization: `Bearer ${localStorage['userToken']}` },
    };
    axios
      .post('http://127.0.0.1:5000/api/createpost', res, config)
      .then((promise) => {
        if (promise['data']['status'] === 'success')
          this.setState({ recorded: false });
        console.log('sucess boyyyyy');
      });
  };

  signOut = () => {
    localStorage.setItem('userToken', 'null');
  };

  render() {
    return (
      <div>
        {this.state.isRecording ? (
          this.state.recorded ? (
            <form onSubmit={this.createPost}>
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
              <input type='submit' value='Submit' />
            </form>
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
