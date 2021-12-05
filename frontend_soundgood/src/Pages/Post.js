import axios from 'axios'
import React, {Component} from 'react.js'
import CommentCell from '../Components/CommentCell'

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
        const URL = "http://127.0.0.1:5000/api/forum?postid=" + this.props.postId
        axios.get(URL).then((response) => {
            let recentResults = response["data"]["recentResults"]
            
            this.setState({
                userImage: response["data"]["user_id"]["image_url"],
                postText: response["data"]["text"],
                postDescription = response["data"]["description"],

            })
        }).catch((err) => console.log(err))
    }

    isUserLoggedIn = () => {
        return localStorage.getItem("userToken") !== null
    }

    // Method to retrieve a text representation of time passed
    retrieveTime = (datePosted) => {
    }


    render() {

        return (
        <div>
            <h3 className="post-title">{postDescription}</h3>


            <h3>Recent Results</h3>
            
            {
                this.state.recentResults.map((comment, idx) => {
                    return (
                        <div className="comment-cell" key={idx}>
                            <CommentCell
                                username={comment["post_id"]["user_id"]["username"]}
                                image={comment["post_id"]["user_id"]["image_url"]}
                                datePosted={comment["date_posted"]}
                                text={comment["text"]}
                                commentId={comment["id"]}
                                likeCount={comment["like_count"]}
                                dislikeCount={comment["dislike_count"]}
                            />
                        </div>
                    )
                })
            }

        </div>
        )
    }
}