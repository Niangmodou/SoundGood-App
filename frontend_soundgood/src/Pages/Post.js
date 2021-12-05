import axios from 'axios'
import React, {Component} from 'react.js'

class Post extends Component {
    constructor() {
        super(props)

        this.state = {
            userImage: '',
            postText: '',
            postComment: '',
            audioUrl: '',
            postDescription: '',
            
            recentResults: []
        }
    }

    componentDidMount() {
        const URL = "http://127.0.0.1:5000/api/forum?postid={}"
        axios.get(URL)
    }

    isUserLoggedIn = () => {
        return localStorage.getItem("userToken") !== null
    }

    render() {

        return (
        <div>
            <h3 className="post-title">{postDescription}</h3>


            <h3>Top Results</h3>


            <h3>Recent Results</h3>

        </div>
        )
    }
}