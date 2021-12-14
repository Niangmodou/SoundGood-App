import React, { Component } from "react";
import { IconContext } from "react-icons";
import { FaPen, FaTimesCircle, FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";
import DiscoveredSong from "../Components/DiscoveredSong.js";
import "../Css/Profile.css";
import DiscoveredSongs from "./DiscoveredSongs.js";
import { Route, Routes } from "react-router";
import axios from "axios";

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

      imageUrl: "",
      songPosts: [],
    };
  }

  doneEditing = () => {
    this.setState({ editing: false });
  };

  componentDidMount() {
    const URL = "http://127.0.0.1:5000/api/current_user";
    const token = localStorage.getItem("userToken");

    const configs = {
      headers: { Authorization: `Bearer ${token}` },
    };

    axios
      .get(URL, configs)
      .then((response) => {
        console.log(response);
        this.setState({
          username: response["data"]["username"],
          firstName: response["data"]["first_name"],
          lastName: response["data"]["last_name"],
          email: response["data"]["email"],
          imageUrl: response["data"]["image_url"],
          songPosts: response["data"]["song_posts"],
        });
      })
      .catch((err) => console.log(err));
  }

  // Function to update user data to the backend once it has been edited
  editUserInfo = () => {
    const URL = "http:://127.0.0.1:5000/api/update_user";

    const token = localStorage.getItem("userToken");
    const configs = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const newData = {
      username: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    axios
      .post(URL, newData, configs)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    this.setState({ editing: false });
  };

  doneEditing = () => {
    this.setState({ editing: false });
  };

  render() {
    // Allow user to edit their fields
    if (this.state.editing.value == true){
      <div>
          <label >First Name</label>
          <input
            type='text'
            onChange={e => this.setState({firstName: e.target.value})}
            placeholder='First Name'
          /> <br/>

          <label>Last Name</label>
          <input
            type='text'
            onChange={e => this.setState({lastName: e.target.value})}
            placeholder='Last Name'
          /> <br/>

          <label>Email</label>
          <input
            type='email'
            onChange={e => this.setState({lastName: e.target.value})}
            placeholder='Email'
          /> <br/>
        <div>
            <button onClick={() => this.setState({editing: false})}>
              button
              </button>
        </div>
        </div> 
    }

    return (
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

            <h1>kendrick Lamar</h1>

            <button onClick={() => this.setState({ editing: true })}>
              <FaPen />
            </button>
          </div>
        </header>

        <main>
          <div className="image-cropper">
            <img
              className="profilePic"
              //src={this.state.imageUrl}
              src="https://upload.wikimedia.org/wikipedia/commons/3/32/Pulitzer2018-portraits-kendrick-lamar.jpg"
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
    );
  }
}
export default Profile;
