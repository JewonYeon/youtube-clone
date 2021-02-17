import React from "react";
import Nav from "./Nav/Nav";
import VideoPlayer from "./Main/VideoSection/VideoPlayer/VideoPlayer";
import VideoList from "./Main/VideoList/VideoList";
import LoadingIndicator from "./LoadingIndicator";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      currentVideo: {
        kind: "youtube#searchResult",
        etag: "Q7J9TCnfHBteqvkL9Gt6h-bI3y0",
        id: {
          kind: "youtube#video",
          videoId: "AJ8rhNnoPSE"
        },
        snippet: {
          publishedAt: "2019-06-18T08:14:02Z",
          channelId: "UC0uDM1xZMNBAoW2xnzhAQ7g",
          title: "이런 분들은 개발자 하지 마세요",
          description: "제가 개발자 되려면 어떻게 해야하는지에 대한 질문은 많이 받는데 개발자는 어떤 일을 주로 하는지에 대한 질문은 많이 안 들어본 것 같아요. 제가 생각 하기에 이런 ...",
          thumbnails: {
            default: {
              url: "https://i.ytimg.com/vi/AJ8rhNnoPSE/default.jpg",
              width: 120,
              height: 90
            },
            medium: {
              url: "https://i.ytimg.com/vi/AJ8rhNnoPSE/mqdefault.jpg",
              width: 320,
              height: 180
            },
            high: {
              url: "https://i.ytimg.com/vi/AJ8rhNnoPSE/hqdefault.jpg",
              width: 480,
              height: 360
            }
          },
          channelTitle: "Teccboi Wonie",
          liveBroadcastContent: "none",
          publishTime: "2019-06-18T08:14:02Z"
        }
      },
      isLoading: true,
      queryString: '',
    }

    this.setCurrentVideo = this.setCurrentVideo.bind(this)
    this.searchVideo = this.searchVideo.bind(this)
  }

  componentDidMount() {
    // side effect를 일으키는 searchVideo 함수는 componentDidMount에서 처리합니다.
    const script = document.createElement("script");
    script.src = "https://kit.fontawesome.com/34e274a1ff.js";
    script.async = true;
    script.crossorigin = "anonymous"
    document.body.appendChild(script);
    this.searchVideo('무야호')
  }

  setCurrentVideo(video) {
    this.setState({
      currentVideo: video
    })
  }

  searchVideo(queryString) {
    // 대부분의 비동기 요청은 side effect를 일으킨다고 볼 수 있습니다.
    // 현재의 구현은, 시간이 지나면 가짜 데이터와 함께 로딩이 끝나지만, 여기엔 AJAX 요청이 들어가야 합니다.
    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false,
    //     videos: fakeData
    //   })
    // }, 2000)
    // const youtubeAPI = `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBWR6U4WH_K4b1Oegr__AlJtflsu7vdZdY&q=${queryString}&type=video&videoEmbeddable=any`;
    const youtubeAPI = 'https://ur8ist29gg.execute-api.us-east-1.amazonaws.com/dev/youtube-data';
    fetch(youtubeAPI)
      .then((api) => api.json())
      .then(json => {
        this.setState({
          isLoading: false,
          videos: json.items
        })
      })
  }

  render() {
    return (
      <div>
        <Nav handleButtonClick={this.searchVideo} />
        {this.state.isLoading ?
          <LoadingIndicator />
          :
          <div className="main">
            <VideoPlayer video={this.state.currentVideo} />
            <VideoList videos={this.state.videos} handleClickEntry={this.setCurrentVideo} />
          </div>
        }
      </div>
    )
  }
}

export default App;
