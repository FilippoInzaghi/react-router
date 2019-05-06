import React, { Component } from "react";
// import axios from 'axios';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import Posts from "./Posts/Posts";
// import NewPost from "./NewPost/NewPost";
import FullPost from './FullPost/FullPost';
import "./Blog.css";
import asyncComponent from '../../HOC/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
  return import("./NewPost/NewPost");
})



class Blog extends Component {
  state = {
    auth: true
  }
  render() {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink to="/"   exact activeClassName="active1">
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to="/new-post" activeClassName="active2">
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}
          <Route path="/:id/:id" exact component={FullPost} />
          <Route path="/posts" exact component={Posts} />
          <Redirect from='/' to='/posts'/> 
          {/* <Route render={() => <h1>Site not found - Error 404</h1>}/> */}
        </Switch>
      </div>
    );
  }
}

export default Blog;
