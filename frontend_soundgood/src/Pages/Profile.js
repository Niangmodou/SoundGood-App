import React, {Component} from 'react';
import { IconContext } from 'react-icons';
import { FaPen, FaTimesCircle, FaTrophy } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Badge from '../Components/Badge.js';
import DiscoveredSong from '../Components/DiscoveredSong.js';
import '../Css/Profile.css';
import DiscoveredSongs from './DiscoveredSongs.js';
import { Route, Routes } from 'react-router';
import $ from 'jquery';

const tracks = [
  {
    name: 'Miina Tarjamo',
    date: '1 day ago',
    song: "You're beautiful",
    likes: 500,
    dislikes: 200,
    comments: 37,
  },
  {
    name: 'Modou Niang',
    date: '2 day ago',
    song: 'I saw your face',
    likes: 400,
    dislikes: 100,
    comments: 27,
  },
  {
    name: 'Jide',
    date: '3 day ago',
    song: 'In a crowded place',
    likes: 300,
    dislikes: 500,
    comments: 17,
  },
];

class Profile extends Component {
constructor(props) {
    super(props);
    this.state = {
      editing: true,
      pic: false,
      src: false
    };
    this.newName = "";
  }

  editing = () => {
        this.setState({editing: false});
    }

handlePictureSelected(event) {
    var picture = event.target.files[0];
    var src     = URL.createObjectURL(picture);

    this.setState({
      picture: picture,
      src: src
    });
  }

  upload() {
    var formData = new FormData();

    formData.append("file", this.state.picture);

    $.ajax({
      url: "/api/photo",
      method: "POST",
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function(response) {
      }
    });
  }

  render() {
  const {name}= this.props;
  return (
    <div>
      <header>
        <div className='navbar'>
          <Link to='/'>
            <IconContext.Provider
              value={{ style: { color: 'rgb(255, 255, 255)' } }}
            >
              <div>
                <FaTimesCircle />
              </div>
            </IconContext.Provider>
          </Link>
            {this.state.editing ? (
              <span className="name">{name}</span>
            ) : (
              <input
                type="text"
                defaultValue={name}
                ref={node => {
                  this.newName = node;
                }}
            />
            )} 
          <h1>Kendrick Lamar</h1>
          <button onClick={this.editing}><FaPen/></button>
        </div>
      </header>
      <main>
        <div className='image-cropper'>
          {this.state.editing ? (<span></span>) : (
          <input
            type="file"
            onChange={this.handlePictureSelected.bind(this)}
          />
          <button onClick={this.upload.bind(this)}>Upload</button>
            )}
          <img
            className='profilePic'
            src='https://upload.wikimedia.org/wikipedia/commons/3/32/Pulitzer2018-portraits-kendrick-lamar.jpg'
            alt='Profile picture'
          />
        </div>
        <div className='trophies'>
          <FaTrophy />
          <strong>13,459</strong>
        </div>
        <div className='badges'>
          <Badge />
        </div>
      </main>
      <section>
        <div className='dividerHeader'>
          <h2>Discovered Songs</h2>
          <Link to='/discoveredSongs'>
            <p>View More</p>
          </Link>
        </div>
        {tracks.map((song) => {
          return <DiscoveredSong song={song} />;
        })}
        <Routes>
          <Route
            path='/discoveredSongs'
            element={<DiscoveredSongs tracks={tracks} />}
          />
        </Routes>
      </section>
    </div>
  );
}
}

export default Profile