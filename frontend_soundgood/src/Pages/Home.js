import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import PersonIcon from "../Icons/PersonIcon.png";
import RecordIcon from "../Icons/RecordIcon.png";
import ForumIcon from "../Icons/ForumIcon.png";
import RecordButton from "../Icons/RecordButton.png";
import MicRecorder from "mic-recorder-to-mp3";
import { FaHome } from "react-icons/fa";
import { IconContext } from "react-icons";

import axios from "axios";

const AWS = require("aws-sdk");

const MP3Recorder = new MicRecorder({ bitRate: 128 });

class Home extends Component {
  constructor() {
    super();

    this.state = {
      isRecording: false,
      blobURL: "",
      recorded: false,
      description: "",
      title: "",
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

  // Function to upload audio to Amazon S3 bucket and retrieve the url
  uploadAudioToAws = (fileToUpload) => {
    // S3 bucket configurations
    const ID = "us-east-1:a5ed82ab-852e-4099-b87b-949ef005b381";
    const bucketRegion = "us-east-1";
    const bucketName = "soundgoodimages";

    AWS.config.update({
      region: bucketRegion,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: ID,
      }),
    });
    // S3 Upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileToUpload.name,
      ContentType: fileToUpload.type,
      Body: fileToUpload,
    };

    let upload = new AWS.S3.ManagedUpload({
      params: params,
    });

    upload
      .promise()
      .then((response) => this.setState({ blobURL: response["Location"] }));
  };

  stopRecording = () => {
    // Stop Recording process
    MP3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        this.setState({ recorded: true });

        // Upload this blob to AWS
        var d = new Date();
        var file = new File([blob], d.valueOf(), { type: "audio/wav" });

        this.uploadAudioToAws(file);
      });
  };

  createPost = () => {
    console.log(this.state.blobURL);
    this.setState({ isRecording: false });
    const data = {
      title: this.state.title,
      description: this.state.description,
      soundUrl: this.state.blobURL,
    };

    const config = {
      headers: { Authorization: `Bearer ${localStorage["userToken"]}` },
    };
    console.log("CREATE POST");
    console.log(data);
    axios
      .post("http://127.0.0.1:5000/api/createpost", data, config)
      .then((promise) => {
        if (promise["data"]["status"] === "success") {
          this.setState({ recorded: false });
        }
      });
  };

  signOut = () => {
    // localStorage.setItem('userToken', null);
    localStorage.clear();
    // Navigate({to='/'})
  };

  render() {
    return (
      <div>
        {this.state.isRecording ? (
          this.state.recorded ? (
            <div>
              <input
                placeholder="Title"
                className="input"
                type="text"
                id="email"
                name="email"
                value={this.state.title}
                onChange={(e) => {
                  this.setState({ title: e.target.value });
                }}
              />
              <input
                placeholder="Description"
                className="input"
                type="text"
                id="email"
                name="email"
                value={this.state.description}
                onChange={(e) => {
                  this.setState({ description: e.target.value });
                }}
              />
              <button
                onClick={() => {
                  if (this.state.description.trim() && this.state.title.trim())
                    this.createPost();
                  else alert("Fill in all fields");
                }}
              >
                Submit
              </button>
            </div>
          ) : (
            <div>
              Currently recording.......
              <button onClick={this.stopRecording}>Stop Recording</button>
            </div>
          )
        ) : (
          <div>
            <Link to="/">
              <IconContext.Provider
                value={{ style: { color: "rgb(0, 0, 0)", fontSize: "2em" } }}
              >
                <FaHome />
              </IconContext.Provider>
            </Link>
            <header className="navbar">
              <Link to="/profile">
                <img src={PersonIcon} />
              </Link>
              <Link to="/savedsongs">
                <img src={RecordIcon} />
              </Link>
              <Link to="/forum">
                <img src={ForumIcon} />
              </Link>
            </header>
            <main>
              <div>
                <h1>Tap to Record</h1>
                <img src={RecordButton} onClick={this.recordAudio} />
              </div>
              <a href="/login">
                <button onClick={this.signOut} className="actionBtn">
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

export default Home;
