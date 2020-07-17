import React, { Component } from 'react';
import axios from 'axios';
import Loading from '../Loading';

class UserpostDetails extends Component {
  state = {
    posts: [],
    loader: false
  };

  userPostList = async (id) => {
    this.setState({
      loader: true
    })
    let responce = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    let postData = responce.data;
    this.setState({
      posts: postData,
      loader: false
    });
  };

  componentDidMount() {
    const { user } = this.props;
    this.userPostList(user.id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.userPostList(this.props.user.id);
    }
  }
  render() {
    const { posts, loader } = this.state;
    return (
      <div>
        {loader ? (
          <Loading />
        ) : (
            <div>
              {posts.map(post => {
                return (
                  <div key={post.id} className='card'>
                    <div className='card-body'>
                      <h5 className='card-title'>{post.title}</h5>
                      <hr />
                      <p className='card-text'>{post.body.substring(0, 150)}...</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
      </div>
    );
  }
}

export default UserpostDetails;
