import React, { Component, Fragment } from "react";
import { IconContext } from "react-icons";
import { FaPen, FaTimesCircle, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import DiscoveredSong from "../Components/DiscoveredSong.js";
import "../Css/Profile.css";
import DiscoveredSongs from "./DiscoveredSongs.js";
import { Route, Routes } from "react-router";
import axios from "axios";
const AWS = require("aws-sdk");
const tracks = [
  {
    name: "Miina Tarjamo",
    date: "1 day ago",
    song: "You're beautiful",
    likes: 500,
    dislikes: 200,
    comments: 37,
  },
  {
    name: "Modou Niang",
    date: "2 day ago",
    song: "I saw your face",
    likes: 400,
    dislikes: 100,
    comments: 27,
  },
  {
    name: "Jide",
    date: "3 day ago",
    song: "In a crowded place",
    likes: 300,
    dislikes: 500,
    comments: 17,
  },
];
const uploadImageToAWS = (fileToUpload) => {
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
    Body: fileToUpload,
  };

  let upload = new AWS.S3.ManagedUpload({
    params: params,
  });

  return upload.promise();
};
class Profile extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,

      username: "",
      firstName: "",
      lastName: "",
      email: "",
      score: 0,
      selectedFile: "",
      imageUrl: "",
      songPosts: [],
    };
  }

  doneEditing = () => {
    this.setState({ editing: false });
  };

  componentDidMount() {
    const URL = "https://tandon-soundgood.herokuapp.com/api/current_user";
    const token = localStorage.getItem("userToken");

    const configs = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(URL, configs)
      .then((response) => {
        console.log(response);
        this.setState({
          username: response["data"]["user"]["username"],
          firstName: response["data"]["user"]["first_name"],
          lastName: response["data"]["user"]["last_name"],
          email: response["data"]["user"]["email_address"],
          imageUrl: response["data"]["user"]["image_url"],
          songPosts: response["data"]["song_posts"],
        });
      })
      .catch((err) => console.log(err));
  }

  // Function to update user data to the backend once it has been edited
  editUserInfo = () => {
    const URL = "https://tandon-soundgood.herokuapp.com/api/update_user";

    const token = localStorage.getItem("userToken");
    const configs = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const newData = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      imageUrl: this.state.imageUrl,
    };

    axios
      .post(URL, newData, configs)
      .then((response) => {
        console.log(response);
        if (response["data"]["status"] === "Succesfully edited user")
          console.log("Success");
      })
      .catch((err) => console.log(err));
    this.setState({ editing: false });
  };
  processUserImageUpload = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    const awsPromise = uploadImageToAWS(this.state.selectedFile);

    awsPromise.then((response) => {
      this.setState({ imageUrl: response["Location"] });
    });
  };
  doneEditing = () => {
    this.setState({ editing: false });
  };

  render() {
    return (
      <div>
        {this.state.editing === true ? (
          <div>
            <label>First Name</label>
            <input
              type="text"
              onChange={(e) => this.setState({ firstName: e.target.value })}
              placeholder="First Name"
            />{" "}
            <br />
            <label>Last Name</label>
            <input
              type="text"
              onChange={(e) => this.setState({ lastName: e.target.value })}
              placeholder="Last Name"
            />{" "}
            <br />
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email"
            />{" "}
            <br />
            <input
              type="file"
              name="filename"
              onChange={this.processUserImageUpload}
            />
            <div>
              <button
                onClick={() => {
                  if (
                    this.firstName.trim() &&
                    this.lastName.trim() &&
                    this.email.trim()
                  )
                    this.editUserInfo();
                  alert("Fill in all fields");
                }}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>
            <header>
              <div className="navbar">
                <Link to="/">
                  <IconContext.Provider
                    value={{ style: { color: "rgb(255, 255, 255)" } }}
                  >
                    <div>
                      <FaTimesCircle />
                    </div>
                  </IconContext.Provider>
                </Link>

                <h1>{this.state.username}</h1>

                <button onClick={() => this.setState({ editing: true })}>
                  <FaPen />
                </button>
              </div>
            </header>
            <main>
              <div className="image-cropper">
                <img
                  className="profilePic"
                  src={this.state.imageUrl}
                  //src="https://upload.wikimedia.org/wikipedia/commons/3/32/Pulitzer2018-portraits-kendrick-lamar.jpg"
                  alt="Profilepicture"
                />
              </div>

              <div className="trophies">
                <FaTrophy />
                <strong>13,459</strong>
              </div>
            </main>

            <section>
              <div className="dividerHeader">
                <h2>Discovered Songs</h2>
                {tracks.length !== 0 ? (
                  <Link to="/discoveredSongs">
                    <p>View More</p>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>

              {tracks.length !== 0 ? (
                tracks.map((song) => {
                  return <DiscoveredSong song={song} />;
                })
              ) : (
                <div>
                  <h3>You have not created any posts :(</h3>
                </div>
              )}

              <Routes>
                <Route
                  path="/discoveredSongs"
                  element={<DiscoveredSongs tracks={tracks} />}
                />
              </Routes>
            </section>
          </div>
        )}
      </div>
    );
  }
}
export default Profile;
