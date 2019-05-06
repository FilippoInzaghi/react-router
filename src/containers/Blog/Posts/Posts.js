import React, { Component } from "react";
import Post from "../../../components/Post/Post";
import "./Posts.css";
// import { Link } from "react-router-dom";

import axios from "../../../axios";

class Posts extends Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props.match.params);
    axios
      .get("/posts")
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: "Max"
          };
        });
        this.setState({ posts: updatedPosts });
        // console.log( response );
      })
      .catch(error => {
        console.log(error);
        // this.setState({ error: true });
      });
  }
  postSelectedHandler = id => {
    this.props.history.push({pathname: '/posts/' + id})
  };
  render() {
    let posts = <p style={{ textAlign: "center" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map(post => {
        return (
          // <Link to={"/posts/" + post.id} key={post.id}>
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}
          />
          //</Link>
        );
      });
    }
    return <section className="Posts">{posts}</section>;
  }
}

export default Posts;
