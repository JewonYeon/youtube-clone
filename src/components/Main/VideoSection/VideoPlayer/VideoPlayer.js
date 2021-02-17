// import React from 'react';

// const VideoPlayer = ({ video }) => {
//   console.log(video);
//   if (!video) {
//     return (
//       <div className="video-player">
//         <div className="embed-responsive embed-responsive-16by9">
//           <iframe className="embed-responsive-item"
//             src={`https://www.youtube.com/embed/rkWfus4VUgk`} allowFullScreen></iframe>
//         </div>
//         <div className="video-player-details">
//           <h3>무야호</h3>
//           <div>야호~~~</div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="video-player">
//       <div className="embed-responsive embed-responsive-16by9">
//         <iframe className="embed-responsive-item"
//           src={`https://www.youtube.com/embed/${video.id.videoId}`} allowFullScreen></iframe>
//       </div>
//       <div className="video-player-details">
//         {/* <h3>{video.snippet.title}</h3> */}
//         {/* <div>{video.snippet.description}</div> */}
//       </div>
//     </div>
//   )
// }

// export default VideoPlayer;

import React, { Component } from 'react';
import Comments from '../Comments/Comments'

class VideoPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      thumbsUp: 0,
      thumbsDown: 0,
      isSubscribed: false,
    }
    this.handleThumbsUp = this.handleThumbsUp.bind(this);
    this.handleThumbsDown = this.handleThumbsDown.bind(this);
    this.handleSubscribe = this.handleSubscribe.bind(this);
  }

  handleThumbsUp() {
    this.setState(({ thumbsUp }) => ({ thumbsUp: thumbsUp + 1 }))
  }

  handleThumbsDown() {
    this.setState(({ thumbsDown }) => ({ thumbsDown: thumbsDown + 1 }))
  }
  // 구독
  handleSubscribe() {
    if (this.state.isSubscribed) {
      this.setState({ isSubscribed: false })
    }
    else this.setState({ isSubscribed: true })
  }

  render() {
    return (
      <div className="video-player">
        <div className="embed-responsive embed-responsive-16by9">
          <iframe className="embed-responsive-item"
            src={`https://www.youtube.com/embed/${this.props.video.id.videoId}`} allowFullScreen></iframe>
        </div>
        <div className="video-player-details">
          <div>
            <h6 className="video-player-tag">#플레이리스트 #playlist</h6>
            <h3 className="video-player-title">{this.props.video.snippet.title}</h3>
          </div>
          <div className="video-player-info">
            <div>
              <div className="video-player-count">조회수 244,069회</div>
              <div className="video-player-date">{this.props.video.snippet.publishedAt.slice(0, 10)}</div>
            </div>
            <div className="thumbs">
              <button onClick={this.handleThumbsUp}>
                <i className="fas fa-thumbs-up"></i>
              </button>
              <div>{this.state.thumbsUp}</div>
              <button onClick={this.handleThumbsDown}>
                <i className="fas fa-thumbs-down"></i>
              </button>
              <div>{this.state.thumbsDown}</div>
            </div>
          </div>
        </div>
        <div className="video-player-profile">
          <div className="profile-img"></div>
          <div className="profile-main">
            <div className="profile-main-id">{this.props.video.snippet.channelTitle}</div>
            <div className="profile-main-description">{this.props.video.snippet.description}</div>
          </div>
          <div onClick={this.handleSubscribe}>
            <div className="subscribe"
              style={{ backgroundColor: `${this.state.isSubscribed ? '#303030' : '#CC0100'}` }}
            >{this.state.isSubscribed ? '구독중' : '구독'}</div>
          </div>
        </div>
        <Comments />
      </div>

    )
  }
}

export default VideoPlayer;